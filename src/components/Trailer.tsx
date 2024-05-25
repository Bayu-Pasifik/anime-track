import React from "react";
import { AnimeDetail } from "../config/data";

interface TrailerProps {
  data: AnimeDetail;
}

const Trailer: React.FC<TrailerProps> = ({ data }) => {
  return (
    <div className="youtube-video">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${data.trailer.youtube_id}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
