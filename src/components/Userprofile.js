import React, { useEffect,useState,useContext} from 'react';
import {useParams} from 'react-router-dom';
import {userContext} from '../App';


const Userprofile = () => {
  const {state,dispatch}=useContext(userContext);
	const [data,setData]=useState([]);
	const [post,setPost]=useState([])
	const {id}=useParams();
useEffect(()=>{
fetch(`/user/profile/${id}`,{
	headers:{
		"Authorization":"Bearer "+localStorage.getItem('jwt')
	}
})
.then(res=>{return res.json()})
.then(result=>{
	setData(result.data)
	setPost(result.post)
})
},[]);

const followUser=(followId)=>{
fetch('/user/follow',{
  method:"put",
  headers:{
    "Authorization":"Bearer "+localStorage.getItem('jwt'),
    "Content-Type":"application/json"
  },
  body:JSON.stringify({followId})
})
.then(res=>{return res.json()})
.then(data=>{
  dispatch({type:"UPDATE",payload:data.result})
  setData(data.data)
})

}
const unfollowUser=(followId)=>{
fetch('/user/unfollow',{
  method:"put",
  headers:{
    "Authorization":"Bearer "+localStorage.getItem('jwt'),
    "Content-Type":"application/json"
  },
  body:JSON.stringify({followId})
})
.then(res=>{return res.json()})
.then(data=>{
  dispatch({type:"UPDATE",payload:data.result})
  setData(data.data)
})

}


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
<h4> {data.name}</h4>
{data.followers?(data.followers.includes(state._id)?<button className="btn btn-waves" onClick={()=>{unfollowUser(data._id)}}>unfollow</button>:
  <button className="btn btn-waves" onClick={()=>{followUser(data._id)}}>follow</button>)
  :<button className="btn btn-waves" onClick={()=>{followUser(data._id)}}>follow</button>}

<div style={{  display:"flex",justifyContent:"space-around",width:"108%"}}>
    <h6>{post.length} posts</h6>
    <h6>{data.followers?data.followers.length:0} followers</h6>
    <h6>{data.following?data.following.length:0} followings</h6>
</div>
</div>
</div>
<div className="gallery">
{
    post.map((item,index)=>{
        return (<img className="item" src={item.pic} key={index}/>) 
    })
}
    </div>
   </>
  )
}

export default Userprofile;