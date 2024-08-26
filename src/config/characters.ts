export interface CharacterDetail {
    character: Character;
    role: string;
    favorites: number;
    voice_actors: VoiceActor[];
  }
  
  interface Character {
    mal_id: number;
    url: string;
    images: CharacterImages;
    name: string;
  }
  
  interface CharacterImages {
    jpg: ImageUrl;
    webp: ImageUrl;
  }
  
  interface ImageUrl {
    image_url: string;
    small_image_url?: string; 
  }
  
  interface VoiceActor {
    person: Person;
    language: string;
  }
  
  interface Person {
    mal_id: number;
    url: string;
    images: PersonImages;
    name: string;
  }
  
  interface PersonImages {
    jpg: ImageUrl;
  }


  export interface AnimeCharacter {
    mal_id:     number;
    url:        string;
    images:     AnimeCharacterImages;
    name:       string;
    name_kanji: string;
    nicknames:  any[];
    favorites:  number;
    about:      string;
    anime:      anime[];
    manga:      any[];
    voices:     Voice[];
}

export interface AnimeCharacterImages {
    jpg: Jpg;
    webp: Webp;
}

export interface Voice {
    person:   Person;
    language: string;
}

export interface anime{
  role: string;
  anime: {
    mal_id: number;
    url: string;
    images: {
      jpg: Jpg;
      webp: Webp;
    };
    title: string;
  };
}
export interface Jpg {
    image_url: string;
}

export interface Webp{
    image_url: string;
    small_image_url: string;
}
