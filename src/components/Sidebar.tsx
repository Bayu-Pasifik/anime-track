import { AnimeDetail } from "../config/data";
import { FaExternalLinkAlt } from "react-icons/fa"; // Importing FontAwesome icon

interface SidebarProps {
  animeDetail: AnimeDetail;
}

const Sidebar: React.FC<SidebarProps> = ({ animeDetail }) => {
  console.log(animeDetail);
  return (
    <div className="flex flex-col w-1/4">
      <div className="sidebar bg-gray-100 mx-4 mt-4 rounded-xl h-auto p-4" key={animeDetail.mal_id}>
        <div className="w-full h-auto flex flex-col">
          <p className="text-xl font-medium text-blue-600">Format</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.type}</p>
          <p className="text-xl font-medium text-blue-600">Episodes</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.episodes}</p>
          <p className="text-xl font-medium text-blue-600">Episodes Duration</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.duration}</p>
          <p className="text-xl font-medium text-blue-600">Status</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.status}</p>
          <p className="text-xl font-medium text-blue-600">Start Date</p>
          <p className="text-md font-medium text-gray-500">
            {animeDetail.aired.from.replace("T00:00:00+00:00", "")}
          </p>
          <p className="text-xl font-medium text-blue-600">End Date</p>
          <p className="text-md font-medium text-gray-500">
            {animeDetail.aired.to.replace("T00:00:00+00:00", "")}
          </p>
          <p className="text-xl font-medium text-blue-600">Season</p>
          <p className="text-md font-medium text-gray-500">
            {animeDetail.season} {animeDetail.year}
          </p>
          <p className="text-xl font-medium text-blue-600">Popularity</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.popularity}</p>
          <p className="text-xl font-medium text-blue-600">Favorites</p>
          <p className="text-md font-medium text-gray-500">{animeDetail.favorites}</p>
          <p className="text-xl font-medium text-blue-600">Studios</p>
          {animeDetail.studios.map((studio, index) => (
            <p key={index} className="text-md font-medium text-gray-500 break-words word-break">{studio.name}</p>
          ))}
          <p className="text-xl font-medium text-blue-600">Producers</p>
          {animeDetail.producers.map((producer, index) => (
            <p key={index} className="text-md font-medium text-gray-500 break-words word-break">{producer.name}</p>
          ))}
          <p className="text-xl font-medium text-blue-600">Source</p>
          <p className="text-md font-medium text-gray-500 break-words word-break">{animeDetail.source}</p>
          <p className="text-xl font-medium text-blue-600">Genres</p>
          {animeDetail.genres.map((genre, index) => (
            <p key={index} className="text-md font-medium text-gray-500 break-words word-break">{genre.name}</p>
          ))}
          <p className="text-xl font-medium text-blue-600">Rating</p>
          <p className="text-md font-medium text-gray-500 break-words word-break">{animeDetail.rating}</p>
        </div>
      </div>
      <div className="external-links mt-3 w-full flex flex-col items-center p-4">
        {animeDetail.external.map((external, index) => (
          <div key={index} className="external-link-item bg-gray-100 w-full mx-4 my-2 p-4 rounded-xl">
            <div className="flex flex-row items-center">
              <FaExternalLinkAlt className="mr-2 text-gray-500" />
              <a href={external.url} target="_blank" rel="noopener noreferrer" className="text-md font-medium text-gray-500 hover:text-blue-600 break-words word-break">
                {external.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
