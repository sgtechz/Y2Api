import React,{useState,useEffect} from 'react'
import Index from './Index'
import Video from '../components/Video'
import PlayList from '../components/PlayList'
import GetVideos from '../hooks/GetVideos';
import GetRate from "../hooks/GetRate";
import KEY from '../ApiKey'
import Axios from 'axios'
import { Card,Accordion,Button } from 'react-bootstrap';
import Youtube from 'react-youtube'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faSearch, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import SetRating from "../hooks/SetRating";
import Modal from "../components/Modal";
//import {faSearch} from '@fortawesome/free-solid-svg-icons'

const IndexContainer = () => {
    
    const [busqueda,setBusqueda] = useState([]);
    const [tokenPage,setTokenPage] = useState('');
    const [textModal,setTextModal] = useState('');
    const [idVideo,setIdVideo] = useState('zAOOR-2RYMY')
    //const [data,setData] = useState([]);
    const datos = GetVideos(busqueda,tokenPage) 
    const {dataRate} = GetRate(idVideo); 
    const [show, setShow] = useState(false);
    const [html,setHtml]= useState([]);
    const CloseModal = () =>{
        setShow(false)
    }
    let cad='';
    let [list,setLis]=useState([])
    const [listItems,setListItems]=useState([])
    const [video,setVideo] = useState('zAOOR-2RYMY')
    const opts = {
        height: '315',
        width: '420',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        }
      };
    const SearchTxt = (e) =>{
        cad=e.target.value
    }
    const SearchBtn=()=>{
        setBusqueda(cad);        
    }
    const clic = () =>{
            
            //console.log(accessToken);
               
    }
    const clickControlPages = (e) =>{
        setTokenPage(e.target.id)
        //console.log(listItems);    
    }
    const deleteList = (e) =>{

        if(list.length<2){
            list.pop()
            setListItems([])
        }else{
            list.splice(e.target.id, 1)
            let json={
                "id":'id',
                "video":'video',
                }
                let arr=list.concat(json)
                arr.pop()
                setListItems(arr)
        }
        
    }
    const click = (e) =>{
        setVideo(e.target.dataset.id);
        setIdVideo(e.target.dataset.id);
        //setRate(rate)        
    }
    const clickList = (e) =>{
        setVideo(e.target.dataset.id);
        setIdVideo(e.target.dataset.id);

    }
    const allowDrop = (e) => {
        e.preventDefault();
    }
    const drag = (e) => {
        //e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setData("title", e.currentTarget.dataset.info);
         
    }
    const drop = (e) => {
        e.preventDefault();
        //var item = e.dataTransfer.getData("text");
        //document.getElementById('div1').append(document.getElementById(item));
        //e.target.append(document.getElementById(data));
        //console.log(e.currentTarget.dataset.info)
        let json={
            id:e.dataTransfer.getData('text'),
            title:e.dataTransfer.getData('title'),
        }
        let cad=listItems.concat(json);
        list.push(json);
        setListItems(cad);
        //console.log(listItems);
        
        //console.log(e.dataTransfer.getData('text'));
        //console.log(e.dataTransfer.getData('title'));
        
    } 
    const endVideo=()=>{
        if(list.length!=0){
            setVideo(list[0].id)
            setIdVideo(list[0].id)

            list.splice(0, 1)
            let json={
                "id":'id',
                "video":'video',
                }
            let arr=list.concat(json)
            arr.pop()
            setListItems(arr)
        }else{
            list.pop()
            setListItems([])
            alert('se acabo');
        }
    }
    const pressEnter = (e)=>{
        if (e.key=='Enter') {
            setBusqueda(cad);
        }
    }
    const setRate = (e) =>{
        console.log(e.target.id);
        let cali=e.target.id;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.googleapis.com/youtube/v3/videos/rate",
            "method": "POST",
            'params':{
                "id":idVideo,
                "key":KEY,
                "rating":e.target.id
            },
            "headers": {
              "authorization": "Bearer "+localStorage.getItem('accessToken') ,
              "accept": "application/json",
              "cache-control": "no-cache",
              "postman-token": "ecf0de08-9688-80d8-76be-fa5c57c50815"
            }
          }
          
          
              Axios(settings)
              .then(res=>{
                  console.log(res);
                  setTextModal('Diste '+cali)
                  setShow(true)

              }).catch(error=> {
                  console.log(error)
                  setTextModal('Iniciar sesion de nuevo')
                  setShow(true)
                }
              )
              
        
    }
    return(
        <div className="row">
            <div className="col-8 m-3">
                <div className="row">
                        <div className="input-group mb-2 mr-sm-2">
                            <input type="text" onKeyPress={pressEnter} className="form-control" onChange={SearchTxt} placeholder="Buscar"/>
                            <div className="input-group-prepend">
                                <button className="btn btn-secondary" onClick={SearchBtn}><FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                        </div>
                </div>

                <Index
                    datos={datos.data.data}
                    click={click}
                    drag={drag}
                />
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={clickControlPages} id={datos.data.previous} className="btn btn-info"><FontAwesomeIcon icon={faCaretLeft}/></button>
                    <button type="button" onClick={clickControlPages} id={datos.data.next} className="btn btn-info"> <FontAwesomeIcon icon={faCaretRight}/></button>
                </div>
            </div>
            <Modal
               show={show}
               hide={CloseModal}
               res={html}
               text={textModal}
            />
            <div className="col-4 fixed-top" style={{left:'62%',margin:'4rem'}}>
                    {/*<Video video={video}endVideo={endVideo}/>*/}
                    <Youtube
                        videoId={video}
                        opts={opts}
                        onEnd={endVideo}
                    />
                <div className="row card" >
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={endVideo} className="btn btn-success">Play</button>
                        <button type="button" onClick={console.log('list')} className="btn btn-dark">Lista</button>
                        <button type="button" onClick={setRate} id="like" className="btn btn-info btn-sm"><FontAwesomeIcon icon={faThumbsUp} /><span className="badge badge-pill badge-info">{dataRate.likeCount}</span></button>
                        <button type="button" onClick={setRate} id="dislike" className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faThumbsDown} /><span className="badge badge-pill badge-danger">{dataRate.dislikeCount}</span></button>
                    </div>
                    
                    <div className='col-12'onDrop={drop} onDragOver={allowDrop}>
                        <label className='text-center'>Drag Video Here</label>
                        <div className='' style={{overflow:'scroll',overflowX:'hidden',width:'auto',height:'250px'}}>
                                <PlayList
                                        list={listItems}
                                        click={clickList}
                                        del = {deleteList}
                                />
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexContainer
