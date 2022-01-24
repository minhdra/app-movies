import { useLocation, useParams } from 'react-router-dom';
import Watch from '../components/movie/Watch';
import Error from '../components/shared/Error';
import { getTvDetail } from '../services/tv';
import { useEffect, useState } from 'react';

function TvDetail() {
  const { id } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);

  const [data, setData] = useState();
  const [error, setError] = useState();

  const episodeIndex = queryParams.get('episode');

  useEffect(() => {
    setData(null);
    getTvDetail(id, episodeIndex - 1).then(res => setData(res)).catch(error => setError(error));
  }, [id, episodeIndex]);

  if (error) return <Error/>;

  return (
    <Watch
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
      episodeIndex={+episodeIndex}
    />
  );
}

export default TvDetail;
