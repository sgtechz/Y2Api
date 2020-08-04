import React,{Fragment} from 'react'
import ListVideos from '../components/ListVideos'
const Index = ({datos,click,drag}) =>(
    <Fragment>
        
        <ListVideos
            data={datos}
            click={click}
            drag={drag}
            
        />
    </Fragment>
)

export default Index