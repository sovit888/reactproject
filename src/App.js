import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {Switch,Route, BrowserRouter,useHistory} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from "./components/Home";
import Create from "./components/Create";
import Userprofile from "./components/Userprofile";
import Nav from './Nav';
import {initialState,reducer} from './reducer/userReducer';
import './App.css';

export const userContext=createContext();

const Routing=()=>{
  return (
<Switch>
<Route exact path="/"> <Home /></Route>
<Route path="/signup"> <Signup /></Route>
<Route path="/login"> <Login /></Route>
<Route exact path="/profile"> <Profile/></Route>
<Route path="/profile/:id"> <Userprofile/></Route>
<Route path="/create"> <Create/></Route>
	</Switch>
  )
}
const App=()=>
  {
    const [state,dispatch]=useReducer(reducer,initialState);
    const history=useHistory(); 
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch({type:"USER",payload:user})
      //history.push('/')
    }
    else{history.push('/login')}
  },[]);
  return (
    <>
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Nav />
    <Routing />
  </BrowserRouter>
  </userContext.Provider>
 </>
  );
}

export default App;
