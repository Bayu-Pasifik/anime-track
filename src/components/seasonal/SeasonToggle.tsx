import React from "react";
import { FaSnowflake, FaLeaf, FaSun } from "react-icons/fa";
import { GiFallingLeaf } from "react-icons/gi";
import { motion } from "framer-motion";

// Daftar season dengan ikon masing-masing
const seasonIcons: { [key: string]: JSX.Element } = {
  winter: <FaSnowflake />,
  spring: <FaLeaf />,
  summer: <FaSun />,
  fall: <GiFallingLeaf />,
};

const seasons = ["winter", "spring", "summer", "fall"];

interface SeasonToggleProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const SeasonToggle: React.FC<SeasonToggleProps> = ({
  selectedSeason,
  onSeasonChange,
}) => {
  const selectedIndex = seasons.indexOf(selectedSeason);

  return (
    <div className="relative w-auto h-20 bg-gray-800 rounded-full flex items-center p-1">
      {/* Animasi Slider Toggle */}
      <motion.div
        className="absolute w-16 h-16 bg-blue-600 rounded-full"
        layout
        initial={{ x: 0 }}
        animate={{ x: selectedIndex * 64 }} // Gerakan slider sesuai indeks season yang dipilih
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* Tombol-tombol Season */}
      {seasons.map((season) => (
        <div
          key={season}
          className="cursor-pointer flex justify-center items-center w-16 h-16 z-10"
          onClick={() => onSeasonChange(season)}
        >
          {/* Ikon Season dengan ukuran lebih besar dan di tengah */}
          <div className="text-3xl text-white">{seasonIcons[season]}</div>
        </div>
      ))}
    </div>
  );
};

export default SeasonToggle;
