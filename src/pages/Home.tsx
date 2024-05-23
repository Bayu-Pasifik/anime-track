import React, { useEffect, useState } from 'react';
import { Anime } from '../config/data';
import axios from '../config/axiosConfig';
import HeaderCarousel from '../components/Carousel';
import Card from '../components/card';

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
    <div className=" p-4 bg-slate-800 h-full w-full">
      <HeaderCarousel animes={topAiring} />
      <Card animes={currentlyAiring}></Card>
    </div>
  );
};

export default Home;
