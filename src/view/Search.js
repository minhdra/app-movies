import { useEffect, useState } from 'react';
import Result from '../components/search/SearchResult';
import { searchWithKeyword } from '../services/search';
import { getQueryParams } from '../utils/utils';
import Error from '../components/shared/Error';

function Search() {
  const keyword = getQueryParams().get('keyword');
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    searchWithKeyword(keyword).then(res => setData(res)).catch(error => setError(error));
  }, [keyword]);

  if (error) return <Error/>

  return <Result data={data} />;
}

export default Search;
