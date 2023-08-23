import styled from 'styled-components';

const NavSt = styled.div`
    margin: 0;
    padding: 0;
    height: 50px;
    width: 100%;
    background: blue;
    display: block;
    a{
      color: white;
      line-height: 50px;
      text-decoration: none;
      margin-right: 10px;
      padding-left: 5px;
      display: inline-block;
    }
    a:hover {
      background: red;
      transition: .2s
    }
    .username {
      position: absolute;
      right: 10px;
      top: 6px;
    }
    .username:hover {
      background: none;
    }
`

export default NavSt;