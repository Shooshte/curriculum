interface NavigationLink {
  id: number;
  route: string;
  text: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    id: 1,
    route: "/blog",
    text: "Blog",
  },
  {
    id: 2,
    route: "/cookies",
    text: "Cookies",
  },
];
