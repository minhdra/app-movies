import { useEffect, useState } from "react";
import Anime from "../components/moviesSearch/Anime";
import Error from "../components/shared/Error";
import { searchConfig } from "../services/searchAdvanced";


export default function AnimeSearch() {
  const [dataConfig, setDataConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    searchConfig().then(res => setDataConfig(res.filter(x => x.name === 'Anime'))).catch(error => setError(error));
  }, []);

  if(error) return <Error/>
  
  return (
    <Anime
      searchConfig={dataConfig}  
    />
  )
}