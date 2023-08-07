import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTranscoder from "./DataTranscoderr";

const DataTranscoderr = () => {
    const [data, setData] = useState({});
    const navigate=useNavigate();
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        }
        fetch("http://localhost:8000/api/admin/statistics", requestOptions)
            .then((response) => {
                if (!response.ok) {

                    console.log("error")
                }
                return response.json();
            })
            .then(async value => {
                await setData(value);
                console.log(data)
                const positiveArray = Object.entries(data.positive).map(([source, value]) => ({ source, value }));
                const negativeArray = Object.entries(data.negative).map(([source, value]) => ({ source, value }));
                const neutralArray = Object.entries(data.neutral).map(([source, value]) => ({ source, value }));

                console.log("Positive Array:", positiveArray);
                console.log("Negative Array:", negativeArray);
                console.log("Neutral Array:", neutralArray);
                function chunkArray(array, chunkSize) {
                    const chunkedArray = [];
                    for (let i = 0; i < array.length; i += chunkSize) {
                        chunkedArray.push(array.slice(i, i + chunkSize));
                    }
                    return chunkedArray;
                }
                
                
                
                const chunkSize = 6;
                const chunkedPositiveSources = chunkArray(positiveArray, chunkSize);
                
                console.log("Number of Chunks:", chunkedPositiveSources.length);
                
                // Displaying each chunk in a table
                chunkedPositiveSources.forEach((chunk, index) => {
                    console.log(`Table for Chunk ${index + 1}:`);
                    console.table(chunk);
                });
                console.log(chunkedPositiveSources[0])
                // console.log("helloiii")
                // console.log(DataTranscoder.getPositiveSentiments())
                
            })
            .catch(error => {
                console.log(error.message)
            })
    }, []);

    return(
        <>
           hello
           <button onClick={()=>navigate("/charts")}>charts</button>
        </>
    )

}

export default DataTranscoderr;