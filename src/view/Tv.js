import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Watch from "../components/movie/Watch";
import { getTvDetail } from "../services/tv";


function TvDetail() {
    const { id } = useParams();
    const queryParams = new URLSearchParams(useLocation().search);

    const episodeIndex = queryParams.get('episode');

    const [data, setData] = useState();
    useEffect(() => {
        getTvDetail(id, episodeIndex - 1).then(res => setData(res));
    }, [id, episodeIndex]);

    return (
        <Watch
            data={data?.data}
            sources={data?.sources}
            subtitles={data?.subtitles}
            episodeIndex={+episodeIndex}
        />
    )
}

export default TvDetail;

