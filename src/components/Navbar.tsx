import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    if (openDropdown !== menu) {
      setOpenDropdown(menu);
    }
  };

  const handleParentClick = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-900 text-white w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <a href="/">AniManga Track</a>
        </div>
        <div className="hidden md:flex space-x-6 w-3/4 justify-around">
          {/* Anime Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("anime")}
          >
            <button
              className="hover:text-blue-400"
              onClick={() => handleParentClick("anime")}
            >
              Anime
            </button>
            {openDropdown === "anime" && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded shadow-lg z-10">
                <Link
                  to="/anime/top"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Top Anime
                </Link>
                <Link
                  to="/anime/search"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Search Anime
                </Link>
                <Link
                  to="/anime/seasonal"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Seasonal Anime
                </Link>
              </div>
            )}
          </div>

          {/* Manga Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("manga")}
          >
            <button
              className="hover:text-blue-400"
              onClick={() => handleParentClick("manga")}
            >
              Manga
            </button>
            {openDropdown === "manga" && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded shadow-lg z-10">
                <Link
                  to="/manga/top"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Top Manga
                </Link>
                <Link
                  to="/manga/search"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Search Manga
                </Link>
              </div>
            )}
          </div>

          {/* Genre Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("genre")}
          >
            <button
              className="hover:text-blue-400"
              onClick={() => handleParentClick("genre")}
            >
              Genres
            </button>
            {openDropdown === "genre" && (
              <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded shadow-lg z-10">
                <Link
                  to="/genre/anime"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Anime Genres
                </Link>
                <Link
                  to="/genre/manga"
                  className="block px-4 py-2 hover:bg-slate-700"
                >
                  Manga Genres
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <Link to="/" className="block px-4 py-2 hover:bg-slate-700">
            Home
          </Link>
          <Link to="/anime/top" className="block px-4 py-2 hover:bg-slate-700">
            Top Anime
          </Link>
          <Link
            to="/anime/search"
            className="block px-4 py-2 hover:bg-slate-700"
          >
            Search Anime
          </Link>
          <Link
            to="/anime/seasonal"
            className="block px-4 py-2 hover:bg-slate-700"
          >
            Seasonal Anime
          </Link>
          <Link to="/manga/top" className="block px-4 py-2 hover:bg-slate-700">
            Top Manga
          </Link>
          <Link
            to="/manga/search"
            className="block px-4 py-2 hover:bg-slate-700"
          >
            Search Manga
          </Link>
          <Link
            to="/genre/anime"
            className="block px-4 py-2 hover:bg-slate-700"
          >
            Anime Genres
          </Link>
          <Link
            to="/genre/manga"
            className="block px-4 py-2 hover:bg-slate-700"
          >
            Manga Genres
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-slate-700">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
