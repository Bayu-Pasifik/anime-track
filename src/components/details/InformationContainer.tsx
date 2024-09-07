import { useState } from "react";
import { AnimeDetail } from "../../config/data";
import { Manga } from "../../config/manga";
import InformationText from "./InformationText";

interface InformationProps {
  animeDetail?: AnimeDetail;
  mangaDetail?: Manga;
  type?: string;
}

const Information: React.FC<InformationProps> = ({ animeDetail, mangaDetail, type }) => {
  const [activeTab, setActiveTab] = useState("Overview"); // State untuk mengelola tab aktif

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="overview">
            <p className="text-md text-white text-justify my-3 font-roboto">{animeDetail?.synopsis}</p>
          </div>
        );
      case "Character":
        return (
          <div className="character">
            <p className="text-md text-white text-justify my-3 font-roboto">Character content goes here...</p>
          </div>
        );
      case "Staff":
        return (
          <div className="staff">
            <p className="text-md text-white text-justify my-3 font-roboto">Staff content goes here...</p>
          </div>
        );
      case "Pictures":
        return (
          <div className="pictures">
            <p className="text-md text-white text-justify my-3 font-roboto">Pictures content goes here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {type === "anime" && animeDetail && (
        <div className="anime-details p-4">
          <h1 className="text-3xl text-white">{animeDetail.title}</h1>
          <h2 className="text-xl text-white my-2">{animeDetail.title_japanese}</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <InformationText title="Type" content={animeDetail.type || "Undefined"} />
            <InformationText title="Source" content={animeDetail.source || "Undefined"} />
            <InformationText title="Episodes" content={animeDetail.episodes.toString() || "Undefined"} />
            <InformationText title="Episodes Duration" content={animeDetail.duration || "Undefined"} />
            <InformationText title="Status" content={animeDetail.status || "Undefined"} />
            <InformationText title="Seasons" content={animeDetail.season || "Undefined"} />
            <InformationText title="Year" content={animeDetail.year.toString() || "Undefined"} />
            <InformationText title="Rating" content={animeDetail.score.toString() || "Undefined"} />
            <InformationText title="Start Date" content={animeDetail.aired.from?.replace("T00:00:00+00:00", "") || "Undefined"} />
            <InformationText title="End Date" content={animeDetail.aired.to.replace("T00:00:00+00:00", "") || "Undefined"} />
            <InformationText title="Members" content={animeDetail.members.toString() || "Undefined"} />
            <InformationText title="Favorites" content={animeDetail.favorites.toString() || "Undefined"} />
            <InformationText title="Genres" content={animeDetail.genres.map((genre) => genre.name).join(", ") || "Undefined"} />
            <InformationText title="Studios" content={animeDetail.studios.map((studio) => studio.name).join(", ") || "Undefined"} />
            <InformationText title="Producers" content={animeDetail.producers.map((producer) => producer.name).join(", ") || "Undefined"} />
            <InformationText title="Licensors" content={animeDetail.licensors.map((licensor) => licensor.name).join(", ") || "Undefined"} />
          </div>
        </div>
      )}

      {type === "manga" && mangaDetail && (
        <div className="manga-details bg-slate-800 rounded-xl p-4 shadow-lg">
          <h1 className="text-3xl text-blue-600">{mangaDetail.title}</h1>
          <p className="text-md text-gray-500">{mangaDetail.synopsis}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xl font-medium text-blue-600">Authors</p>
              {mangaDetail.authors?.map((author, index) => (
                <p key={index} className="text-md font-medium text-gray-500">{author.name}</p>
              ))}
            </div>
            <InformationText title="Type" content={mangaDetail.type || "Undefined"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Information;
