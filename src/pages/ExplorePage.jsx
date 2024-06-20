import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const ExplorePage = () => {
  const params = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  console.log("params", params.explore)

  const fetchData = async() => {
    try {
      const response = await axios.get(`discover/${params.explore}`, {
        params: {
          page : pageNum
        }
      });
      setData((previous) => {
        return [
          ...previous,
          ...response.data.results
        ]
      });
      setTotalPages(response.data.results.total_pages)
      console.log("response", response.data.results)
    } catch (error) {
        console.log('error ', error)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNum(previous => previous + 1)
    }
  }

  useEffect(()=> {
    fetchData()
  }, [pageNum]);

  useEffect(() => {
    setPageNum(1)
    setData([])
    fetchData()
  }, [params.explore]);

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'> Popular {params.explore} show</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
        {
          data.map((exploreData, index) => {
            return (
              <Card data={exploreData} key={exploreData.id+"exploreSection"+index} media_type={params.explore}/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage