import React, { Fragment } from "react";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
const Video = ({video,endVideo}) =>(
    <Fragment>
        <ResponsiveEmbed aspectRatio="16by9" >
            
            <div style={{ width: '100%', height: 'auto' }}>
                <embed width="420" height="315" onEnded={endVideo} src={`https://www.youtube.com/embed/${video}?autoplay=1`} frameBorder="0" allowFullScreen/>
            </div>
        </ResponsiveEmbed>
    </Fragment>
)

export default Video