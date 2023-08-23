/** @format */

import React, { useContext } from "react";
import axios from "axios";
import HomeSt from "../styledComponents/HomeSt.style";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../helpers/AuthContext";
/* import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderIcon"; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login');
    } else {
    axios
      .get("http://localhost:3002/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3002/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            //automatsko menjanje broja lajkova bez refresovanja stranice
            if (post.id === postId) {
              if (response.data.liked) {
                //uvecavanje za lajkovanje
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                //umanjenje za dislajk
                const likeArray = post.Likes;
                //pop() funkcija uklanja jedan iz array - a
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };
  return (
    <HomeSt>
      
      
      {listOfPosts.map((value) => {
        return (
          <div className='wrapper' key={value.id}>
           
            <div className='title'> {value.title} </div>
            <div
              className='postText'
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}>
              
              {value.postText}
            </div>
            <div className="username">
              <Link to={`/profile/${value.UserId}`}>  {value.username}</Link>
            </div>
            <div className='buttton'>
            <FontAwesomeIcon icon={faHeart} onClick={() => {
                  likeAPost(value.id);
                }}
                className={likedPosts.includes(value.id) ? "unliked" : "liked"}/>      
             
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </HomeSt>
  );
}

export default Home;
