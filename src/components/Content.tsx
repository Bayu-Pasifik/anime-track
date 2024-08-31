import React, { useState, useEffect } from "react";
import { CharacterDetail, MangaCharacter } from "../config/characters";
import { AnimeDetail } from "../config/data";
import { StaffData } from "../config/staff";
import { Recommendation } from "../config/animeRecomendation";
import { Images } from "../config/animeRecomendation";
import Trailer from "./Trailer";
import AnimeRecomendation from "./AnimeRecomendation";
import ListTile from "./ListTile";
import PictureGallery from "./ZoomPictures";
import CharacterName from "./details/CharacterName";
import SkeletonListTile from "./SkeletonListTile";
import ImageClick from "./details/ImageClick";
import { Manga } from "../config/manga";

interface ContentProps {
  type : string;
  animeCharacter?: CharacterDetail[];
  animeStaff?: StaffData[];
  detailAnime?: AnimeDetail;
  animeRecomendation?: Recommendation[];
  pictures: Images[];
  category: string;
  className?: string;
  detailManga?: Manga;
  mangaRecomendation?: Recommendation[];
  mangaCharacter?: MangaCharacter[];
}

const Content: React.FC<ContentProps> = ({
  animeCharacter,
  animeStaff,
  detailAnime,
  animeRecomendation,
  pictures,
  category,
  className,
  type,
  detailManga,
  mangaCharacter,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate a loading delay

    return () => clearTimeout(timer);
  }, [category]);


  const renderContentAnime = () => {
    if (isLoading) {
      return (
        <div>
          {category === "characters" && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
          {category === "staff" && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
          {category === "pictures" && (
            <div className="grid gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
          {category === "overview" && (
            <div className="flex flex-col gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
        </div>
      );
    }

    switch (category) {
      case "characters":
        return (
          <div>
            <div className="font-roboto font-bold mt-5 mb-4">
              <h1 className="text-xl text-white">Featuring Characters</h1>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {animeCharacter!.map((character) => {
                const japaneseVA = character.voice_actors!.find(
                  (va) => va.language === "Japanese"
                );
                return (
                  <ListTile
                    key={character.character.mal_id}
                    leading={
                      <ImageClick
                        source={character.character.images.jpg.image_url}
                        aliases={character.character.name}
                        id={character.character.mal_id.toString()}
                        type="animeCharacter"
                      />
                    }
                    title={
                      <div className="flex flex-col">
                        <CharacterName
                          name={character.character.name}
                          to={`/anime/${character.character.mal_id}/characters`}
                        />
                        <p className="text-sm text-white">{character.role}</p>
                      </div>
                    }
                    trailing={
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col text-right mr-4">
                          <CharacterName
                            name={japaneseVA?.person.name ?? "N/A"}
                            to={`/anime/${japaneseVA?.person.mal_id}/voice-actors`}
                          />
                          <p className="text-sm text-white">
                            {japaneseVA?.language}
                          </p>
                        </div>
                        <ImageClick
                          source={japaneseVA?.person.images.jpg.image_url}
                          aliases={japaneseVA?.person.name}
                          id={japaneseVA?.person.mal_id.toString()}
                          type="voiceActor"
                        />
                      </div>
                    }
                  />
                );
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
              {animeStaff!.map((staff) => {
                return (
                  <ListTile
                    key={staff.person.mal_id}
                    leading={
                      <ImageClick
                        source={staff.person.images.jpg.image_url}
                        aliases={staff.person.name}
                        id={staff.person.mal_id.toString()}
                        type="animeStaff"
                      />
                    }
                    title={
                      <div className="flex flex-col">
                        <CharacterName
                          name={staff.person.name}
                          to={`/anime/${staff.person.mal_id}/staff`}
                        />
                        <p className="text-sm text-white">{staff.positions}</p>
                      </div>
                    }
                  />
                );
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
              <h1 className="text-xl text-white">Related Series</h1>
            </div>
            <div className="text-white">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr>
                    <th className="border border-gray-600 px-4 py-2">
                      Relation
                    </th>
                    <th className="border border-gray-600 px-4 py-2">Type</th>
                    <th className="border border-gray-600 px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {detailManga?.relations.map((relation, relationIndex) => (
                    <React.Fragment key={relationIndex}>
                      {relation.entry.map((entry, entryIndex) => (
                        <tr key={entry.mal_id}>
                          {/* Menampilkan Relation hanya sekali untuk setiap kategori Relation */}
                          {entryIndex === 0 && (
                            <td
                              rowSpan={relation.entry.length}
                              className="border border-gray-600 px-4 py-2 align-top"
                            >
                              {relation.relation}
                            </td>
                          )}
                          <td className="border border-gray-600 px-4 py-2">
                            {entry.type}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            <a
                              href={
                                entry.type === "manga"
                                  ? `/manga/detail/${entry.mal_id}`
                                  : `/anime/detail/${entry.mal_id}`
                              }
                              className="text-blue-400 hover:underline"
                            >
                              {entry.name}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="font-roboto font-bold">
              <h1 className="text-xl text-white my-4">Featuring Characters</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {animeCharacter!.slice(0, 4).map((character) => {
                const japaneseVA = character.voice_actors!.find(
                  (va) => va.language === "Japanese"
                );
                return (
                  <div key={character.character.mal_id} className="">
                    <ListTile
                      leading={
                        <ImageClick
                          source={character.character.images.jpg.image_url}
                          aliases={character.character.name}
                          id={character.character.mal_id.toString()}
                          type="animeCharacter"
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <CharacterName
                            name={character.character.name}
                            to={`/anime/${character.character.mal_id}/characters`}
                          />
                          <p className="text-sm text-white">{character.role}</p>
                        </div>
                      }
                      trailing={
                        <div className="flex flex-row items-center">
                          <div className="flex flex-col text-right mr-4">
                            <CharacterName
                              name={japaneseVA?.person.name}
                              to={`/anime/${japaneseVA?.person.mal_id}/voice-actors`}
                            />
                            <p className="text-sm text-white">
                              {japaneseVA?.language}
                            </p>
                          </div>
                          <ImageClick
                            id={japaneseVA?.person.mal_id.toString()}
                            source={japaneseVA?.person.images.jpg.image_url}
                            aliases={japaneseVA?.person.name}
                            type="voiceActors"
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
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
              {animeStaff!.slice(0, 3).map((staff) => {
                return (
                  <div key={staff.person.mal_id}>
                    <ListTile
                      leading={
                        <ImageClick
                          id={staff.person.mal_id.toString()}
                          source={staff.person.images.jpg.image_url}
                          aliases={staff.person.name}
                          type="animeStaff"
                        />
                      }
                      title={
                        <div className="flex flex-col ">
                          <CharacterName
                            name={staff.person.name}
                            to={`/anime/${staff.person.mal_id}/staff`}
                          />
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
            <Trailer data={detailAnime!} />
            {/* Recommendation */}
            <AnimeRecomendation animeRecomendation={animeRecomendation!} />
          </div>
        );
    }
  };
  const renderContentManga = () => {
    if (isLoading) {
      return (
        <div>
          {category === "characters" && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
          {category === "pictures" && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
          {category === "overview" && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 h-72 mt-7">
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
              <SkeletonListTile />
            </div>
          )}
        </div>
      );
    }
    // ! Render manga content
    switch (category) {
      case "characters":
        return (
          <div>
            <div className="font-roboto font-bold mt-5 mb-4">
              <h1 className="text-xl text-white">Featuring Characters</h1>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {mangaCharacter!.map((character) => {
                return (
                  <ListTile
                    key={character.character.mal_id}
                    leading={
                      <ImageClick
                        source={character.character.images.jpg.image_url}
                        aliases={character.character.name}
                        id={character.character.mal_id.toString()}
                        type="animeCharacter"
                      />
                    }
                    title={
                      <div className="flex flex-col">
                        <CharacterName
                          name={character.character.name}
                          to={`/manga/${character.character.mal_id}/characters`}
                        />
                        <p className="text-sm text-white">{character.role}</p>
                      </div>
                    }
                    
                  />
                );
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
              <h1 className="text-xl text-white mt-5 mb-4">Related Series</h1>
            </div>
            <div className="text-white">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr>
                    <th className="border border-gray-600 px-4 py-2">
                      Relation
                    </th>
                    <th className="border border-gray-600 px-4 py-2">Type</th>
                    <th className="border border-gray-600 px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {detailManga!.relations.map((relation, relationIndex) => (
                    <React.Fragment key={relationIndex}>
                      {relation.entry.map((entry, entryIndex) => (
                        <tr key={entry.mal_id}>
                          {/* Menampilkan Relation hanya sekali untuk setiap kategori Relation */}
                          {entryIndex === 0 && (
                            <td
                              rowSpan={relation.entry.length}
                              className="border border-gray-600 px-4 py-2 align-top"
                            >
                              {relation.relation}
                            </td>
                          )}
                          <td className="border border-gray-600 px-4 py-2">
                            {entry.type}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            <a
                              href={
                                entry.type === "manga"
                                  ? `/manga/detail/${entry.mal_id}`
                                  : `/anime/detail/${entry.mal_id}`
                              }
                              className="text-blue-400 hover:underline"
                            >
                              {entry.name}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="font-roboto font-bold">
              <h1 className="text-xl text-white my-4">Featuring Characters</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {mangaCharacter!.slice(0, 4).map((character) => { 
                return (
                  <div key={character.character.mal_id} className="">
                    <ListTile
                      leading={
                        <ImageClick
                          source={character.character.images.jpg.image_url}
                          aliases={character.character.name}
                          id={character.character.mal_id.toString()}
                          type="mangaCharacter"
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <CharacterName
                            name={character.character.name}
                            to={`/manga/${character.character.mal_id}/characters`}
                          />
                          <p className="text-sm text-white">{character.role}</p>
                        </div>
                      }
                      
                    />
                  </div>
                );
              })}
            </div>
            {/* Recommendation */}
            <AnimeRecomendation animeRecomendation={animeRecomendation!} type="manga" />
          </div>
        );
    }
  };

  return (
    <div className={`p-4 w-full mt-4 flex flex-col lg:flex-row ${className}`}>
      <div className="content flex flex-col flex-grow order-2 lg:order-1">
        {type === "anime" ? renderContentAnime() : renderContentManga()}
      </div>
    </div>
  );
};

export default Content;
