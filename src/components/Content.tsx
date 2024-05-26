import { CharacterDetail } from "../config/characters";
import { AnimeDetail } from "../config/data";
import { StaffData } from "../config/staff";
import { Recommendation } from "../config/animeRecomendation";
import ColList from "./ColList";
import Trailer from "./Trailer";
import AnimeRecomendation from "./AnimeRecomendation";
import Sidebar from "./Sidebar";

interface ContentProps {
    animeCharacter: CharacterDetail[];
    animeStaff: StaffData[];
    detailAnime: AnimeDetail;
    animeRecomendation: Recommendation[];
}

const Content: React.FC<ContentProps> = ({ animeCharacter, animeStaff, detailAnime, animeRecomendation }) => {
    return (
        <div className="p-4 w-full mt-4 flex flex-col lg:flex-row">
            <Sidebar animeDetail={detailAnime} className="lg:w-1/4 w-full order-1" />
            <div className="content flex flex-col flex-grow order-2 lg:order-1">
                <div className="flex flex-row mb-4 font-roboto font-bold">
                    <h1 className="text-2xl">Featuring Characters</h1>
                    <h1 className="text-2xl ml-auto cursor-pointer">See All</h1>
                </div>
                {animeCharacter?.length > 0 ? (
                    <ColList type="character" listData={animeCharacter} />
                ) : (
                    <p className="text-md font-medium text-gray-500">Undefined</p>
                )}
                <br /><br />
                {animeStaff?.length > 0 ? (
                    <ColList type="staff" listData={animeStaff} />
                ) : (
                    <p className="text-md font-medium text-gray-500">Undefined</p>
                )}
                <br /><br />
                <Trailer data={detailAnime} />
                <br /><br />
                {animeRecomendation?.length > 0 ? (
                    <AnimeRecomendation animeRecomendation={animeRecomendation} />
                ) : (
                    <p className="text-md font-medium text-gray-500">Undefined</p>
                )}
            </div>
        </div>
    );
};

export default Content;
