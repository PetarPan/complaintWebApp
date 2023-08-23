import styled from 'styled-components';


/*post style */


const PostSt = styled.div`
.post {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid lightgray;
  font-family: Arial, Helvetica, sans-serif;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.post:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
.post .title {
  flex: 20%;
  border-bottom: 1px solid lightgray;
  background-color: dodgerblue;
  display: grid;
  place-content: center;
  color: white;
}

.post .body {
  flex: 60%;
  display: grid;
  place-content: center;
}

.post .footer {
  flex: 20%;
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: dodgerblue;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

  .postPage {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.leftSide {
  flex: 50%;
  height: calc(100vh - 70px);
  display: grid;
  place-items: center;
}

.rightSide {
  flex: 50%;
  height: calc(100vh - 70px);
  display: grid;
  place-items: center;
}

#individual {
  height: 500px;
  width: 600px;
}

#individual .title,
#individual .footer {
  font-size: 30px;
}

#individual .body {
  font-size: 25px;
}

/* comment style */
.rightSide {
  flex: 50%;
  height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  display: flex;
  flex-direction: column;
}

.rightSide .addCommentContainer {
  flex: 20%;
  width: 100%;
  display: grid;
  place-items: center;
  margin-top: 25px;
}

.addCommentContainer input,
button {
  width: 200px;
  height: 50px;
  border-radius: 8px;
  border: none;
}

.addCommentContainer button {
  background-color: dodgerblue;
  color: white;
}

.addCommentContainer input {
  border: 2px solid dodgerblue;
}

.rightSide .listOfComments {
  flex: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.listOfComments .comment {
  width: 70%;
  height: auto;
  padding: 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-top: 20px;
}

    
`

export default PostSt;