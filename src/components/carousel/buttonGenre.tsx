import { Genre } from "../../config/data";

interface ButtonGenreProps {
  genres: Genre[];
}
const ButtonGenre: React.FC<ButtonGenreProps> = ({ genres }) => {
  return (
    <div className="flex flex-row flex-wrap">
      {genres.map((genre) => (
        <div className="p-2 m-2 bg-slate-800 rounded-md" key={genre.mal_id}>
          <p className="text-white">{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ButtonGenre;
