import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
} 

export const fetchMovies = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
  
    
  
  const response = await axios.get<MovieSearchResponse>('https://api.themoviedb.org/3/search/movie', {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  return response.data;
}; 