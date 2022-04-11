import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const useRequest = (url) => {
const [data, setData] = useState({});
const [loading, setLoading] = useState(true);
const [errorMsg, setErrorMsg] = useState('');

useEffect(() => {

    axios
    .get(url)
    .then((result)=>{
        setLoading(false);
        setData(result.data);
    }).catch((err)=>{
        toast.error("Error loading data, check spellings");
    })
},[url]);
return {loading, data}
};
export default useRequest