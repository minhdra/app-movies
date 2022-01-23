import { useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';
import Watch from '../components/movie/Watch';
import Error from '../components/shared/Error';
import { getTvDetail } from '../services/tv';

function TvDetail() {
  const { id } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);

  const episodeIndex = queryParams.get('episode');

  const { data, error } = useSWR(`tv-${id}-${episodeIndex}`, () =>
    getTvDetail(id, episodeIndex)
  );

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
