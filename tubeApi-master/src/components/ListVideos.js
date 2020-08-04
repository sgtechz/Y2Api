import React,{Fragment} from 'react'
import {Card,CardColumns} from 'react-bootstrap'
const ListVideos = ({data,click,drag}) => (
    <Fragment>
        <div >

        <CardColumns>
            {data.map((info,index)=>(
                
            <Card key={index} onClick={click} onDragStart={drag} draggable id={info.id.videoId} data-info={info.snippet.title}>
                <Card.Img variant="top" src={info.snippet.thumbnails.high.url} data-id={info.id.videoId} id={info.id.videoId} draggable={false}/>
                <Card.Body data-id={info.id.videoId}>
                <Card.Title data-id={info.id.videoId}>
                    <h6 data-id={info.id.videoId}>
                        {info.snippet.title}
                    </h6>   
                </Card.Title>
                <Card.Text className="text-truncate" data-id={info.id.videoId}>
                   
                        <small className="text-muted" data-id={info.id.videoId}>
                            {info.snippet.description}
                        </small>
                </Card.Text>
                </Card.Body>
            </Card>
            ))}
        </CardColumns>
        </div>

    </Fragment>
)

export default ListVideos