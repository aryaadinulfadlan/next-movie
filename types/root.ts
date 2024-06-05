export interface Movie {
  backdrop_path: string;
  genre_ids?: Array<number>;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: Array<{ id: number; name: string }>;
}

export interface MovieTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface Transaction {
  movie_id: number;
  movie_title: string;
  movie_overview: string;
  movie_poster_path: string;
  movie_release_date: string;
  movie_rating: string;
  movie_review: number;
}

export interface TransactionList extends Transaction {
  id: string;
  userId: string;
  movie_price: number;
}
