import axios from "../config/axiosConfig";

// Fungsi untuk fetch data dengan paginasi
const  fetchOtherData = async ({ pageParam = 1 }) => {
    const response = await axios.get(`producers?page=${pageParam}`);
    return response.data;
  };

  export default fetchOtherData