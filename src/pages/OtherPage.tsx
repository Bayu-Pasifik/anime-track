import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStudios } from "../redux/otherSlice"; // Import fetchStudios action
import Card from "../components/home/Card"; // Import Card component
import PaginationButton from "../components/PaginationButton"; // Import PaginationButton component
import LoadingAnimation from "../components/LoadingAnimations";

interface OtherPageProps {
  type: "studios" | "person" | "magazine";
}

const OtherPage: React.FC<OtherPageProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { studios, loading, pagination } = useSelector(
    (state: RootState) => state.other
  );

  const [currentPage, setCurrentPage] = useState<number>(1); // State untuk halaman saat ini

  useEffect(() => {
    if (type === "studios") {
      dispatch(fetchStudios(currentPage)); // Fetch data berdasarkan halaman saat ini
    }
  }, [dispatch, type, currentPage]); // Tambahkan currentPage sebagai dependency

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Ubah halaman saat tombol paginasi diklik
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-bg-color w-full h-full min-h-screen">
      <Navbar />
      <div className="p-4 grid grid-cols-2 md:grid-cols-6 gap-6">
        {studios.map((studio) => {
          // Find the "Default" title, or fallback to the first title if none is marked as "Default"
          const defaultTitle =
            studio.titles.find((t: any) => t.type === "Default")?.title ||
            studio.titles[0]?.title;

          return (
            <Card
              key={studio.mal_id}
              imageUrl={studio.images.jpg.image_url}
              title={defaultTitle}
              synopsis={studio.about || "No description available"}
              type="studios"
              mal_id={studio.mal_id}
            />
          );
        })}
      </div>

      {/* Pagination Button */}
      <PaginationButton
        currentPage={pagination.current_page}
        totalPages={pagination.last_visible_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OtherPage;
