export interface Person {
    mal_id:          number;
    url:             string;
    website_url:     string;
    images:          PersonImages;
    name:            string;
    given_name:      string;
    family_name:     string;
    alternate_names: any[];
    birthday:        Date;
    favorites:       number;
    about:           string;
    anime:           AnimeElement[];
    manga:           any[];
    voices:          Voice[];
}

export interface AnimeElement {
    position: string;
    anime:    AnimeAnime;
}

export interface AnimeAnime {
    mal_id: number;
    url:    string;
    images: { [key: string]: Image };
    title:  string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export interface PersonImages {
    jpg: Jpg;
}

export interface Jpg {
    image_url: string;
}

export interface Voice {
    role:      Role;
    anime:     AnimeAnime;
    character: Character;
}

export interface Character {
    mal_id: number;
    url:    string;
    images: CharacterImages;
    name:   string;
}

export interface CharacterImages {
    jpg:  Jpg;
    webp: Webp;
}

export interface Webp {
    image_url:       string;
    small_image_url: string;
}

export enum Role {
    Main = "Main",
    Supporting = "Supporting",
}
