import { CharacterDetail } from "../config/characters";
import { StaffData } from "../config/staff";
import ColList from "./ColList";
interface ContentProps {
  animeCharacter: CharacterDetail[];
  animeStaff: StaffData[];
}
const Content: React.FC<ContentProps> = ({ animeCharacter,animeStaff }) => {
  return (
    <div className="bg-slate-300 p-4  w-full mt-4 flex flex-col">
      <div className="flex flex-row mb-4 font-roboto font-bold">
        <h1 className="text-2xl">Featuring Characters</h1>
        <h1 className="text-2xl ml-auto">See All</h1>
      </div>
      <ColList type="character" listData={animeCharacter} />
      <br /> <br />
      <ColList  type= "staff" listData={animeStaff} />
    </div>
  );
};

export default Content;
