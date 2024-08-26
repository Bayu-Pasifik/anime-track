import React from "react";
import { CharacterDetail } from "../config/characters";
import { AnimeDetail } from "../config/data";
import { StaffData } from "../config/staff";
import { Recommendation } from "../config/animeRecomendation";
import { Images } from "../config/animeRecomendation";
import Trailer from "./Trailer";
import AnimeRecomendation from "./AnimeRecomendation";
import ListTile from "./LIstTile";
import PictureGallery from "./ZoomPictures";
import CharacterName from "./details/CharacterName";

interface ContentProps {
  animeCharacter: CharacterDetail[];
  animeStaff: StaffData[];
  detailAnime: AnimeDetail;
  animeRecomendation: Recommendation[];
  pictures : Images[];
  category: string;
  className?: string; // Add this prop for custom className
}

const Content: React.FC<ContentProps> = ({
  animeCharacter,
  animeStaff,
  detailAnime,
  animeRecomendation,
  pictures,
  category,
  className, // Use the className prop
}) => {
  const renderContent = () => {
    const animeCharacters = animeCharacter.slice(0, 4);
    const animeStaffs = animeStaff.slice(0, 3);
    switch (category) {
      case "characters":
        return (
          <div>
            <div className="font-roboto font-bold">
              <h1 className="text-xl text-white">Featuring Characters</h1>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {animeCharacter.map((character) => {
                const japaneseVA = character.voice_actors.find(
                  (va) => va.language === "Japanese"
                )
               return  <ListTile
                  key={character.character.mal_id}
                  leading={
                    <img
                      src={character.character.images.jpg.image_url}
                      alt={character.character.name}
                      className="rounded-md object-cover h-30 w-20"
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName name={character.character.name} to={`/anime/${character.character.mal_id}/charcters`}/>
                      <p className="text-sm text-white">{character.role}</p>
                    </div>
                  }
                  trailing={
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col text-right mr-4">
                        <span className="text-sm text-white">
                          {japaneseVA?.person.name}
                        </span>
                        <span className="text-sm text-white">
                          {japaneseVA?.language}
                        </span>
                      </div>
                      <img
                        src={japaneseVA?.person.images.jpg.image_url}
                        alt={japaneseVA?.person.name}
                        className="rounded-md object-cover h-30 w-20"
                      />
                    </div>
                  }
                />;
              })}
            </div>
          </div>
        );
      case "staff":
        return (
          <div>
            <div className="font-roboto font-bold">
              <h1 className="text-xl text-white">Featuring Staffs</h1>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {animeStaff.map((staff) => {
               return  <ListTile
                  key={staff.person.mal_id}
                  leading={
                    <img
                      src={staff.person.images.jpg.image_url}
                      alt={staff.person.name}
                      className="rounded-md object-cover h-30 w-20"
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <p className="text-white">{staff.person.name}</p>
                      <p className="text-sm text-white">{staff.positions}</p>
                    </div>
                  }
                  
                />;
              })}
            </div>
          </div>
        );
      case "pictures":
        return (
          <div>
            <PictureGallery pictures={pictures} />
          </div>

        );
      default:
        return (
          <div>
            <div className="font-roboto font-bold">
              <h1 className="text-xl text-white">Featuring Characters</h1>
            </div>
            <div className="flex flex-wrap lg:flex-row md:flex-col">
              {animeCharacters.map((character) => {
                const japaneseVA = character.voice_actors.find(
                  (va) => va.language === "Japanese"
                );
                return (
                  <div
                    key={character.character.mal_id}
                    className="lg:w-1/2 md:w-full p-2 mt-4"
                  >
                    <ListTile
                      leading={
                        <img
                          src={character.character.images.jpg.image_url}
                          alt={character.character.name}
                          className="rounded-md object-cover h-30 w-20"
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <p className="text-white">
                            {character.character.name}
                          </p>
                          <p className="text-sm text-white">{character.role}</p>
                        </div>
                      }
                      trailing={
                        <div className="flex flex-row items-center">
                          <div className="flex flex-col text-right mr-4">
                            <span className="text-sm text-white">
                              {japaneseVA?.person.name}
                            </span>
                            <span className="text-sm text-white">
                              {japaneseVA?.language}
                            </span>
                          </div>
                          <img
                            src={japaneseVA?.person.images.jpg.image_url}
                            alt={japaneseVA?.person.name}
                            className="rounded-md object-cover h-30 w-20"
                          />
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
            {/* STAFF */}
            <div className="font-roboto font-bold mt-5">
              <h1 className="text-xl text-white">Featuring Staffs</h1>
            </div>
            <div className="flex flex-wrap md:flex-row">
              {animeStaffs.map((staff) => {
                return (
                  <div
                    key={staff.person.mal_id}
                    className="md:w-full lg:w-1/2 p-2 mt-4"
                  >
                    <ListTile
                      leading={
                        <img
                          src={staff.person.images.jpg.image_url}
                          alt={staff.person.name}
                          className="rounded-md object-cover h-30 w-20"
                        />
                      }
                      title={
                        <div className="flex flex-col ">
                          <p className="text-white">{staff.person.name}</p>
                          <p className="text-sm text-white">
                            {staff.positions}
                          </p>
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
            {/* Trailer */}
            <div className="font-roboto font-bold mt-5">
              <h1 className="text-xl text-white">Trailer</h1>
            </div>
            <Trailer data={detailAnime} />
            {/* Recomendation */}
            <AnimeRecomendation animeRecomendation={animeRecomendation} />
          </div>
        );
    }
  };

  return (
    <div className={`p-4 w-full mt-4 flex flex-col lg:flex-row ${className}`}>
      <div className="content flex flex-col flex-grow order-2 lg:order-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Content;
