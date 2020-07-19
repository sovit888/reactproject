import React, { useContext } from 'react';
import {NavLink,Link,useHistory} from 'react-router-dom';
import {userContext} from './App';
const Nav=()=>{
  const {state,dispatch}=useContext(userContext);
  const history=useHistory();
  const renderList=()=>{
    if(state){
      return [<li key="profile"><NavLink to="/profile" className="menu">Profile</NavLink></li>,
      <li key="create"><NavLink to="/create" className="menu">Create</NavLink></li>,
       <li key="logout"><button className="btn waves-effect waves-lightgreen darken-2 black-text" onClick={()=>{
        localStorage.clear();
        dispatch({type:"clear"});
        history.push('/login');
       }}>Logout</button></li>
    ]
    }
    else{
      return [<li key="signin"><NavLink to="/login" className="menu">Login</NavLink></li>,
      <li key="signup"><NavLink to="/signup" className="menu">Signup </NavLink></li>
      ] 
    }
  }
        return (
          <>
          <nav className="white black-text">
    <div className="nav-wrapper">
      <Link exact to={state?"/":"/login"} className="brand-logo black-text left">{state?state.name:"Instagram"}</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
          </>
        );
    }
export default Nav;