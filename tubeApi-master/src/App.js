import React,{useEffect,useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NotFound from './pages/NotFound'
import {Navbar,Nav} from 'react-bootstrap'
import IndexContainer from './pages/IndexContainer'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import DnD from './pages/DnD';
import Icon from './img/icon.png'

const App = () => {
  const [accessToken,setAccessToken]=useState([])

  const clic = () =>{
    //console.log(window.location.hash);
    
    console.log(accessToken);    
  }
  useEffect(()=>{
    if(window.location.hash.substr(0,7)=='#access'){
      let tmpAT=window.location.hash;
      let res=tmpAT.slice(1).replace(new RegExp('=', 'g'),'":"')
      .replace(new RegExp('&','g'),'","')//.split(',');
      let json='{"'+res+'"}';
      //setAccessToken(json)
      let tmp=JSON.parse(json)
      console.log(tmp);
      
      localStorage.setItem('accessToken', tmp.access_token);
      window.location.hash='login'
    }
  })
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/index">
          <img
            src={Icon}
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <strong>
            YouApi
          </strong>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/tipos">Tipos</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link target='_self' href='https://accounts.google.com/o/oauth2/v2/auth?scope=https:%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&redirect_uri=http:%2F%2Flocalhost:3000/index&response_type=token&client_id=472290734301-7d2bkdn5n2vog4i2clho72v42la5a42l.apps.googleusercontent.com'>Iniciar Sesion</Nav.Link>          
        </Nav>
      </Navbar>
      <div className="container-fluid"> 
        <BrowserRouter>
              <Switch>
                  
                  <Route exact path="/index" component={IndexContainer}/>
                  <Route exact path="/DnD" component={DnD}/>
                  <Route  component={NotFound}/>
                  
              </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
