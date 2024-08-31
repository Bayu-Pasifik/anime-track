const CharacterName: React.FC<{ name?: string; to: string }> = ({ name, to }) => {
  if(name ==="N/A") {
    return   (
      <div className="w-full max-w-xs">
          <p className="hover:text-blue-700 text-white truncate text-sm cursor-pointer">
            {name}
          </p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-xs">
      <a href={to} className="cursor-pointer">
        <p className="hover:text-blue-700 text-white truncate text-sm">
          {name}
        </p>
      </a>
    </div>
  );
};

export default CharacterName;
