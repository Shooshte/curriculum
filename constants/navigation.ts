interface NavigationLink {
  id: number;
  route: string;
  text: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    id: 0,
    route: "/",
    text: "About",
  },
  {
    id: 1,
    route: "/blog",
    text: "Blog posts",
  },
  {
    id: 2,
    route: "/cookies",
    text: "Cookies",
  },
];
