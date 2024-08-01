import { Anime } from "../../config/data";
import { Manga } from "../../config/manga";
import ButtonGenre from "../carousel/buttonGenre";

type Item = Anime | Manga;

interface TopContainerProps {
  title: string;
  items: Item[];
}

const TopContainer: React.FC<TopContainerProps> = ({ title, items }) => {
  return (
    <div className="w-1/2 p-4 mx-4 my-3 bg-slate-200 rounded-lg ">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-2xl text-gray-900">{title}</h1>
        <h1 className="text-2xl text-gray-900 cursor-pointer">View All</h1>
      </div>
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center mb-4 p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full text-gray-800 font-bold">
              #{index + 1}
            </div>
            <img
              src={item.images.jpg.large_image_url}
              alt={item.title}
              className="w-16 h-24 ml-4 object-cover rounded-lg"
            />
            <div className="flex flex-col ml-4">
              <h2 className="text-gray-900 text-lg font-semibold">
                {item.title}
              </h2>
              <div className="flex flex-wrap">
                <ButtonGenre genres={item.genres.slice(0, 3)} />
              </div>
            </div>
            <div className="flex flex-col ml-auto items-end">
              <div className="flex items-center">
                <span className="text-green-500 text-lg mr-1">😊</span>
                <span className="text-gray-900 text-lg">{item.score}%</span>
              </div>
              <span className="text-gray-600">{item.members} users</span>
              <span className="text-gray-600">{item.type}</span>
              {/* <span className="text-gray-600">{item.status}</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContainer;
