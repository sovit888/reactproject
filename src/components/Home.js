import React,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';
import {userContext} from '../App';

const Home=()=>{
	const {state,dispatch}=useContext(userContext)
	const [data,setData]=useState([]);
	useEffect(()=>{
fetch('/post/show',{
	headers:{
		"Authorization":"Bearer "+localStorage.getItem('jwt')
	}
})
.then(res=>{return res.json()})
.then(result=>{
	setData(result.result)
})
	},[]);
	const likePost=(id)=>{
		fetch('/post/like',{
		method:"put",
		headers:{
			"Authorization":"Bearer "+localStorage.getItem('jwt'),
			"Content-Type":"application/json"
		},
		body:JSON.stringify({postId:id})	
		})
		.then((res)=>{return res.json()})
		.then(result=>{
			var updateData=data.map((item,index)=>{
if(item._id==result.result._id){return result.result}
	else{return item}})
setData(updateData)
	})
}
	const unlikePost=(id)=>{
		fetch('/post/unlike',{
		method:"put",
		headers:{
			"Authorization":"Bearer "+localStorage.getItem('jwt'),
			"Content-Type":"application/json"
		},
		body:JSON.stringify({postId:id})	
		})
		.then((res)=>{return res.json()})
		.then(result=>{
					var updateData=data.map((item,index)=>{
if(item._id==result.result._id){return result.result}
	else{return item}})
setData(updateData)
		})
}
const makeComment=(text,id)=>{
	fetch('/post/comments',{
		method:"put",
		headers:{
			"Authorization":"Bearer "+localStorage.getItem('jwt'),
			"Content-Type":"application/json"
		},
		body:JSON.stringify({text,postId:id})
	})
	.then(res=>{return res.json()})
	.then(result=>{
	var updateData=data.map((item,index)=>{
if(item._id==result.result._id){return result.result}
	else{return item}})
setData(updateData)
	})
}
const deletePosts=(postid,userid)=>{
fetch(`/post/delete/${postid}`,{
	method:"delete",
	headers:{
		"Content-Type":"application/json",
		"Authorization":"Bearer "+localStorage.getItem('jwt')
	},
})
.then(res=>{return res.json()})
.then(result=>{
	var newData=data.filter(value=>{return value._id!=result.result._id});
	setData(newData);
})
}
const deleteComments=(postId,cmtId)=>{
fetch('/post/deletecomments',{
	method:"put",
	headers:{
		"Content-Type":"application/json",
		"Authorization":"Bearer "+localStorage.getItem('jwt')
	},
	body:JSON.stringify({postId,cmtId})
})
.then(res=>{return res.json()})
.then(result=>{
					var updateData=data.map((item,index)=>{
if(item._id==result.result._id){return result.result}
	else{return item}})
setData(updateData) 
})
}
		return (
	<>
	{
	data.map((item,index)=>{
			return (
				<div className="card home-card" key={index}>
		<h5><Link to={item.postedBy._id!=state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>{item.postedBy._id==state._id?<i className="material-icons" style={{"float":"right"}} 
		onClick={()=>{deletePosts(item._id,state._id)}}>delete</i>:""}</h5>
		<div className="card-image">
			<img src={item.pic} />
		</div>
		<div className="card-content">
		<h5>{item.likes.length} likes</h5>
		{item.likes.includes(state._id)?<i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>:
	<i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>} &nbsp;
	<i className="material-icons">chat</i><br/>
	<strong>{item.comments.length} comments</strong>
			<h6>{item.title}</h6>
			<p>{item.body}</p>
			{
				item.comments.map(value=>{
					return (<h6>{value.postedBy.name}:{value.text}{value.postedBy._id==state._id?<span style={{"float":"right"}} className="deletes"
						onClick={()=>deleteComments(item._id,value._id)}>delete</span>:""}</h6>)
				})
			}
			<form onSubmit={(e)=>{e.preventDefault();makeComment(e.target[0].value,item._id);e.target.reset()}}>
			<input type="text" placeholder="Add a comment"/>
			</form>
		</div>
	</div>
			)

		})	
	}
	</>
		);
	}
export default Home;