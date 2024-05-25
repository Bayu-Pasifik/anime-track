import { CharacterDetail } from "../config/characters";
import { AnimeDetail } from "../config/data";
import { StaffData } from "../config/staff";
import ColList from "./ColList";
import Trailer from "./Trailer";
import Sidebar from "./Sidebar";

interface ContentProps {
  animeCharacter: CharacterDetail[];
  animeStaff: StaffData[];
  detailAnime: AnimeDetail;
}

const Content: React.FC<ContentProps> = ({ animeCharacter, animeStaff, detailAnime }) => {
  return (
    <div className="p-4 w-full mt-4 flex flex-row">
      {/* <Sidebar animeDetail={detailAnime} /> */}
      <div className="content flex flex-col flex-grow">
        <div className="flex flex-row mb-4 font-roboto font-bold">
          <h1 className="text-2xl">Featuring Characters</h1>
          <h1 className="text-2xl ml-auto">See All</h1>
        </div>
        <ColList type="character" listData={animeCharacter} />
        <br /> <br />
        <ColList type="staff" listData={animeStaff} />
        <br /> <br />
        <Trailer data={detailAnime} />
      </div>
    </div>
  );
};

export default Content;
