import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data);
        }).catch((err) => {
            setError(err);
        });
    }, [url])

    const reFetch = ()=>{
        axios.get(url).then((response) => {
            setData(response.data);
        }).catch((err) => {
            setError(err);
        });
    }

    return { data, error, reFetch };

}

export default useFetch;