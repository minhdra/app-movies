import { useState } from "react";

function LoadImage({ className, onLoad, ...props }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img 
            className={`${loaded ? 'opacity-100' : 'opacity-0'} transition ${className}`}
            alt=""
            onLoad={(e) => {
                setLoaded(true);
                // if(onload) onLoad(e);
            }}
            {...props}
        />
    )
}

export default LoadImage;

