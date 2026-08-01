import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService"; 
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid"; 
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };


  const handleSearch = async (topic: string) => {
    try {
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(topic, 1);
      
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
        }
      
      setMovies(data.results);
    } catch (error) {
      console.error("Помилка при отриманні фільмів:", error);
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Main content of the page</h1>
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage/>}
      {isLoading && <Loader />}
               
      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}


      <Toaster />

    </div>
  );
}