import { useEffect, useState } from "react";
import Movies from "../components/moviesSearch/Movies";
import Error from "../components/shared/Error";
import { searchConfig } from "../services/searchAdvanced";


export default function MoviesSearch() {
  const [dataConfig, setDataConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    searchConfig().then(res => setDataConfig(res.filter(x => x.name === 'Movie'))).catch(error => setError(error));
  }, []);

  if(error) return <Error/>
  
  return (
    <Movies
      searchConfig={dataConfig}  
    />
  )
}