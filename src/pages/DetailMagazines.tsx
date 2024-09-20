import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMangaByMagazines } from "../redux/otherSlice"; // Import your thunk
import LoadingAnimation from "../components/LoadingAnimations";
import Card from "../components/home/Card";
import { useParams, useLocation } from "react-router-dom";
import PaginationButton from "../components/PaginationButton";
import Navbar from "../components/Navbar";

const DetailMagazines: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const magazineName = queryParams.get("name");

  const { mangaByMagazines, loading, pagination } = useSelector(
    (state: RootState) => state.other
  );
  // Local state to control the current page
  const [localPage, setLocalPage] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(
        fetchMangaByMagazines({
          magazines: parseInt(id),
          page: localPage,
        })
      );
    }
  }, [dispatch, id, localPage]); // Depend on localPage

  const handlePageChange = (newPage: number) => {
    setLocalPage(newPage); // Update local page state
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-bg-color w-full h-full min-h-screen p-4">
        <h1 className="text-3xl font-bold text-teal-400 mb-4">
          Manga from: {magazineName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {mangaByMagazines.map((manga) => (
            <Card
              key={manga.mal_id}
              imageUrl={manga.images.jpg.image_url}
              title={manga.title}
              synopsis={manga.synopsis || "No description available"}
              type="manga"
              mal_id={manga.mal_id}
            />
          ))}
        </div>

        {/* Pagination */}

          <div className="pagination flex justify-center mt-6">
            <PaginationButton
              currentPage={localPage} // Use localPage here
              totalPages={pagination.last_visible_page}
              onPageChange={handlePageChange}
            />
          </div>
      </div>
    </div>
  );
};

export default DetailMagazines;
