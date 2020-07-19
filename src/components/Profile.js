import React, { useEffect,useState,useContext} from 'react';
import {userContext} from '../App';

const Profile=()=>{
    const [pic,setPic]=useState([]);
    const {state,dispatch}=useContext(userContext);
    useEffect(()=>{
fetch('/post/me',{
    headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
    }
})
.then((res)=>{return res.json();})
.then(data=>{
    setPic(data.result)
})
    },[]);
        return (
            <>
<div style={{
    display:"flex",
    justifyContent:"space-around",
    margin:"18px 0px",
    borderBottom:"1px solid grey"
}}>
    <div>
        <img style={{width:"160px",height:"16opx",borderRadius:"80px"}} 
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
    </div>
<div>
<h4> {state?state.name:"loading"}</h4>
<h5> {state?state.email:"loading"}</h5>
<div style={{  display:"flex",justifyContent:"space-around",width:"108%"}}>
    <h6>{pic.length} posts</h6>
    <h6>{state?state.followers.length:0} followers</h6>
    <h6>{state?state.following.length:0} followings</h6>
</div>
</div>
</div>
<div className="gallery">
{
    pic.map((item,index)=>{
        return (<img className="item" src={item.pic} key={index}/>) 
    })
}
    </div>
            </>
        );
    }

export default Profile;