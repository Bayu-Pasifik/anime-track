
// Define the type for the image URL object
interface ImageURL {
    image_url: string;
  }
  
  // Define the type for the images object which contains jpg image
  interface Images {
    jpg: ImageURL;
  }
  
  // Define the type for the person object
  interface Person {
    mal_id: number;
    url: string;
    images: Images;
    name: string;
  }
  
  
  // Define the type for the data array
  interface StaffData {
    person: Person;
    positions: string[];
    
  }
  
  export type { ImageURL, Images, Person, StaffData };