import React from "react";
// import AnimeSearch from '../components/search/SearchContainer';
import SearchContainer from "../components/search/SearchContainer";
import Navbar from "../components/Navbar";

const SearchPage: React.FC<{type: string}> = ({type}) => {
  return (
    <div className="bg-bg-color w-full h-full min-h-screen">
      <Navbar />
      {type === "anime" ? <SearchContainer contentType="anime" /> : <SearchContainer contentType="manga" />}
    </div>
  );
};

export default SearchPage;
