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
    {searchResults.map((item,index) =>
      contentType === "anime" ? (
        <Card key={index} anime={item} type ="anime" />
      ) : (
        <Card key={index} manga={item} type="manga" anime={item} />
      )
    )}
  </div>
);

export default SearchResults;
