interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
  >
    Search
  </button>
);

export default SearchButton;
