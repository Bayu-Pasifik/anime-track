import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../config/data';
import axios from '../config/axiosConfig';
import HeaderCarousel from '../components/Carousel';

const Home: React.FC = () => {
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [currentlyAiring, setcurrentlyAiring] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchtopAiring = async () => {
      try {
        const response = await axios.get('/top/anime');
        setTopAiring(response.data.data);
      } catch (error) {
        console.error('Error fetching top anime', error);
      }
    };

    fetchtopAiring();
  }, []);

  useEffect(()=>{
    try{
        const fetchcurrentlyAiring = async ()=>{
            const response = await axios.get('/seasons/now');
            setcurrentlyAiring(response.data.data);
        }
        fetchcurrentlyAiring()
    } catch (error){
        console.log("Error fetching currently airing anime", error)
    }
  },[])

  return (
    <div className=" p-4 bg-slate-800">
      <HeaderCarousel animes={topAiring} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentlyAiring.map(anime => (
          <Link to={`/detail/${anime.mal_id}`} key={anime.mal_id}>
            <div className="card mt-4 p-2 border rounded shadow">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-48 object-cover mb-2 rounded" />
              <h2 className="text-xl font-bold">{anime.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
