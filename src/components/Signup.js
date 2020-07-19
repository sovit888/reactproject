import React, { useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup=()=>{
    const history=useHistory();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const postData=()=>{
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
         body:JSON.stringify({name,email,password})
        })
        .then((res)=>{return res.json()})
        .then(data=>{
            if(data.error){M.toast({html: data.error,classes:"#ff1744 red accent-3"})}
            else{
                M.toast({html:data.message,classes:"#66bb6a green lighten-1"});
                history.push('/login');
            }
        })
}
        return (
            <>
       <div className="mycard">
            <div className="card auth-card">
                <h2>Signup</h2>
                <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>Sign Up
  </button>
  <h5><Link to="/login">Already have a account</Link></h5>
            </div>
            </div>
            </>
        );
        }

export default Signup;