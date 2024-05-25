// Interface untuk URL gambar
export interface ImageUrl {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
}

// Interface untuk bagian images
export interface Images {
    jpg: ImageUrl;
    webp: ImageUrl;
}

// Interface untuk entry
export interface Entry {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
}

// Interface untuk recommendation
export interface Recommendation {
    entry: Entry;
    url: string;
    votes: number;
}

// Interface untuk array rekomendasi
export interface AnimeRecommendations {
    recommendations: Recommendation[];
}
