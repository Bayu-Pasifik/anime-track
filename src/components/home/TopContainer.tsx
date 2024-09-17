import { Anime } from "../../config/data";
import { Manga } from "../../config/manga";
import CharacterName from "../details/CharacterName";
import ListTile from "../ListTile";

type Item = Anime | Manga;

interface TopContainerProps {
  title: string;
  items: Item[];
  type: string;
}

const TopContainer: React.FC<TopContainerProps> = ({ title, items, type }) => {
  return (
    <div className="p-4 bg-slate-600 rounded-lg">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-2xl text-white">{title}</h1>
        {type === "anime" ? (
          <h1 className="text-2xl text-white cursor-pointer"><a href="/top/anime">View All</a></h1>
        ): (
          <h1 className="text-2xl text-white cursor-pointer"><a href="/top/manga">View All</a></h1>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <ListTile
            key={index}
            leading={
              <img
                src={item.images.jpg.large_image_url}
                alt={item.title}
                className="w-16 h-24 object-cover rounded-lg"
              />
            }
            title={
              <CharacterName
                name={item.title}
                to={
                  type === "anime"
                    ? `/anime/detail/${item.mal_id}`
                    : `/manga/detail/${item.mal_id}`
                }
                fontSize="text-lg"
              />
            }
            trailing={
              <div className="flex flex-col items-end text-sm space-y-1 mr-2">
                <div className="flex items-center">
                  <span className="text-white text-lg mr-1">😊</span>
                  <span className="text-white text-lg">{item.score}%</span>
                </div>
                <span className="text-white text-right">
                  {item.members} users
                </span>
                <span className="text-white text-right">{item.type}</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TopContainer;
