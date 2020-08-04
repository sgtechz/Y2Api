import React from 'react'

const PlayList = ({list,click,del}) =>(
    <ul className="list-group" id="div1">
                        
        {
            list.map((item,index)=>(
                
                <li className="list-group-item" >
                    <div className='row'>
                         
                        <div className='col-10'>
                            <h6 data-id={item.id} onClick={click} data-id={item.id}>
                                <img data-id={item.id} src={'https://i.ytimg.com/vi/'+item.id+'/hqdefault.jpg'} width='50' className='rounded img-fluid'/> 
                                <small data-id={item.id}> {item.title} </small>
                            </h6>
                        </div>
                        <div className='col'>
                            <div className="badge badge-danger text-wrap" id={index} onClick={del}>
                                X
                            </div>
                        </div>
                    </div>
                    
                </li>
                ))
            }
    </ul>
       
    

)
export default PlayList