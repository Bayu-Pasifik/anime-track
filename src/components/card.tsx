import { Link } from 'react-router-dom';
import { Anime } from '../config/data';

interface cardProps {
    animes: Anime[];
  }
const Card : React.FC<cardProps> = ({animes}) => {
    return (
        <div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {animes.map(anime => (
          <Link to={`/detail/${anime.mal_id}`} key={anime.mal_id}>
            <div className="card mt-4 p-2 border rounded shadow">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-48 object-cover mb-2 rounded" />
              <h2 className="w-full h-20 text-xl text-center text-white font-bold overflow-hidden text-ellipsis">{anime.title}</h2>
            </div>
          </Link>
        ))}
      </div>
        </div>
    )
}

export default Card;