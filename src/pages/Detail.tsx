import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimeDetail, fetchAnimeCharacter, fetchAnimeRecommendations, fetchStaffAnime, fetchAnimePicture } from '../redux/detailAnimeSlice';
import { RootState, AppDispatch } from '../redux/store';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    animeDetail,
    loading,
    animeCharacter,
    Recommendations,
    staffAnime,
    animePicture,
  } = useSelector((state: RootState) => state.detailAnime);

  const category = location.pathname.split('/')[3] || 'overview';

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(id));
      dispatch(fetchAnimeCharacter(id));
      dispatch(fetchAnimeRecommendations(id));
      dispatch(fetchStaffAnime(id));
      dispatch(fetchAnimePicture(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-40 w-40 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-2xl text-black">Loading</p>
      </div>
    );
  }

  if (!animeDetail) {
    return <p className="text-2xl text-white">Anime details not found</p>;
  }

  return (
    <div className="bg-bg-color min-h-screen w-full h-full">
      <Navbar />
      <div className="banner w-full h-96 relative">
        <img
          className="w-full h-full object-cover"
          src={animeDetail.trailer.images.maximum_image_url}
          alt={animeDetail.title}
        />
      </div>
      <div className="relative bg-slate-800 w-full flex p-4">
        <img
          className="rounded-xl w-60 h-96 object-cover absolute -top-28 left-7"
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
        />
        <div className="ml-72 mt-4 flex flex-col w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-600">
              {animeDetail.title}
            </h1>
            <p className="text-2xl font-bold text-gray-600">
              {animeDetail.title_japanese}
            </p>
            <p className="mt-4 font-dm-mono text-white">
              {animeDetail.synopsis}
            </p>
          </div>
          <div className="mt-4 flex justify-center items-center w-full">
            <div className="flex justify-between items-center w-2/4 h-12 gap-4 p-8 text-gray-600">
              <Link to={`/detail/${id}`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === 'overview' ? 'text-blue-700' : ''
                  }`}
                >
                  Overview
                </p>
              </Link>
              <Link to={`/detail/${id}/characters`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === 'characters' ? 'text-blue-700' : ''
                  }`}
                >
                  Characters
                </p>
              </Link>
              <Link to={`/detail/${id}/staff`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === 'staff' ? 'text-blue-700' : ''
                  }`}
                >
                  Staff
                </p>
              </Link>
              <Link to={`/detail/${id}/pictures`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === 'pictures' ? 'text-blue-700' : ''
                  }`}
                >
                  Pictures
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row">
        <Sidebar
          animeDetail={animeDetail}
          className="lg:w-1/3 w-full order-1 mt-10"
        />
        <Content
          pictures={animePicture}
          animeCharacter={animeCharacter}
          animeStaff={staffAnime}
          detailAnime={animeDetail}
          animeRecomendation={Recommendations}
          category={category}
          className="lg:w-2/3 w-full order-2"
        />
      </div>
    </div>
  );
};

export default Detail;
