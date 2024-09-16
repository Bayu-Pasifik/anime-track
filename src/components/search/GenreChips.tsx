interface GenreChipsProps {
  genres: { mal_id: number; name: string }[];
  selectedGenres?: number[];
  handleGenreToggle?: (id: number) => void;
}

const GenreChips: React.FC<GenreChipsProps> = ({
  genres,
  selectedGenres,
  handleGenreToggle,
}) => (
  <div className="flex flex-wrap gap-2 mt-9">
    {genres.map((genre) => (
      <span
        key={genre.mal_id}
        onClick={() => handleGenreToggle!(genre.mal_id)}
        className={`cursor-pointer px-3 py-1 border rounded-full ${
          selectedGenres!.includes(genre.mal_id)
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {genre.name}
      </span>
    ))}
  </div>
);

export default GenreChips;
