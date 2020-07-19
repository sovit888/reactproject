import React, { useState,useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';
const Create=()=>{
    const history=useHistory();
    const [title,setTitle]=useState('');
    const [body,setbody]=useState('');
    const[image,setImage]=useState('');
    const[pic,setPic]=useState('');
    useEffect(()=>{
        if(pic){
        fetch('/post/post',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
         body:JSON.stringify({title,body,pic})
        })
        .then((res)=>{return res.json()})
        .then(data=>{
            if(data.error){M.toast({html: data.error,classes:"#ff1744 red accent-3"})}
            else{
                M.toast({html:"Created a new post",classes:"#66bb6a green lighten-1"});
                history.push('/');
            }
        })
    }
    },[pic]);
    const postData=()=>{
    const data=new FormData();
    data.append('file',image);
    data.append('upload_preset','instaclone');
    data.append('cloud_name','sovitcollection');
    fetch('	https://api.cloudinary.com/v1_1/sovitcollection/image/upload',{
        method:"post",
        body:data
    })
    .then((res)=>{return res.json()})
    .then(data=>{setPic(data.url);});
    }
        return (
           <>
           <div className="card create-post">
               <input type="text" placeholder="title" onChange={e=>setTitle(e.target.value)}/>
               <input type="text" placeholder="body" onChange={e=>setbody(e.target.value)}/>
               <div className="file-field input-field">
      <div className="btn">
        <span>upload image</span>
        <input type="file" onChange={e=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button className="btn waves-effect waves-light blue lighten-1" onClick={()=>postData()}>Submit Post
  </button>
           </div>
           </>
        );
    }

export default Create;