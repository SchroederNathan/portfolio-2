import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  XIcon,
} from "@/components/svg-icons";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl sm:py-32 lg:pb-40">
        <h1 className="sr-only">Nathan Schroeder</h1>
        <div className="flex flex-row justify-between gap-3 mb-3">
          <h1 className="text-xl font-exposure font-bold">
            hey, I&apos;m Nate
          </h1>
          <MoonIcon className="text-muted hover:text-foreground transition-colors duration-300" />
        </div>
        <p className="text-lg font-sans text-muted mb-3">
          developer, UI/UX designer
        </p>
        <div className="flex flex-row gap-3 mb-8">
          <XIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <InstagramIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <LinkedInIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <GitHubIcon className="text-muted hover:text-foreground transition-colors duration-300" />
        </div>
        <p className="text-lg text-muted mb-8">
          I build cool stuff that actually feels good to use whether its a
          personal/internal tool or a large- scale application. I care about the
          details.{" "}
          <span className="italic font-exposure font-bold text-foreground">
            elegant
          </span>{" "}
          Ul,{" "}
          <span className="italic font-exposure font-bold text-foreground">
            great
          </span>{" "}
          performance, and code that doesn&apos;t feel like a mess. <br />{" "}
          <br />I dabble in a lot of frontend and backend frameworks, but
          currently I&apos;m focused on React Native development and NextJS for
          web.
        </p>
      </div>
    </div>
  );
}
