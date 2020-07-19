import React, { useState ,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../App';
import M from 'materialize-css';

const Login=()=>{
    const {state,dispatch}=useContext(userContext);
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const postData=()=>{
        fetch('/loggedin',{
            method:"post",
            headers:{ 
                "Content-Type":"application/json"
            },
         body:JSON.stringify({email,password})
        })
        .then((res)=>{return res.json()})
        .then(data=>{
            if(data.error){M.toast({html: data.error,classes:"#ff1744 red accent-3"})}
            else{
                console.log(data)
                localStorage.setItem('jwt',data.token);
            localStorage.setItem('user',JSON.stringify(data.user));
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"successfully logged in",classes:"#66bb6a green lighten-1"});
                history.push('/');
            }
        })
}
return (
           <>
           <div className="mycard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>Login
  </button>
  <h5><Link to="/signup">Create a new account</Link></h5>
            </div>
            </div>
           </>
        );
    }

export default Login;