import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStudioDetails, fetchAnimeByStudios } from "../redux/otherSlice";
import LoadingAnimation from "../components/LoadingAnimations";
import Card from "../components/home/Card";
import PaginationButton from "../components/PaginationButton";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DetailStudios: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { detailStudios, animeByStudios, loading, pagination } = useSelector(
    (state: RootState) => state.other
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchStudioDetails(parseInt(id)));
      dispatch(
        fetchAnimeByStudios({
          producers: parseInt(id),
          page: pagination.current_page,
        })
      );
    }
  }, [dispatch, id, pagination.current_page]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchAnimeByStudios({ producers: parseInt(id!), page: newPage }));
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-gray-200 w-full h-full min-h-screen p-4">
        {detailStudios && (
          <div className="studio-details bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                  src={detailStudios.images.jpg.image_url}
                  alt={detailStudios.titles[0].title}
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="md:w-2/3 md:ml-8">
                <div className="text-3xl font-bold text-teal-400 mb-4 flex flex-wrap gap-2">
                  {detailStudios.titles.map((title, index) => (
                    <span key={index}>
                      {title.title}
                      {index < detailStudios.titles.length - 1 && " / "}
                    </span>
                  ))}
                </div>

                <p className="text-lg mb-4 text-gray-300">
                  {detailStudios.about}
                </p>
                <p className="text-md mb-2 text-gray-400">
                  <strong>Established:</strong>{" "}
                  {new Date(detailStudios.established).toLocaleDateString()}
                </p>
                <p className="text-md mb-2 text-gray-400">
                  <strong>Favorites:</strong> {detailStudios.favorites}
                </p>
                <div className="external-links mt-4">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">
                    External Links
                  </h3>
                  <div className="flex flex-wrap">
                    {detailStudios.external.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 text-teal-500 hover:text-teal-300 underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="anime-by-studio mb-8">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">
            Anime by {detailStudios?.titles[0].title} ( {detailStudios?.count} )
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {animeByStudios.map((anime) => (
              <Card
                key={anime.mal_id}
                imageUrl={anime.images.jpg.image_url}
                title={anime.title}
                synopsis={anime.synopsis || "No description available"}
                type="anime"
                mal_id={anime.mal_id}
              />
            ))}
          </div>
        </div>

        {pagination.has_next_page && (
          <div className="pagination flex justify-center mt-6">
            <PaginationButton
              currentPage={pagination.current_page}
              totalPages={pagination.last_visible_page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailStudios;
