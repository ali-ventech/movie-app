import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MyList from "./pages/MyList";
import AddMovie from "./pages/AddMovie";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container sx={{ mt: 4 }}>
          <SearchBar />
        </Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
