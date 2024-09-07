import React from "react";
// import AnimeSearch from '../components/search/SearchContainer';
import SearchContainer from "../components/search/SearchContainer";
import Navbar from "../components/Navbar";

const SearchPage: React.FC = () => {
  return (
    <div className="bg-bg-color w-full h-full min-h-screen">
      <Navbar />
      <SearchContainer contentType="anime" />
    </div>
  );
};

export default SearchPage;
