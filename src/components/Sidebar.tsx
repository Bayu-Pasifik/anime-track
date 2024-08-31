import { AnimeDetail } from "../config/data";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Manga } from "../config/manga";

interface SidebarProps {
  animeDetail?: AnimeDetail;
  className?: string;
  mangaDetail?: Manga;
  type ?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ animeDetail, className,type,mangaDetail }) => {
  if (animeDetail && type === "anime") {
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <div
          className="sidebar bg-slate-800 mx-4 mt-4 rounded-xl h-auto p-4 shadow-lg overflow-x-auto"
          key={animeDetail!.mal_id}
        >
          <div className="w-full h-auto lg:grid lg:grid-cols-1 gap-4 flex flex-row flex-wrap lg:flex-col">
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Format</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.type || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Episodes</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.episodes || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">
                Episodes Duration
              </p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.duration
                  ? `${animeDetail!.duration}`
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Status</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.status || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Start Date</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.aired?.from
                  ? animeDetail!.aired.from.replace("T00:00:00+00:00", "")
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">End Date</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.aired?.to
                  ? animeDetail!.aired.to.replace("T00:00:00+00:00", "")
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Season</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.season || animeDetail!.year
                  ? `${animeDetail!.season} ${animeDetail!.year}`
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Popularity</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.popularity || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Favorites</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.favorites || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Studios</p>
              {animeDetail!.studios?.length > 0 ? (
                animeDetail!.studios.map((studio, index) => (
                  <p key={index} className="text-md font-medium text-gray-500">
                    {studio.name}
                  </p>
                ))
              ) : (
                <p className="text-md font-medium text-gray-500">Undefined</p>
              )}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Producers</p>
              {animeDetail!.producers?.length > 0 ? (
                animeDetail!.producers.map((producer, index) => (
                  <p key={index} className="text-md font-medium text-gray-500">
                    {producer.name}
                  </p>
                ))
              ) : (
                <p className="text-md font-medium text-gray-500">Undefined</p>
              )}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Source</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.source || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Genres</p>
              {animeDetail!.genres?.length > 0 ? (
                animeDetail!.genres.map((genre, index) => (
                  <p key={index} className="text-md font-medium text-gray-500">
                    {genre.name}
                  </p>
                ))
              ) : (
                <p className="text-md font-medium text-gray-500">Undefined</p>
              )}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Rating</p>
              <p className="text-md font-medium text-gray-500">
                {animeDetail!.rating || "Undefined"}
              </p>
            </div>
          </div>
        </div>
        {animeDetail!.external?.length > 0 ? (
          <div className="external-links mt-3 w-full flex flex-col items-center p-4">
            {animeDetail!.external.map((external, index) => (
              <div
                key={index}
                className="external-link-item bg-slate-800 w-full mx-4 my-2 p-4 rounded-xl shadow-lg"
              >
                <div className="flex flex-row items-center">
                  <FaExternalLinkAlt className="mr-2 text-gray-500" />
                  <a
                    href={external.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-medium text-gray-500 hover:text-blue-600 truncate"
                  >
                    {external.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="external-links mt-3 w-full flex flex-col items-center p-4">
            <p className="text-md font-medium text-gray-500">Undefined</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <div
          className="sidebar bg-slate-800 mx-4 mt-4 rounded-xl h-auto p-4 shadow-lg overflow-x-auto"
          key={mangaDetail!.mal_id}
        >
          <div className="w-full h-auto lg:grid lg:grid-cols-1 gap-4 flex flex-row flex-wrap lg:flex-col">
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Authors</p>
              {mangaDetail?.authors.map((author, index) => (
                <p key={index} className="text-md font-medium text-gray-500">
                  {author.name}
                </p>
              ))}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Format</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.type || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Chapter</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.chapter || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">
                Volumes
              </p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.volumes || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Status</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.status || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Publish Start Date</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.published?.from
                  ? mangaDetail!.published.from.replace("T00:00:00+00:00", "")
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Publish End Date</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.published?.to
                  ? mangaDetail!.published.to.replace("T00:00:00+00:00", "")
                  : "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Popularity</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.popularity || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Favorites</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.favorites || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Publisher</p>
              {mangaDetail!.serializations?.length > 0 ? (
                mangaDetail!.serializations.map((serial, index) => (
                  <p key={index} className="text-md font-medium text-gray-500">
                    {serial.name}
                  </p>
                ))
              ) : (
                <p className="text-md font-medium text-gray-500">Undefined</p>
              )}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Source</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.type || "Undefined"}
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Genres</p>
              {mangaDetail!.genres?.length > 0 ? (
                mangaDetail!.genres.map((genre, index) => (
                  <p key={index} className="text-md font-medium text-gray-500">
                    {genre.name}
                  </p>
                ))
              ) : (
                <p className="text-md font-medium text-gray-500">Undefined</p>
              )}
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xl font-medium text-blue-600">Rank</p>
              <p className="text-md font-medium text-gray-500">
                {mangaDetail!.rank || "Undefined"}
              </p>
            </div>
          </div>
        </div>
        {mangaDetail!.external?.length > 0 ? (
          <div className="external-links mt-3 w-full flex flex-col items-center p-4">
            {mangaDetail!.external.map((external, index) => (
              <div
                key={index}
                className="external-link-item bg-slate-800 w-full mx-4 my-2 p-4 rounded-xl shadow-lg"
              >
                <div className="flex flex-row items-center">
                  <FaExternalLinkAlt className="mr-2 text-gray-500" />
                  <a
                    href={external.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-medium text-gray-500 hover:text-blue-600 truncate"
                  >
                    {external.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="external-links mt-3 w-full flex flex-col items-center p-4">
            <p className="text-md font-medium text-gray-500">Undefined</p>
          </div>
        )}
      </div>
    );
  }
};

export default Sidebar;
