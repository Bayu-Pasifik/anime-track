const CharacterName: React.FC<{
  name?: string;
  to: string;
  fontSize?: string;
}> = ({ name, to, fontSize = "text-sm" }) => {
  const baseClasses = `hover:text-blue-700 text-white cursor-pointer ${fontSize}`;
  // const largeScreenClasses = "text-wrap";
  const smallScreenClasses = "max-w-32 line-clamp-2";

  if (name === "N/A") {
    return (
      <div className="w-full max-w-32">
        <p className={`${baseClasses}`}>{name}</p>
      </div>
    );
  }

  return (
    <div className="">
      <a href={to} className={baseClasses}>
        <p className={`${baseClasses} ${smallScreenClasses} `}>{name}</p>
      </a>
    </div>
  );
};

export default CharacterName;
