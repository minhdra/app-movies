import { useEffect, useState } from "react";
import TvSeries from "../components/moviesSearch/TvSeries";
import Error from "../components/shared/Error";
import { searchConfig } from "../services/searchAdvanced";


export default function SeriesSearch() {
  const [dataConfig, setDataConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    searchConfig().then(res => setDataConfig(res.filter(x => x.name === 'TV Series'))).catch(error => setError(error));
  }, []);

  if(error) return <Error/>
  
  return (
    <TvSeries
      searchConfig={dataConfig}  
    />
  )
}