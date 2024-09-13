import React from "react";

interface DropdownYearProps {
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

const DropdownYear: React.FC<DropdownYearProps> = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div className="relative">
      <select
        className="border border-gray-700 p-2 rounded-md bg-gray-800 text-white text-lg md:text-xl"
        value={selectedYear}
        onChange={(e) => onSelectYear(parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownYear;
