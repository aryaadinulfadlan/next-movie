export const API_BASE_URL = "https://api.themoviedb.org/3";
export const getOriginalImage = (path: string) =>
  `https://image.tmdb.org/t/p/original${path}`;
export const get500Image = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;
