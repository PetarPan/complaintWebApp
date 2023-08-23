import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import PostSt from '../styledComponents/PostSt.style';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState } = useContext(AuthContext);
  
    let history = useHistory();
    useEffect(() => {
      axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
        setPostObject(response.data);
      });
  
      axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
        setComments(response.data);
      });
    }, [id]);
  
    const addComment = () => {
      axios
        .post(
          "http://localhost:3002/comments",
          {
            commentBody: newComment,
            PostId: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            const commentToAdd = {
              commentBody: newComment,
              username: response.data.username,
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
            //refresujemo stranicu jer se bez toga javlja greska i nemoguce je brisanje komentara onmah nakon unosa istog... resi problem kasnije...
            window.location.reload();
          }
        });
    };
  
    const deleteComment = (id) => {
      axios
        .delete(`http://localhost:3002/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id !== id; 
            })
          );
          
        });
    };

    const deletePost = (id) => {
      axios.delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push('/');
        console.log(`Post ID ${id} deleted`);
      })
      /* .catch((error) => {
        console.error("An error occurred during post deletion:", error);
        
      }) */;
    }

    const editPost = (option) => {
      if(option === 'title') {
        let newTitle = prompt('Enter new title: ');
        axios.put(`http://localhost:3002/posts/title`, 
        {
          newTitle: newTitle, 
          id: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") },}
        );
        setPostObject({...postObject, title: newTitle});
      } else {
        let newPostText = prompt('Enter new text: ');
        axios.put(`http://localhost:3002/posts/postText`, 
        {
          newText: newPostText, 
          id: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") },}
        );
        setPostObject({...postObject, postText: newPostText});
      }
    }
  return (
    <PostSt>
    <div className='postPage'>

        <div className='leftSide'>
            <div className='post' id='individual'>
            <div className='title' onClick={() => {
              //postavljamo uslov da samo kreator posta moze da menja naslov i tekst u sledecem uslovu
              if(authState.username === postObject.username) {
                editPost('title')};
              }
              }
              >{postObject.title}</div>
            <div className='postPage' onClick={() => {
              if(authState.username === postObject.username) {
              editPost('postPage')};
            }
            }
              >{postObject.postText}</div>
            <div className='footer'>{postObject.username} 
            {/* logika za prikazivanje dugmena za brisanje posta samo onome ko je isti kreirao */}
            {authState.username === postObject.username && <button onClick={() => {
                  deletePost(postObject.id);
                }}>Delete Post</button>}</div>
            </div>
        </div>
        <div className='rightSide'>
          <div className='addCommentContainer'>
            <input type='text' placeholder='Comment...' autoComplete='off' onChange = {(event) => {setNewComment(event.target.value)}} value={newComment} />
            <button onClick={addComment}>Add Comment</button>
          <div className='listOfComments'>

            {comments.map((comment, key) => {
              return <div key={key} className='comment'>
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {/* prikazujemo dugme za brisanje komentara samo za korisnike koji su napisali taj komentar */}
                {authState.username === comment.username && <button onClick={() => {deleteComment(comment.id)}}>X</button>}
                </div>
            })}
          </div>
          </div>
        </div>


    </div>
    </PostSt>
  )
}

export default Post