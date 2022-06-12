import { useEffect, useState } from 'react';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import ResultAdvanced from './ResultAdvanced';

export default function Anime({searchConfig}) {
  const [config, setConfig] = useState();

  useEffect(() => {
    const data = searchConfig && searchConfig[0]?.screeningItems?.slice(0, 3);
    setConfig(data);
  }, [searchConfig]);

  return (
    <>
      <Header />
      <ResultAdvanced
        config={config}
        name={searchConfig && searchConfig[0].params}
      />
      <Footer />
    </>
  );
}
