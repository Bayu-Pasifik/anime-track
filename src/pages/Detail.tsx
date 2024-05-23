import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeDetail } from '../config/data';
import axios from '../config/axiosConfig';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`/anime/${id}`);
        setAnimeDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching anime details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='h-40 w-40 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
        <p className='text-2xl text-black'>Loading</p>
      </div>
    );
  }

  if (!animeDetail) {
    return <p className='text-2xl text-white'>Anime details not found</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-slate-800 w-full h-full">
      <div className="flex flex-col items-center">
        <img src={animeDetail.images.jpg.image_url} alt={animeDetail.title} className="w-full h-96 object-cover mb-4" />
        <h1 className="text-4xl font-bold mb-2">{animeDetail.title}</h1>
        <p className="text-lg">{animeDetail.synopsis}</p>
        {/* Tambahkan informasi lain yang Anda inginkan di sini */}
      </div>
    </div>
  );
};

export default Detail;
