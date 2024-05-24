interface CharacterDetail {
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