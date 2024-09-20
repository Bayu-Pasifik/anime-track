import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStudios, fetchPeople, fetchMagazine } from "../redux/otherSlice"; // Import fetch actions
import Card from "../components/home/Card";
import PaginationButton from "../components/PaginationButton"; // Import PaginationButton
import LoadingAnimation from "../components/LoadingAnimations";
import Footer from "../components/Footer";

interface OtherPageProps {
  type: "studios" | "persons" | "magazines";
}

const OtherPage: React.FC<OtherPageProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { studios, people, magazines, loading, pagination } = useSelector(
    (state: RootState) => state.other
  );

  // Local state to control the current page
  const [localPage, setLocalPage] = useState(1);

  useEffect(() => {
    // Reset page to 1 when type changes
    setLocalPage(1);
  }, [type]);

  useEffect(() => {
    if (type === "studios") {
      dispatch(fetchStudios(localPage)); // Fetch studios data
    } else if (type === "persons") {
      dispatch(fetchPeople(localPage)); // Fetch people data
    } else if (type === "magazines") {
      dispatch(fetchMagazine(localPage)); // Fetch magazines data
    }
  }, [dispatch, type, localPage]);

  const handlePageChange = (page: number) => {
    setLocalPage(page); // Update the local page state
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-bg-color w-full h-full min-h-screen">
      <Navbar />
      <div className="p-4">
        {type === "studios" && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {studios.map((studio) => {
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
        )}

        {type === "persons" && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {people.map((person) => (
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
        )}

        {type === "magazines" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {magazines.map((magazine) => (
              <div
                key={magazine.mal_id}
                className="bg-slate-600 shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  <a
                     href={`/magazines/detail/${magazine.mal_id}?name=${encodeURIComponent(magazine.name)}`}
                    className="text-white hover:underline hover:text-blue-500"
                  >
                    {magazine.name}
                  </a>
                </h3>
                <p className="text-white text-sm">
                  Total titles: {magazine.count}
                </p>
                <div className="mt-4">
                  <a
                     href={`/magazines/detail/${magazine.mal_id}?name=${encodeURIComponent(magazine.name)}`}
                    className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 text-sm transition-colors duration-300"
                  >
                    View Magazine
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Button Component */}
      <PaginationButton
        currentPage={localPage} // Use local page
        totalPages={pagination.last_visible_page}
        onPageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
};

export default OtherPage;
