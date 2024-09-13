import React from "react";
import { FaSnowflake, FaLeaf, FaSun } from "react-icons/fa";
import { GiFallingLeaf } from "react-icons/gi";
import { motion } from "framer-motion";

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
    <div className="relative w-full max-w-xs h-16 bg-gray-800 rounded-lg flex items-center p-1">
      <motion.div
        className="absolute w-16 h-16 bg-blue-600 rounded-lg"
        layout
        initial={{ x: 0 }}
        animate={{ x: selectedIndex * 64 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {seasons.map((season) => (
        <div
          key={season}
          className="cursor-pointer flex justify-center items-center w-16 h-16 z-10"
          onClick={() => onSeasonChange(season)}
        >
          <div className="text-xl md:text-2xl lg:text-3xl text-white">{seasonIcons[season]}</div>
        </div>
      ))}
    </div>
  );
};

export default SeasonToggle;
