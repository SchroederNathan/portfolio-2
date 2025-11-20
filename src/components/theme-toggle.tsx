"use client";

import { MoonIcon, SunIcon } from "@/components/ui/svg-icons";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="group p-2">
        <div className="w-6 h-6" />
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="group relative p-2 w-10 h-10 flex items-center justify-center"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            className="absolute"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <MoonIcon className="text-muted group-hover:text-foreground transition-colors duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            className="absolute"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: 90 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.5, rotate: -90 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <SunIcon className="text-muted group-hover:text-foreground transition-colors duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
