import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface ListCardProps {
  listCharacter: CharacterDetail[];
}

const ListCard: React.FC<ListCardProps> = ({ listCharacter }) => {
  const [displayedCharacters, setDisplayedCharacters] = useState<CharacterDetail[]>([]);

  useEffect(() => {
    // Menampilkan 10 karakter pertama saat komponen dimuat
    setDisplayedCharacters(listCharacter.slice(0, 7));
  }, [listCharacter]);

  const loadMore = () => {
    // Menampilkan 10 karakter tambahan setiap kali "Load More" diklik
    const currentLength = displayedCharacters.length;
    const newCharacters = listCharacter.slice(currentLength, currentLength + 10);
    setDisplayedCharacters([...displayedCharacters, ...newCharacters]);
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-bold">Featuring Character</h2>
        <Link to="/loadmore" className="text-blue-400 hover:underline">
          Load More
        </Link>
      </div>
      <div className="flex space-x-7 flex-wrap">
        {displayedCharacters.map((character) => (
          <Link to={`/detail/${character.character.mal_id}`} key={character.character.mal_id} className="inline-block w-48">
            <div className="card bg-gray-700 mt-4 p-2 border rounded shadow-lg">
              <img
                src={character.character.images.jpg.image_url}
                alt={character.character.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-xl text-center text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {character.character.name} 
              </h2>
              <h2 className="text-xl text-center text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap">({character.role})</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
