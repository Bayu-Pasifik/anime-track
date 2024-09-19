const ImageClick: React.FC<{
  source?: string;
  aliases?: string;
  id?: string;
  type?: string;
}> = ({ source, aliases, id, type }) => {
  if (type === "animeCharacter") {
    return (
      <div className="group">
        <a href={`/anime/${id}/characters`}>
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else if (type === "mangaCharacter") {
    return (
      <div className="group">
        <a href={`/manga/${id}/characters`}>
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else if (type === "voiceActors") {
    return (
      <div className="group">
        <a href={`/person/detail/${id}`}>
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else if (type === "animeStaff") {
    return (
      <div className="group">
        <a href={`/anime/${id}/staff`}>
          {" "}
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else if (type === "anime") {
    return (
      <div className="group">
        <a href={`/anime/detail/${id}`}>
          {" "}
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else if (type === "manga") {
    return (
      <div className="group">
        <a href={`/manga/detail/${id}`}>
          {" "}
          <img
            src={source}
            alt={aliases}
            className="rounded-md object-cover h-30 w-20 cursor-pointer"
          />
        </a>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageClick;
