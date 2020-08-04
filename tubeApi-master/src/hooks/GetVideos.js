import {useState,useEffect} from 'react'
import Axios from 'axios'
import KEY from '../ApiKey'

const GetVideos = (busqueda,tokenPage) =>{
    const [data,setData] = useState({data:[],next:'',previous:''});


    useEffect(()=>{
        
        //console.log('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLLM9RT3UFvRmYY0IXoVp9qX9xuDMvi3D2&key='+KEY)
        
        Axios.get('https://www.googleapis.com/youtube/v3/search',{
                responseType: 'json',
                params:{
                    q:busqueda,
                    part:'snippet',
                    maxResults:10,
                    key:KEY,
                    pageToken:tokenPage,
                    statistics:[]
                }
            }).then(res=>{
                console.log(res);
                //setData(res.data.items)
                setData({data:res.data.items,next:res.data.nextPageToken,previous:res.data.prevPageToken})
                //setNext(res.data.nextPageToken)
                //setPrevious(res.data.prevPageToken)
            })
        },[busqueda, tokenPage])
        return {data}
    
}
export default GetVideos