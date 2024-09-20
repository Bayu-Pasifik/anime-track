import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMangaByMagazines } from "../redux/otherSlice"; // Import your thunk
import LoadingAnimation from "../components/LoadingAnimations";
import Card from "../components/home/Card";
import { useParams, useLocation } from "react-router-dom";
import PaginationButton from "../components/PaginationButton";
import Navbar from "../components/Navbar";
import AnimatedWrapper from "../components/AnimatedWrapper";
import ViewToggle from "../components/seasonal/ViewToggle";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";

const DetailMagazines: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const magazineName = queryParams.get("name");
  const [viewMode, setViewMode] = useState("card");

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
  const handleViewChange = (view: string) => {
    setViewMode(view);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-bg-color w-full h-full min-h-screen p-4">
        <h1 className="text-3xl font-bold text-teal-400 text-center uppercase">
          Manga from: {magazineName}
        </h1>
        <div className="flex justify-end mb-4">
          <ViewToggle selectedView={viewMode} onViewChange={handleViewChange} />
        </div>
        {viewMode === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {mangaByMagazines.map((manga, index) => (
              <AnimatedWrapper key={manga.mal_id} type="card" index={index}>
                <Card
                  key={manga.mal_id}
                  imageUrl={manga.images.jpg.image_url}
                  title={manga.title}
                  synopsis={manga.synopsis || "No description available"}
                  type="manga"
                  mal_id={manga.mal_id}
                />
              </AnimatedWrapper>
            ))}
          </div>
        )}
        {viewMode === "list" && (
          <div className="flex flex-col space-y-4 p-3">
            {mangaByMagazines.map((manga, index) => (
              <AnimatedWrapper key={manga.mal_id} type="list" index={index}>
                <ListCard
                  key={manga.mal_id}
                  imageUrl={manga.images.jpg.image_url}
                  genres={manga.genres.map((genre) => genre.name)}
                  title={manga.title}
                  synopsis={manga.synopsis || "No description available"}
                />
              </AnimatedWrapper>
            ))}
          </div>
        )}

        {/* Pagination */}

        <div className="pagination flex justify-center mt-6">
          <PaginationButton
            currentPage={localPage} // Use localPage here
            totalPages={pagination.last_visible_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DetailMagazines;
