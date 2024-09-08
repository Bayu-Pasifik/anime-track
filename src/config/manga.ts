export interface Manga {
    mal_id: number;
    url: string;
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    chapters: number;
    volumes: number;
    status: string;
    members: number;
    published: {
        from: string;
        to: string;
        string: string;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number;
                month: number;
                year: number;
            };
        };
    };
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    synopsis: string;
    background: string;
    member: number;
    favorites: number;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url:string;
      };
    };
    authors: Author[];
    genres: Genre[];
    serializations: Serialization[];
    demographics: Demographics[];
    relations: Relation[];
    external: external[];
  }
  
  export interface Author {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  export interface Demographics {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  export interface Serialization {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
  export interface Relation {
    relation: string;
    entry: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
  }
  export interface external{
    name: string;
    url: string;
  }[];