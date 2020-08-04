import {useState,useEffect} from 'react'
import Axios from 'axios'
import KEY from '../ApiKey'

const GetRate = (id) =>{
    const [dataRate,setData] = useState([]);


    useEffect(()=>{
        
        //console.log('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLLM9RT3UFvRmYY0IXoVp9qX9xuDMvi3D2&key='+KEY)
        
        Axios.get('https://www.googleapis.com/youtube/v3/videos?part=%20id%2C%20snippet%2C%20statistics',{
                responseType: 'json',
                params:{
                    id:id,
                    key:KEY,
                }
            }).then(res=>{
                console.log(res);
                //setData(res.data.items.items)
                setData(res.data.items[0].statistics)
                //setNext(res.data.nextPageToken)
                //setPrevious(res.data.prevPageToken)
            })
        },[id])
        return {dataRate}
    
}
export default GetRate