import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import DetailAnimeCharacter from './pages/DetailAnimeCharacter';
import DetailVoiceActors from './pages/DetailVoiceActors';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail/:id/characters" element={<Detail />} />
        <Route path="/detail/:id/staff" element={<Detail />} />
        <Route path="/detail/:id/pictures" element={<Detail />} />
        <Route path="/anime/:id/characters" element={<DetailAnimeCharacter />} />
        <Route path="/anime/:id/voice-actors" element={<DetailVoiceActors />} />
      </Routes>
    </Router>
  );
};

export default App;
