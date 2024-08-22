import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToHistory } from "../redux/slices/movieSlice";
import { RootState } from "../redux/store";

interface Movie {
  id: string;
  title: string;
  small_cover_image: string;
  medium_cover_image: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myMovies = useSelector(
    (state: RootState) => state.searchHistory.myMovies
  );

  useEffect(() => {
    if (searchTerm) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(async () => {
        setIsLoading(true);
        try {
          const storeResults = myMovies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (storeResults.length < 5) {
            const response = await axios.get(
              `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}`
            );
            const apiResults = response.data.data.movies || [];
            const results = [...storeResults, ...apiResults].slice(0, 5);
            setSearchResults(results);
          } else {
            setSearchResults(storeResults.slice(0, 5));
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      }, 1000);

      setTypingTimeout(newTimeout);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchTerm, myMovies]);

  const handleSearchChange = (event: any, newValue: string) => {
    setSearchTerm(newValue);
  };

  const handleSearchSelect = (event: any, value: Movie | string | null) => {
    if (value) {
      navigate(`/movie/${(value as Movie).id}`);
      setSearchTerm("");
      setSearchResults([]);
      dispatch(addMovieToHistory(value as Movie));
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.blur();
      }
    }
  };

  return (
    <Autocomplete
      // clearOnBlur={false}
      freeSolo
      options={searchResults}
      getOptionLabel={(option: Movie | string) => (option as Movie).title}
      onInputChange={handleSearchChange}
      onChange={handleSearchSelect}
      size="small"
      noOptionsText={isLoading ? "Loading..." : "No Options"}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          variant="outlined"
          fullWidth
          placeholder="Search for a movie..."
          sx={{ mb: 4, borderRadius: 1 }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            padding: "10px",
            display: "flex",
            gap: 2,
            borderBottom: 1,
            borderColor: "#222222",
          }}
        >
          <img src={option.small_cover_image} height={48} alt={option.title} />{" "}
          {option.title}
        </Box>
      )}
    />
  );
};

export default SearchBar;
