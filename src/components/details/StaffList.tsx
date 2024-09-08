import React from "react";
import ListTile from "../ListTile";
import CharacterName from "./CharacterName";
import ImageClick from "./ImageClick";
import { StaffData } from "../../config/staff";

interface StaffListProps {
  staff: StaffData[];
  limit?: number; // Tambahkan prop opsional limit
}

const StaffList: React.FC<StaffListProps> = ({ staff, limit }) => {
  const displayedStaff = limit ? staff.slice(0, limit) : staff; // Batasi jika limit ada
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {displayedStaff.map((staffMember) => (
        <ListTile
          key={staffMember.person.mal_id}
          leading={
            <ImageClick
              source={staffMember.person.images.jpg.image_url}
              aliases={staffMember.person.name}
              id={staffMember.person.mal_id.toString()}
              type="animeStaff"
            />
          }
          title={
            <div className="flex flex-col">
              <CharacterName name={staffMember.person.name} to={`/anime/${staffMember.person.mal_id}/staff`} />
              <p className="text-sm text-white">{staffMember.positions}</p>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default StaffList;
