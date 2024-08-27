const CharacterName: React.FC<{ name: string; to: string }> = ({ name, to }) => {
  return (
    <div className="w-full max-w-xs">
      <a href={to} className="cursor-pointer">
        <p className="hover:text-blue-700 text-white truncate">
          {name}
        </p>
      </a>
    </div>
  );
};

export default CharacterName;
