import { AnimeDetail } from "../../config/data";
import { Manga } from "../../config/manga";
import InformationText from "./InformationText";

interface InformationProps {
  animeDetail?: AnimeDetail;
  mangaDetail?: Manga;
  type?: string;
}

const Information: React.FC<InformationProps> = ({
  animeDetail,
  mangaDetail,
  type,
}) => {
  return (
    <div className="w-full">
      {type === "anime" && animeDetail && (
        <div className="anime-details p-2">
          <h1 className="text-3xl font-bold text-white">
            {animeDetail.title ?? "Unknown Title"}
          </h1>
          <div>
            <p className="text-xl text-white">
              {animeDetail.title_japanese ?? "Unknown Japanese Title"}
              {animeDetail.title_synonyms?.length > 0 && (
                <span className="ml-2 italic underline">
                {animeDetail.title_synonyms.join(", ")}
                </span>
              )}
              {animeDetail.title_english && (
                <span className="ml-2 italic underline">
                / {animeDetail.title_english ?? ""}
                </span>
              )}

            </p>
            <div className="mt-4 font-roboto md:text-justify">
              <p className="text-xl text-white">
                {"Synopsis"}
              </p>
              <p className="text-xl text-white">
                {animeDetail.synopsis === "" ? "Unknown synopsis" : animeDetail.synopsis}
              </p>
            </div>
            <div className="mt-4 font-roboto md:text-justify">
              <p className="text-xl text-white">
                {"Background"}
              </p>
              <p className="text-xl text-white">
                {animeDetail.background === "" ? "Unknown Background" : animeDetail.background}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <InformationText title="Type" content={animeDetail.type ?? "Unknown"} />
            <InformationText title="Source" content={animeDetail.source ?? "Unknown"} />
            <InformationText title="Episodes" content={animeDetail.episodes?.toString() ?? "Unknown"} />
            <InformationText title="Episodes Duration" content={animeDetail.duration ?? "Unknown"} />
            <InformationText title="Status" content={animeDetail.status ?? "Unknown"} />
            <InformationText title="Seasons" content={animeDetail.season ?? "Unknown"} />
            <InformationText title="Year" content={animeDetail.year?.toString() ?? "Unknown"} />
            <InformationText title="Rating" content={animeDetail.score?.toString() ?? "Unknown"} />
            <InformationText title="Start Date" content={animeDetail.aired?.from?.replace("T00:00:00+00:00", "") ?? "Unknown"} />
            <InformationText title="End Date" content={animeDetail.aired?.to?.replace("T00:00:00+00:00", "") ?? "Unknown"} />
            <InformationText title="Members" content={animeDetail.members?.toString() ?? "Unknown"} />
            <InformationText title="Favorites" content={animeDetail.favorites?.toString() ?? "Unknown"} />
            <InformationText title="Genres" content={animeDetail.genres?.map((genre) => genre.name).join(", ") ?? "Unknown"} />
            <InformationText title="Studios" content={animeDetail.studios?.map((studio) => studio.name).join(", ") ?? "Unknown"} />
            <InformationText title="Producers" content={animeDetail.producers?.map((producer) => producer.name).join(", ") ?? "Unknown"} />
            <InformationText title="Licensors" content={animeDetail.licensors?.map((licensor) => licensor.name).join(", ") ?? "Unknown"} />
          </div>
        </div>
      )}

      {type === "manga" && mangaDetail && (
        <div className="manga-details p-2">
          <h1 className="text-3xl text-white">
            {mangaDetail.title ?? "Unknown Title"}
          </h1>
          <div>
            <p className="text-xl text-white">
              {mangaDetail.title_japanese ?? "Unknown Japanese Title"}{" "}
              {mangaDetail.title_synonyms?.length > 0 && (
                <span className="ml-2 italic underline">
                  / {mangaDetail.title_synonyms.join(", ")}
                </span>
              )}
            </p>
          </div>

          <p className="text-xl text-white text-justify my-3">
            {mangaDetail.synopsis ?? "No synopsis available."}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <InformationText title="Authors" content={mangaDetail.authors?.map((author) => author.name).join(", ") ?? "Unknown"} />
            <InformationText title="Rank" content={mangaDetail.rank?.toString() ?? "Unknown"} />
            <InformationText title="Type" content={mangaDetail.type ?? "Unknown"} />
            <InformationText title="Chapters" content={mangaDetail.chapters?.toString() ?? "Unknown"} />
            <InformationText title="Volumes" content={mangaDetail.volumes?.toString() ?? "Unknown"} />
            <InformationText title="Status" content={mangaDetail.status ?? "Unknown"} />
            <InformationText title="Rating" content={mangaDetail.score?.toString() ?? "Unknown"} />
            <InformationText title="Rated By" content={mangaDetail.scored_by?.toString() ?? "Unknown"} />
            <InformationText title="Start Date" content={mangaDetail.published?.from?.replace("T00:00:00+00:00", "") ?? "Unknown"} />
            <InformationText title="End Date" content={mangaDetail.published?.to?.replace("T00:00:00+00:00", "") ?? "Unknown"} />
            <InformationText title="Members" content={mangaDetail.members?.toString() ?? "Unknown"} />
            <InformationText title="Favorites" content={mangaDetail.favorites?.toString() ?? "Unknown"} />
            <InformationText title="Genres" content={mangaDetail.genres?.map((genre) => genre.name).join(", ") ?? "Unknown"} />
            <InformationText title="Serialization" content={mangaDetail.serializations?.map((serialization) => serialization.name).join(", ") ?? "Unknown"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Information;
