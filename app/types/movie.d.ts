// app/types/movie.d.ts
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
  selected: boolean;
}

export type Poster = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null; // Use `null` for nullable fields
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};
