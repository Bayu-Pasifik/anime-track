export interface Studios {
    mal_id:      number;
    url:         string;
    titles:      Title[];
    images:      Images;
    favorites:   number;
    established: Date;
    about:       string;
    count:       number;
}

export interface DetailStudios extends Studios {
    external: External[];

}

export interface External {
    name: string;
    url:  string;
}

export interface Images {
    jpg: Jpg;
}

export interface Jpg {
    image_url: string;
}

export interface Title {
    type:  string;
    title: string;
}
export interface People {
    mal_id:          number;
    url:             string;
    website_url:     null;
    images:          Images;
    name:            string;
    given_name:      string;
    family_name:     string;
    alternate_names: string[];
    birthday:        Date;
    favorites:       number;
    about:           string;
}

export interface Magazine {
    mal_id: number;
    name:   string;
    url:    string;
    count:  number;
}
