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
import SearchPage from "./pages/SearchPage";
import SeasonalAnimePage from "./pages/SeasonalAnime";
import TopPage from "./pages/TopPage";
import NotFound from "./pages/NotFound";
import OtherPage from "./pages/OtherPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/detail/:id" element={<Detail />} />
        <Route path="/anime/detail/:id/characters" element={<Detail />} />
        <Route path="/anime/detail/:id/staff" element={<Detail />} />
        <Route path="/anime/detail/:id/pictures" element={<Detail />} />
        <Route path="/anime/:id/characters" element={<DetailAnimeCharacter />} />
        <Route path="/anime/:id/voice-actors" element={<DetailVoiceActors />} />
        <Route path="/anime/:id/staff" element={<DetailStaff />} />
        <Route path="/manga/detail/:id" element={<DetailManga />} />
        <Route path="/manga/:id/characters" element={<DetailMangaCharacter />} />
        <Route path="/currentlyAiring" element={<ViewMore type="currentlyAiring" />} />
        <Route path="/popular" element={<ViewMore type="popular" />} />
        <Route path="/upcoming" element={<ViewMore type="upcoming" />} />
        <Route path="/anime/search" element={<SearchPage type="anime" />} />
        <Route path="/manga/search" element={<SearchPage type="manga" />} />
        <Route path="/anime/seasonal" element={<SeasonalAnimePage />} />
        <Route path="/anime/top" element={<TopPage type="anime" />} />
        <Route path="/manga/top" element={<TopPage type="manga" />} />
        
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
        <Route path="others/studios" element={<OtherPage type="studios" />} />
        <Route path="others/persons" element={<OtherPage type="persons" />} />
      </Routes>
    </Router>
  );
};

export default App;
