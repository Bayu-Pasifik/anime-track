import React from "react";

interface TrailerProps {
  url: String;
}

const Trailer: React.FC<TrailerProps> = ({ url }) => {
  return (
    <div className="youtube-video">
      <iframe
      className="w-full lg:w-1/2 lg:h-72 sm:w-auto sm:h-auto"
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
