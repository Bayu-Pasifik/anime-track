import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimeDetail } from "../config/data";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllRelations, setShowAllRelations] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`/anime/${id}/full`);
        setAnimeDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-40 w-40 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-2xl text-black">Loading</p>
      </div>
    );
  }

  if (!animeDetail) {
    return <p className="text-2xl text-white">Anime details not found</p>;
  }

  return (
    <div className="bg-slate-800 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-start">
        <div className="md:w-1/3 w-full mb-4 md:mb-0">
          <img
            src={animeDetail.images.jpg.large_image_url}
            alt={animeDetail.title}
            className="object-cover rounded-xl w-full"
          />
        </div>
        <div className="md:w-2/3 w-full md:ml-8  p-4 rounded-xl font-mono">
          <h1 className="text-4xl font-bold text-white mb-2">
            {animeDetail.title}
          </h1>
          <p className="text-xl text-white mb-4 font-roboto">
            {animeDetail.title_japanese} / {animeDetail.title_english}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-white flex items-center">
              ⭐{animeDetail.score}
            </span>
            <span className="text-xl text-white ml-2">
              ({animeDetail.scored_by} votes)
            </span>
          </div>
          <p className="text-lg text-white mb-4 text-justify font-dm-mono">
            {animeDetail.synopsis}
          </p>
          <div className="flex flex-wrap text-white">
            <div className="w-full md:w-1/2">
              <p>
                <span className="font-bold">Rank:</span> {animeDetail.rank}
              </p>
              <p>
                <span className="font-bold">Type:</span> {animeDetail.type}
              </p>
              <p>
                <span className="font-bold">Episodes:</span>{" "}
                {animeDetail.episodes}
              </p>
              <p>
                <span className="font-bold">Status:</span> {animeDetail.status}
              </p>
              <p>
                <span className="font-bold">Source:</span> {animeDetail.source}
              </p>
              <p>
                <span className="font-bold">Season:</span> {animeDetail.season}{" "}
                {animeDetail.year}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p>
                <span className="font-bold">Rating:</span> {animeDetail.rating}
              </p>
              <p>
                <span className="font-bold">Aired:</span>{" "}
                {animeDetail.aired.string}
              </p>
              <p>
                <span className="font-bold">Studios:</span>{" "}
                {animeDetail.studios.map((studio) => studio.name).join(", ")}
              </p>
              <p>
                <span className="font-bold">Genres:</span>{" "}
                {animeDetail.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <span className="font-bold">Duration:</span>{" "}
                {animeDetail.duration}
              </p>
              <p>
                <span className="font-bold">Demographics:</span>{" "}
                {animeDetail.demographics
                  .map((demographic) => demographic.name)
                  .join(", ")}
              </p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">Relation</h3>
          <div className="flex flex-col">
            {animeDetail.relations.map((relation, index) => (
              <div key={index} className="mb-2">
                <p className="text-lg text-white mb-2">{relation.relation}:</p>
                <div className="flex flex-wrap">
                  {relation.entry.slice(0, showAllRelations ? relation.entry.length : 2).map((entry) => (
                    <Link
                      key={entry.mal_id}
                      to={`/detail/${entry.mal_id}`}
                      className="text-blue-400 hover:underline mr-4 mb-2"
                    >
                      {entry.name} ({entry.type})
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {!showAllRelations ? (
              <button
                onClick={() => setShowAllRelations(true)}
                className="text-blue-400 hover:underline mt-2 flex justify-end"
              >
                See More
              </button>
            ) : (
              <button
                onClick={() => setShowAllRelations(false)}
                className="text-blue-400 hover:underline mt-2 flex justify-end"
              >
                See Less
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
