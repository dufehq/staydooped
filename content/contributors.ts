import type { Contributor } from "./types";

export const contributors: Record<string, Contributor> = {
  pom: {
    slug: "pom",
    name: "Pom",
    avatar: "🏠",
    role: "your host at No.51 & No.55",
    loopCount: 24,
  },
  malee: {
    slug: "malee",
    name: "Khun Malee",
    avatar: "🍜",
    role: "food blogger, CM born & raised",
    loopCount: 31,
  },
  jake: {
    slug: "jake",
    name: "Jake",
    avatar: "🗺️",
    role: "expat guide, lived CM 4 yrs",
    loopCount: 19,
  },
  noi: {
    slug: "noi",
    name: "Khun Noi",
    avatar: "🧘",
    role: "wellness guide, 8 yrs CM",
  },
  sara: {
    slug: "sara",
    name: "Sara",
    avatar: "☕",
    role: "digital nomad, CM 2 yrs",
  },
  tom: {
    slug: "tom",
    name: "Tom",
    avatar: "🧗",
    role: "adventure guide, CM 3 yrs",
  },
};

export function getContributor(slug: string): Contributor {
  const c = contributors[slug];
  if (!c) throw new Error(`Unknown contributor slug: ${slug}`);
  return c;
}
