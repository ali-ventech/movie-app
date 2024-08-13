import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMovieToHistory } from "../redux/slices/searchHistorySlice";

interface Movie {
  id: number;
  title: string;
  small_cover_image: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}`
          );
          setSearchResults(response.data.data.movies || []);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }, 1000);

      setTypingTimeout(newTimeout);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event: any, newValue: string) => {
    setSearchTerm(newValue);
  };

  const handleSearchSelect = (event: any, value: Movie | null) => {
    if (value) {
      navigate(`/movie/${value.id}`);
      setSearchTerm("");
      setSearchResults([]);
      dispatch(addMovieToHistory(value));
    }
  };

  return (
    <Autocomplete
      clearOnBlur
      options={searchResults}
      getOptionLabel={(option: Movie) => option.title}
      onInputChange={handleSearchChange}
      onChange={handleSearchSelect}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
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
