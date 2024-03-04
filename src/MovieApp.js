import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import api_key from './apikey';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&page=${currentPage}`);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Movies:</h1>
          <div className="movie-list-container">
            {movies.slice(0, moviesPerPage).map(movie => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieApp;
