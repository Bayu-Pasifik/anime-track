import Card from "../home/Card";

interface SearchResultsProps {
  searchResults: any[];
  contentType: "anime" | "manga";
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  contentType,
}) => (
  <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
    {searchResults.map((item, index) =>
      contentType === "anime" ? (
        <Card
          title={item.title}
          imageUrl={item.images.jpg.large_image_url}
          synopsis={item.synopsis}
          type="anime"
          rating={item.score}
          mal_id={item.mal_id}
          key={index}
        />
      ) : (
        <Card
          title={item.title}
          imageUrl={item.images.jpg.large_image_url}
          synopsis={item.synopsis}
          type="manga"
          rating={item.score}
          mal_id={item.mal_id}
          key={index}
        />
      )
    )}
  </div>
);

export default SearchResults;
