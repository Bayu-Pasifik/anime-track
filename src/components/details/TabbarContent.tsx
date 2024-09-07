import React, { useEffect, useState } from "react";
import AnimeRecomendation from "../AnimeRecomendation";
import ListTile from "../ListTile";
import Trailer from "../Trailer";
import CharacterName from "./CharacterName";
import ImageClick from "./ImageClick";
import { AnimeDetail } from "../../config/data";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import {
  fetchAnimePicture,
  fetchDetailAnimeStaff,
} from "../../redux/detailAnimeSlice";

interface TabbarContentProps {
  activeTab: string;
}

const TabbarContent: React.FC<TabbarContentProps> = ({ activeTab }) => {
  let content;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { animeDetail, animeCharacter, staffAnime, Recommendations } =
    useSelector((state: RootState) => state.detailAnime);
  useEffect(() => {
    // Fetch anime pictures only when activeTab is "Pictures"
    if (activeTab === "Pictures" && id) {
      dispatch(fetchAnimePicture(id));
    }
  }, [activeTab, id, dispatch]);

  switch (activeTab) {
    case "Overview":
      return (
        <div>
          <div className="font-roboto font-bold">
            <h1 className="text-xl text-white">Related Series</h1>
          </div>
          <div className="text-white">
            <table className="table-auto w-full border-collapse border border-gray-800">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">Relation</th>
                  <th className="border border-gray-600 px-4 py-2">Type</th>
                  <th className="border border-gray-600 px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {animeDetail?.relations.map((relation, relationIndex) => (
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
            {staffAnime!.slice(0, 3).map((staff) => {
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
                        <p className="text-sm text-white">{staff.positions}</p>
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
          <Trailer url={animeDetail!.trailer!.youtube_id!} />

          <AnimeRecomendation
            animeRecomendation={Recommendations!}
            type="anime"
          />
        </div>
      );
      break;
    case "Character":
      content = <h1>Character</h1>;
      break;
    case "Staff":
      content = <h1>Staff</h1>;
      break;
    case "Pictures":
      content = <h1>Pictures</h1>;
      break;
    default:
      content = <h1>No Content Available</h1>;
      break;
  }

  return <div>{content}</div>;
};

export default TabbarContent;
