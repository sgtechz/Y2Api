import {useState,useEffect} from 'react'
import Axios from 'axios'
import KEY from '../ApiKey'

const SetRating = (id,rate) =>{


    useEffect(()=>{
        
        //console.log('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLLM9RT3UFvRmYY0IXoVp9qX9xuDMvi3D2&key='+KEY)
        Axios.post('https://www.googleapis.com/youtube/v3/videos/rate',{
                responseType: 'json',
                params:{
                    id:id,
                    ratingL:rate,
                    key:KEY,
                }
            }).then(res=>{
                console.log(res);
            })
        },[id,rate])
    
}
export default SetRating