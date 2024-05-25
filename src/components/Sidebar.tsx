import { AnimeDetail } from "../config/data";

interface SidebarProps {
  animeDetail: AnimeDetail;
}
const Sidebar: React.FC<SidebarProps> = ({ animeDetail }) => {
  return (
    <div className="sidebar bg-slate-300 w-1/4 mx-4 mt-4 rounded-xl" key={animeDetail.mal_id}>
      <div className="w-full h-auto flex flex-col mx-11">
        <p className="text-xl font-medium text-blue-600">Format</p>
        <p className="text-md font-medium text-gray-500">{animeDetail.type}</p>
        <p className="text-xl font-medium text-blue-600">Episodes</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.episodes}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">Episodes Duration</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.duration}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">Status</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.status}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">Start Date</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.aired.from.replace("T00:00:00+00:00", "")}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">End Date</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.aired.to.replace("T00:00:00+00:00", "")}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">Season</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.season} {animeDetail.year}{" "}
        </p>
        <p className="text-xl font-medium text-blue-600">Popularity</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.popularity}
        </p>
        <p className="text-xl font-medium text-blue-600">Favorites</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.favorites}
        </p>
        <p className="text-xl font-medium text-blue-600">Studios</p>
        {animeDetail.studios.map((studio) => (
          <p className="text-md font-medium text-gray-500">{studio.name}</p>
        ))}
        <p className="text-xl font-medium text-blue-600">Producers</p>
        {animeDetail.producers.map((studio) => (
          <p className="text-md font-medium text-gray-500">{studio.name}</p>
        ))}
        <p className="text-xl font-medium text-blue-600">Source</p>
        <p className="text-xl font-medium text-gray-500">
          {animeDetail.source}
        </p>
        <p className="text-xl font-medium text-blue-600">Genres</p>
        {animeDetail.genres.map((genre) => (
          <p className="text-md font-medium text-gray-500">{genre.name}</p>
        ))}
        <p className="text-xl font-medium text-blue-600">Rating</p>
        <p className="text-md font-medium text-gray-500">
          {animeDetail.rating}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
