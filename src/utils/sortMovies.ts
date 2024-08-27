import { Movie } from "../types.ts/movieType";

export const sortMovies = (movies: Movie[], searchTerm: string): Movie[] => {
  const termLower = searchTerm.toLowerCase();

  return movies.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    if (aTitle === termLower) return -1;
    if (bTitle === termLower) return 1;

    const aExact = aTitle.split(" ").includes(termLower);
    const bExact = bTitle.split(" ").includes(termLower);

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    const aWithHyphen = aTitle.includes(`${termLower}-`);
    const bWithHyphen = bTitle.includes(`${termLower}-`);

    if (aWithHyphen && !bWithHyphen) return -1;
    if (!aWithHyphen && bWithHyphen) return 1;

    const aWithDot = aTitle.includes(`${termLower}.`);
    const bWithDot = bTitle.includes(`${termLower}.`);

    if (aWithDot && !bWithDot) return -1;
    if (!aWithDot && bWithDot) return 1;

    const aIndex = aTitle.indexOf(termLower);
    const bIndex = bTitle.indexOf(termLower);

    if (aIndex !== -1 && bIndex !== -1) {
      if (aIndex < bIndex) return -1;
      if (aIndex > bIndex) return 1;
    }

    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return aTitle.localeCompare(bTitle);
  });
};
