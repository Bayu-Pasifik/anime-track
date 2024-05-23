import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeDetail } from '../config/data';
import axios from '../config/axiosConfig';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`/anime/${id}`);
        setAnimeDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching anime details', error);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (!animeDetail) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
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
