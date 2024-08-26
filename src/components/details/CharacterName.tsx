const CharacterName: React.FC<{ name: string,to:string }> = ({ name,to }) => {
  return (
    <div>
      <a href={to} className="cursor-pointer">
        <p className="hover:text-blue-700 text-white">
          {name}
        </p>
      </a>
    </div>
  );
};
export default CharacterName;
