export interface Anime {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  season: string;
  year: number;
  episodes: number;
  score: number;
  source: string;
  rank: number;
  popularity: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url:string;
    };
  };
}

export interface Studio {
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
export interface Producer {
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


export interface AnimeDetail extends Anime {
  synopsis: string;
  trailer: {
      url: string;
      youtube_id: string;
      embed_url: string;
      images: {
          image_url: string;
          small_image_url: string;
          medium_image_url: string;
          large_image_url: string;
          maximum_image_url: string;
      };
  };
  background: string;
  favorites: number;
  status: string;
  duration: string;
  rating: string;
  scored_by: number;
  aired: {
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
  external: external[];
  studios: Studio[];
  genres: Genre[];
  demographics: Demographics[];
  relations: Relation[];
  producers: Producer[];
}
