import React from "react";

interface TrailerProps {
  url: String;
}

const Trailer: React.FC<TrailerProps> = ({ url }) => {
  return (
    <div className="youtube-video">
      <iframe
        className="w-full h-72 md:w-1/3 md:h-72"
        src={`https://www.youtube.com/embed/${url}?autoplay=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Trailer;
