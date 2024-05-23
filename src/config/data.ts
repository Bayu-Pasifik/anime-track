export interface Anime {
    mal_id: number;
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
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
  
  export interface AnimeDetail extends Anime {
    synopsis: string;
    // Tambahkan properti lain yang Anda butuhkan dari API
  }
  