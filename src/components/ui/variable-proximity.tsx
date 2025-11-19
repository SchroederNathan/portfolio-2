import { motion } from "motion/react";
import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(
  containerRef: MutableRefObject<HTMLElement | null>
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      onClick,
      style,
      ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    });

    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map(
          settingsStr
            .split(",")
            .map((s) => s.trim())
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name.replace(/['"]/g, ""), parseFloat(value)];
            })
        );

      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    // Map opsz value to font-family name
    // Maps opsz values directly to font file numbers (-100 to +100)
    const getFontFamilyForOpsz = useCallback((opsz: number): string => {
      // Round to nearest 10 and clamp to available range
      const rounded = Math.round(opsz / 10) * 10;
      const clamped = Math.max(-100, Math.min(100, rounded));
      
      if (clamped < 0) {
        return `Exposure${clamped}`;
      } else if (clamped === 0) {
        return "Exposure0";
      } else {
        return `Exposure${clamped}`;
      }
    }, []);

    // Initialize settings for initial render
    const initialSettings = useMemo(() => {
      const fromParsed = parsedSettings.reduce((acc, { axis, fromValue }) => {
        acc.set(axis, fromValue);
        return acc;
      }, new Map<string, number>());
      
      const otherSettings = Array.from(fromParsed.entries())
        .filter(([axis]) => axis !== "opsz" && axis !== "wght")
        .map(([axis, value]) => `'${axis}' ${value}`)
        .join(", ");
      
      return {
        fontVariationSettings: otherSettings || fromFontVariationSettings,
        fontFamily: (() => {
          const opszValue = fromParsed.get("opsz");
          return opszValue !== undefined ? getFontFamilyForOpsz(opszValue) : undefined;
        })(),
        fontWeight: (() => {
          const wghtValue = fromParsed.get("wght");
          return wghtValue !== undefined ? Math.max(100, Math.min(900, Math.round(wghtValue))).toString() : undefined;
        })(),
      };
    }, [fromFontVariationSettings, parsedSettings, getFontFamilyForOpsz]);

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return norm ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case "linear":
        default:
          return norm;
      }
    };

    useAnimationFrame(() => {
      if (!containerRef?.current) return;
      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return;
      }
      lastPositionRef.current = { x, y };
      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY
        );

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          // Set font-family for opsz when far away
          const fromParsed = parsedSettings.reduce((acc, { axis, fromValue }) => {
            acc.set(axis, fromValue);
            return acc;
          }, new Map<string, number>());
          const opszValue = fromParsed.get("opsz");
          if (opszValue !== undefined) {
            letterRef.style.fontFamily = getFontFamilyForOpsz(opszValue);
          }
          const wghtValue = fromParsed.get("wght");
          if (wghtValue !== undefined) {
            letterRef.style.fontWeight = Math.max(100, Math.min(900, Math.round(wghtValue))).toString();
          }
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const interpolatedValues = new Map<string, number>();
        
        parsedSettings.forEach(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          interpolatedValues.set(axis, interpolatedValue);
        });

        // Build font-variation-settings string (excluding opsz and wght)
        const otherSettings = Array.from(interpolatedValues.entries())
          .filter(([axis]) => axis !== "opsz" && axis !== "wght")
          .map(([axis, value]) => `'${axis}' ${value}`)
          .join(", ");

        if (otherSettings) {
          letterRef.style.fontVariationSettings = otherSettings;
        } else {
          letterRef.style.fontVariationSettings = "normal";
        }

        // Handle opsz by switching font-family
        const opszValue = interpolatedValues.get("opsz");
        if (opszValue !== undefined) {
          letterRef.style.fontFamily = getFontFamilyForOpsz(opszValue);
        }

        // Handle wght with CSS font-weight
        const wghtValue = interpolatedValues.get("wght");
        if (wghtValue !== undefined) {
          letterRef.style.fontWeight = Math.max(100, Math.min(900, Math.round(wghtValue))).toString();
        }

        interpolatedSettingsRef.current[index] = otherSettings || fromFontVariationSettings;
      });
    });

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{
          display: "inline",
          ...style,
        }}
        className={className}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el) => {
                    letterRefs.current[currentLetterIndex] = el;
                    if (el) {
                      // Initialize with correct font settings immediately
                      if (initialSettings.fontFamily) {
                        el.style.fontFamily = initialSettings.fontFamily;
                      }
                      if (initialSettings.fontWeight) {
                        el.style.fontWeight = initialSettings.fontWeight;
                      }
                      el.style.fontVariationSettings = initialSettings.fontVariationSettings;
                      interpolatedSettingsRef.current[currentLetterIndex] = initialSettings.fontVariationSettings;
                    }
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: initialSettings.fontVariationSettings,
                    fontFamily: initialSettings.fontFamily,
                    fontWeight: initialSettings.fontWeight,
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
