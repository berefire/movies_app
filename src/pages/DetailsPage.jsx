import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import Divider from '../components/Divider';
import moment from 'moment';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector( state => state.movieData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const duration = (data?.runtime/60)?.toFixed(1)?.split(".");
  const writers = castData?.crew?.filter(el => el?.job === "Screenplay" || el?.job === "Writer").map(el => el?.name).join(", ");
  const director = castData?.crew?.filter(el => el?.job === "Director").map(el => el?.name)[0];
  const producers = castData?.crew?.filter(el => el?.job === "Executive Producer").map(el => el?.name).join(", ");
  let flag_movie = false;

  if (params?.explore === "movie") 
    flag_movie = true;

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  } 

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img 
              src={imageURL+data?.backdrop_path}
              className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit'>
          <div className='w-60 h-90'>
            <img 
                src={imageURL+data?.poster_path}
                className='object-contain h-full w-full rounded'
            />
          </div>
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-red-600 text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-700 to-red-500 hover:scale-105 transition-all'>
            Play Now
          </button>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'> {data?.tagline} </p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>
              Rating : {Number (data?.vote_average).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              View : {Number(data?.vote_count)}
            </p>
            { flag_movie && <span>|</span>}
            {flag_movie && (<p> Duration : {duration[0]}h {duration[1]}m</p>) }
          </div>

          <Divider /> 

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p> 
                Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              {flag_movie &&  <span>|</span> }
              {flag_movie && (<p>
              Revenue : {Number(data?.revenue)}
              </p>) }
            </div>

            <Divider />
          </div>

          { flag_movie ? (
            <div>
              <p>
              <span className='text-white'> Director</span> : {director} 
              </p>

              <Divider />

              <p>
                <span className='text-white'> Writers : {writers} </span>
              </p>
          </div>  ) : (
            <div>
              <p><span className='text-white'> Executive Producers : {producers} </span></p>
            </div>
          )
          }

          <Divider />

          <h2 className='font-bold text-lg'>Cast: </h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((starCast,index) => {
                return (
                  <div key={index}>
                    <div>
                      <img 
                        src={imageURL+starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                )
              })
            }

          </div> 
        </div>
      </div>

      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
        <HorizontalScrollCard data={recommendationData} heading={"Recommendation "+params?.explore} media_type={params?.explore} />
      </div>

      {
        playVideo && (
          <VideoPlay data={playVideoId} close={()=> setPlayVideo(false)} media_type={params?.explore}/>
        )
      }
    </div>
  )
}

export default DetailsPage