import React from "react";
import ListTile from "../ListTile";
import CharacterName from "./CharacterName";
import ImageClick from "./ImageClick";
import { CharacterDetail } from "../../config/characters";

interface CharacterListProps {
  characters: CharacterDetail[];
  limit?: number; // Tambahkan prop opsional limit
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, limit }) => {
  const displayedCharacters = limit ? characters.slice(0, limit) : characters; // Batasi jika limit ada
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      {displayedCharacters.map((character) => {
        const japaneseVA = character.voice_actors?.find((va) => va.language === "Japanese");
        return (
          <ListTile
            key={character.character.mal_id}
            leading={
              <ImageClick
                source={character.character.images.jpg.image_url}
                aliases={character.character.name}
                id={character.character.mal_id.toString()}
                type="animeCharacter"
              />
            }
            title={
              <div className="flex flex-col">
                <CharacterName name={character.character.name} to={`/anime/${character.character.mal_id}/characters`} />
                <p className="text-sm text-white">{character.role}</p>
              </div>
            }
            trailing={
              <div className="flex flex-row items-center">
                <div className="flex flex-col text-right mr-4">
                  <CharacterName name={japaneseVA?.person.name} to={`/anime/${japaneseVA?.person.mal_id}/voice-actors`} />
                  <p className="text-sm text-white">{japaneseVA?.language}</p>
                </div>
                <ImageClick
                  id={japaneseVA?.person.mal_id.toString()}
                  source={japaneseVA?.person.images.jpg.image_url}
                  aliases={japaneseVA?.person.name}
                  type="voiceActors"
                />
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export default CharacterList;
