import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams,  } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

let{id} = useParams();
const [username, setUsername] = useState('');
const [listOfPosts, setListOfPosts] = useState([]);

let history = useHistory();

const {authState } = useContext(AuthContext);

useEffect(() => {
    axios.get(`http://localhost:3002/auth/basicinfo/${id}`).then((response) => {
        setUsername(response.data.username);
    });
    axios.get(`http://localhost:3002/posts/byuserId/${id}`).then((response) => {
        setListOfPosts(response.data);
    });
},[])


  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'> 
            Username: {username}

          {authState.username === username && 
            <button onClick={() => {history.push('/changepassword')}}>Change Password</button>
}
           
         </div>
        <div className='listOfPosts'>
        {listOfPosts.map((value) => {
        return (
          <div className='wrapper' key={value.id} >
            <div className='title'> {value.title} </div>
            <div
              className='postText'
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}>
             
              {value.postText}
            </div>
            <div className='username'>
            
              {value.username}
              
             
               <label>{value.Likes.length}</label> 
            </div>
          </div>
        );
      })}
        </div>
       
    </div>
  )
}

export default Profile