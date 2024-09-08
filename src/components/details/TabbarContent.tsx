import React from "react";
import RelatedSeriesTable from "./RelatedSeriesTable";
import CharacterList from "./CharacterList";
import StaffList from "./StaffList";
import PictureGallery from "../ZoomPictures";
import Trailer from "../Trailer";
import AnimeRecomendation from "../AnimeRecomendation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TabbarContentProps {
  activeTab: string;
  contentType: "anime" | "manga";
}

const TabbarContent: React.FC<TabbarContentProps> = ({ activeTab, contentType }) => {
  const { animeDetail, animeCharacter, staffAnime, Recommendations, animePicture } = useSelector(
    (state: RootState) => state.detailAnime
  );

  switch (activeTab) {
    case "Overview":
      return (
        <div>
          <h1 className="text-xl text-white font-bold my-4">Related Series</h1>
          <RelatedSeriesTable relations={animeDetail?.relations ?? []} />

          <h1 className="text-xl text-white font-bold my-4">Featuring Characters</h1>
          {/* Batasi karakter hanya 6 jika activeTab adalah Overview */}
          <CharacterList characters={animeCharacter ?? []} limit={6} />

          <h1 className="text-xl text-white font-bold my-5">Featuring Staff</h1>
          {/* Batasi staff hanya 6 jika activeTab adalah Overview */}
          <StaffList staff={staffAnime ?? []} limit={6} />

          <h1 className="text-xl text-white font-bold my-5">Trailer</h1>
          <Trailer url={animeDetail?.trailer?.youtube_id ?? ""} />

          <AnimeRecomendation animeRecomendation={Recommendations ?? []} type="anime" />
        </div>
      );

    case "Character":
      return (
        <div>
          <h1 className="text-xl text-white font-bold my-3">Featuring Characters</h1>
          {/* Tampilkan semua karakter tanpa limit */}
          <CharacterList characters={animeCharacter ?? []} />
        </div>
      );

    case "Staff":
      return (
        <div>
          <h1 className="text-xl text-white font-bold my-3">Featuring Staff</h1>
          {/* Tampilkan semua staff tanpa limit */}
          <StaffList staff={staffAnime ?? []} />
        </div>
      );

    case "Pictures":
      return <PictureGallery pictures={animePicture ?? []} />;

    default:
      return <h1>No Content Available</h1>;
  }
};

export default TabbarContent;
