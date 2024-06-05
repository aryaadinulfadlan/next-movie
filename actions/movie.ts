"use server";

import { API_BASE_URL } from "@/config";
import { Movie, MovieDetail, MovieTrailer } from "@/types/root";

const API_KEY = process.env.API_KEY;
export const getMovieNowPlaying = async () => {
  const response = await fetch(
    `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );
  const { results }: { results: Array<Movie> } = await response.json();
  return results;
};

export const getMovieByCategory = async (
  category: "popular" | "top_rated" | "upcoming"
) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${category}?api_key=${API_KEY}`
  );
  const { results }: { results: Array<Movie> } = await response.json();
  return results;
};

export const getMovieSearch = async (key: string) => {
  const response = await fetch(
    `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${key}`
  );
  const { results }: { results: Array<Movie> } = await response.json();
  return results;
};

export const getMovieDetails = async (id: string) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  const result: MovieDetail = await response.json();
  return { success: result };
};

export const getMovieTrailer = async (id: string) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  const { results }: { results: Array<MovieTrailer> } = await response.json();
  return results;
};

export const getMovieSimilar = async (id: string) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );
  const { results }: { results: Array<Movie> } = await response.json();
  return results;
};
