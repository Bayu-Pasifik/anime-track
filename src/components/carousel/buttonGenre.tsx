import { Genre } from "../../config/data";

interface ButtonGenreProps {
  genres: Genre[];
}
const ButtonGenre: React.FC<ButtonGenreProps> = ({ genres }) => {
  return (
    <div className="flex flex-row">
      {genres.map((genre) => (
        <div className="p-2 m-2 bg-slate-800">
          <p className="text-white">{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ButtonGenre;
