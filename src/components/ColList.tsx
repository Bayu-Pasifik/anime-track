import React from "react";
import { Link } from "react-router-dom";
import { CharacterDetail } from "../config/characters";
import { StaffData } from "../config/staff";

interface ColListProps {
  type: "character" | "staff";
  listData: CharacterDetail[] | StaffData[];
}

const ColList: React.FC<ColListProps> = ({ type, listData }) => {
  if (type === "character") {
    const characters = listData.slice(0, 6) as CharacterDetail[]; // Hanya menampilkan 6 karakter
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((character) => {
          const japaneseVA = character.voice_actors.find(
            (va) => va.language === "Japanese"
          );
          return (
            <div
              key={character.character.mal_id}
              className="bg-gray-100 p-4 rounded-xl text-gray-500 flex flex-row items-center shadow-xl"
            >
              <img
                src={character.character.images.jpg.image_url}
                alt={character.character.name}
                className="w-20 h-auto rounded-md mb-2"
              />
              <div className="flex flex-col p-4">
                <h4 className="text-md">{character.character.name}</h4>
                <p className="text-sm">{character.role}</p>
              </div>
              {japaneseVA && (
                <div className="flex flex-row items-center ml-auto">
                  <div className="flex flex-col mr-2">
                    <p className="text-md">{japaneseVA.person.name}</p>
                    <p className="text-sm">Japanese</p>
                  </div>
                  <img
                    src={japaneseVA.person.images.jpg.image_url}
                    alt={japaneseVA.person.name}
                    className="w-20 h-auto rounded-md mb-2"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (type === "staff") {
    const staff = listData.slice(0, 3) as StaffData[];
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {staff.map((data) => {
          return (
            <Link to={`/staff/${data.person.mal_id}`} key={data.person.mal_id} className="bg-gray-100 p-4 rounded-xl text-gray-500 flex flex-row items-center shadow-xl">
              <img
                src={data.person.images.jpg.image_url}
                alt={data.person.name}
                className="w-20 h-auto rounded-md mb-2"
              />
              <div className="flex flex-col p-4">
                <h4 className="text-md">{data.person.name}</h4>
                <p className="text-sm">{data.positions.join(", ")}</p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ColList;