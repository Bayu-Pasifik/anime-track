import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStudios, fetchPeople } from "../redux/otherSlice"; // Import fetch actions
import Card from "../components/home/Card";
import PaginationButton from "../components/PaginationButton"; // Import PaginationButton
import LoadingAnimation from "../components/LoadingAnimations";

interface OtherPageProps {
  type: "studios" | "persons" | "magazines";
}

const OtherPage: React.FC<OtherPageProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { studios, people, loading, pagination } = useSelector((state: RootState) => state.other);

  useEffect(() => {
    if (type === "studios") {
      dispatch(fetchStudios(pagination.current_page)); // Fetch studios data
    } else if (type === "persons") {
      dispatch(fetchPeople(pagination.current_page)); // Fetch people data
    }
  }, [dispatch, type, pagination.current_page]);

  const handlePageChange = (page: number) => {
    if (type === "studios") {
      dispatch(fetchStudios(page));
    } else if (type === "persons") {
      dispatch(fetchPeople(page));
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-bg-color w-full h-full min-h-screen">
      <Navbar />
      <div className="p-4 grid grid-cols-2 md:grid-cols-6 gap-6">
        {type === "studios" &&
          studios.map((studio) => {
            const defaultTitle = studio.titles.find((t: any) => t.type === "Default")?.title || studio.titles[0]?.title;
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

        {type === "persons" &&
          people.map((person) => (
            <Card
              key={person.mal_id}
              imageUrl={person.images.jpg.image_url}
              title={person.name}
              synopsis={person.about || "No description available"}
              type="person"
              mal_id={person.mal_id}
            />
          ))}
      </div>

      {/* Pagination Button Component */}
      <PaginationButton
        currentPage={pagination.current_page}
        totalPages={pagination.last_visible_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OtherPage;
