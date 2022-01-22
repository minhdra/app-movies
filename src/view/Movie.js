import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Watch from "../components/movie/Watch";
import { getMovieDetail } from "../services/movie";


function MovieDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        getMovieDetail(id).then(res => setData(res));
    }, [id]);

    return (
        <Watch
            data={data?.data}
            sources={data?.sources}
            subtitles={data?.subtitles}
        />
    )
}

export default MovieDetail;

