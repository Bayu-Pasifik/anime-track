import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import DetailAnimeCharacter from "./pages/DetailAnimeCharacter";
import DetailVoiceActors from "./pages/DetailVoiceActors";
import DetailManga from "./pages/DetailManga";
import DetailStaff from "./pages/DetailAnimeStaff";
import DetailMangaCharacter from "./pages/DetailMangaCharacter";
import ViewMore from "./pages/ViewMore";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/detail/:id" element={<Detail />} />
        <Route path="/anime/detail/:id/characters" element={<Detail />} />
        <Route path="/anime/detail/:id/staff" element={<Detail />} />
        <Route path="/anime/detail/:id/pictures" element={<Detail />} />
        <Route
          path="/anime/:id/characters"
          element={<DetailAnimeCharacter />}
        />
        <Route path="/anime/:id/voice-actors" element={<DetailVoiceActors />} />
        <Route path="/anime/:id/staff" element={<DetailStaff />} />
        <Route path="/manga/detail/:id" element={<DetailManga />} />
        <Route path="/manga/:id/characters" element={<DetailMangaCharacter />} />
        <Route path="/currentlyAiring" element={<ViewMore />} />
        <Route path="/popular" element={<ViewMore />} />
        <Route path="/upcoming" element={<ViewMore />} />
      </Routes>
    </Router>
  );
};

export default App;
