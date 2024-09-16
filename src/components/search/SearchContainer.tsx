import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSearchResults,
  fetchGenre,
  clearSearchResults,
} from "../../redux/animeSlice";
import {
  fetchMangaSearchResults,
  fetchMangaGenres,
  clearMangaSearchResults,
} from "../../redux/mangaSlice";
import Card from "../../components/home/Card";
import LoadingAnimation from "../../components/LoadingAnimations";
import GenreChips from "../search/GenreChips";
import DropdownFilter from "../search/DropDownFilter";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import PaginationButton from "../../components/PaginationButton";

interface SearchContainerProps {
  contentType: "anime" | "manga";
}

const SearchContainer: React.FC<SearchContainerProps> = ({ contentType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, pagination } = useSelector(
    (state: RootState) => (contentType === "anime" ? state.anime : state.manga)
  );

  // State for managing search parameters and pagination
  const [page, setPage] = useState(() => Number(sessionStorage.getItem(`${contentType}-page`)) || 1);
  const [query, setQuery] = useState(() => sessionStorage.getItem(`${contentType}-query`) || "");
  const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
    const savedGenres = sessionStorage.getItem(`${contentType}-selectedGenres`);
    return savedGenres ? JSON.parse(savedGenres) : [];
  });
  const [type, setType] = useState(() => sessionStorage.getItem(`${contentType}-type`) || "");
  const [statusFilter, setStatusFilter] = useState(() => sessionStorage.getItem(`${contentType}-statusFilter`) || "");
  const [initialLoading, setInitialLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [genres, setGenres] = useState<{ mal_id: number; name: string }[]>([]);

  // Fetch genres when component mounts
  useEffect(() => {
    const loadGenres = async () => {
      if (contentType === "anime") {
        const result = await dispatch(fetchGenre()).unwrap();
        setGenres(result);
      } else {
        const result = await dispatch(fetchMangaGenres()).unwrap();
        setGenres(result);
      }
    };
    loadGenres();
  }, [dispatch, contentType]);

  // Save search state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`${contentType}-page`, page.toString());
    sessionStorage.setItem(`${contentType}-query`, query);
    sessionStorage.setItem(`${contentType}-selectedGenres`, JSON.stringify(selectedGenres));
    sessionStorage.setItem(`${contentType}-type`, type);
    sessionStorage.setItem(`${contentType}-statusFilter`, statusFilter);
  }, [page, query, selectedGenres, type, statusFilter, contentType]);

  // Fetch data only when Search Button is clicked or when state changes
  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        if (query || selectedGenres.length > 0 || type || statusFilter) {
          if (contentType === "anime") {
            await dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page })).unwrap();
          } else {
            await dispatch(fetchMangaSearchResults({ query, selectedGenres, type, statusFilter, page })).unwrap();
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Handle Search Button
  const handleSearch = async () => {
    setPage(1); // Reset page to 1 on new search
    setInitialLoading(true);
    try {
      if (contentType === "anime") {
        await dispatch(clearSearchResults());
        await dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page: 1 })).unwrap();
      } else {
        await dispatch(clearMangaSearchResults());
        await dispatch(fetchMangaSearchResults({ query, selectedGenres, type, statusFilter, page: 1 })).unwrap();
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  // Handle Pagination
  const handlePageChange = async (newPage: number) => {
    if (loading || isFetching) return;
    setPage(newPage);
    setIsFetching(true);
    try {
      if (contentType === "anime") {
        await dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page: newPage })).unwrap();
      } else {
        await dispatch(fetchMangaSearchResults({ query, selectedGenres, type, statusFilter, page: newPage })).unwrap();
      }
    } catch (error) {
      console.error("Error fetching paginated results:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Toggle genres selection
  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(id)
        ? prevSelectedGenres.filter((genreId) => genreId !== id)
        : [...prevSelectedGenres, id]
    );
  };

  return (
    <div className="min-h-screen w-full p-3">
      {/* Search Inputs */}
      <div className="flex flex-col space-y-3 gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:space-x-4">
          <SearchInput query={query} setQuery={setQuery} />
          <DropdownFilter
            label="Type"
            options={contentType === "anime" ? animeTypeOptions : mangaTypeOptions}
            selectedValue={type}
            setSelectedValue={setType}
          />
          <DropdownFilter
            label="Status"
            options={statusOptions}
            selectedValue={statusFilter}
            setSelectedValue={setStatusFilter}
          />
        </div>
        <GenreChips genres={genres} selectedGenres={selectedGenres} handleGenreToggle={handleGenreToggle} />
        <SearchButton onClick={handleSearch} isSearching={initialLoading} />
      </div>

      {/* Loading Animation */}
      {initialLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 my-12">
            {searchResults?.map((item) => (
              <Card key={item.mal_id} type={contentType} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <PaginationButton
            currentPage={page}
            totalPages={pagination?.last_visible_page || 1}
            onPageChange={handlePageChange}
            // isFetching={isFetching}
          />
        </>
      )}
    </div>
  );
};

// Options for Dropdowns
const animeTypeOptions = [
  { value: "", label: "All Types" },
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
];

const mangaTypeOptions = [
  { value: "", label: "All Types" },
  { value: "manga", label: "Manga" },
  { value: "novel", label: "Novel" },
  { value: "lightnovel", label: "Light Novel" },
  { value: "oneshot", label: "One-shot" },
  { value: "doujin", label: "Doujin" },
];

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "airing", label: "Airing" },
  { value: "complete", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
];

export default SearchContainer;
