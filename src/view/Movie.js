import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Watch from '../components/movie/Watch';
import { getMovieDetail } from '../services/movie';
import Error from '../components/shared/Error';
import { useEffect, useState } from 'react';

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState();

  // const { data, error } = useSWR(`movie-${id}`, () => getMovieDetail(id));

  useEffect(() => {
    setData(null);
    getMovieDetail(id).then(res => setData(res));
  }, [id]);
  

  // if (error) return <Error/> ;

  return (
    <Watch
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
    />
  );
}

export default MovieDetail;
