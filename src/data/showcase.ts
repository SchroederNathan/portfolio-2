export interface ShowcaseItem {
  title: string;
  description: string;
  video: string;
  tags: string[];
  slug: string;
  url?: string;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    title: "Gallery Carousel",
    description: "Media gallery carousel animation",
    video: "/videos/gallery-carousel.MP4",
    tags: ["Reanimated", "Expo Blur"],
    slug: "gallery-carousel",
    url: "https://rnmotion.dev/animations/gallery-carousel",
  },
  {
    title: "Linear Tab Bar",
    description: "Animated tab bar inspired by Linear",
    video: "/videos/linear-tab-bar.mp4",
    tags: ["Reanimated", "Gesture Handler"],
    slug: "linear-tab-bar",
    url: "https://rnmotion.dev/animations/linear-tab-bar",
  },
  {
    title: "Context Menu",
    description: "Custom long press context menu with actions",
    video: "/videos/context-menu.MP4",
    tags: ["Reanimated", "Expo Blur", "Gesture Handler", "Skia"],
    slug: "context-menu",
    url: "https://rnmotion.dev/animations/radial-menu",
  },
  {
    title: "Review Input Transition",
    description: "Context-preserving transition into review flow",
    video: "/videos/review-transition.MP4",
    tags: ["Reanimated", "Gesture Handler", "Keyboard Controller"],
    slug: "review-transition",
  },
  {
    title: "Pull to Search",
    description: "Elastic pull gesture that focuses search input",
    video: "/videos/pull-to-search.MP4",
    tags: ["Reanimated", "Expo Blur", "Gesture Handler"],
    slug: "pull-to-search",
  },
  {
    title: "Sheet",
    description: "Custom action sheet",
    video: "/videos/sheet.MP4",
    tags: ["Reanimated", "Expo Blur", "Gesture Handler"],
    slug: "sheet",
  },

  {
    title: "Shared Element Image",
    description: "Profile image detail animation",
    video: "/videos/image-shared-element.MP4",
    tags: ["Reanimated", "Expo Blur", "Gesture Handler"],
    slug: "image-shared-element",
  },
  {
    title: "Onboarding",
    description: "Animated onboarding sequence",
    video: "/videos/onboarding.MP4",
    tags: ["Reanimated"],
    slug: "onboarding",
  },
  {
    title: "Swipe Deck Onboarding",
    description: "Swipe deck onboarding animation",
    video: "/videos/swipe-deck.MP4",
    tags: ["Reanimated"],
    slug: "swipe-deck",
  },

];
