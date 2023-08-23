import styled from 'styled-components';

const HomeSt = styled.div`
    width: 70%;
    margin: 0 auto ;
    .wrapper{
        border: 1px solid black;
        margin: 10px;
        cursor: pointer;
    }
    .username, .title {
        color: white;
        background: blue;
        padding: 5px;
        cursor: pointer;
    
    }
    .postText {
        padding: 10px;
        cursor: pointer;
        height: 350px;
        margin: 0 auto;
      
    }
    .liked {
        color: red;
    }
    .unliked {
        color: green;
l    }
`

export default HomeSt;