import React, { useContext } from 'react'
import NavSt from '../styledComponents/NavSt.style'
import { AuthContext } from "../helpers/AuthContext";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Nav({setAuthState}) {
    const { authState } = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
          username: "",
          id: 0,
          role: '',
          status: false,
        });
      };
  return (
    
    <NavSt>
         {!authState.status ? (
           <>
           <Link to='/login'> Login</Link>
           
         </>
        ) : authState.role === 1 ? (
          <>
          <Link to='/'> Home Page</Link>
          <Link to='/createpost'> Create A Post</Link>
          <Link to='/registration' >Register</Link>
          <Link to='/changepassword' >Promeni lozinku</Link>
          <Link to='/login' onClick={logout}>
            Logout
          </Link>
          <Link className='username' to='#' >  User: {authState.username }</Link>
        </>
          ) : (
          <>
              <Link to='/'> Home Page</Link>
              <Link to='/createpost'> Create A Post</Link>
              <Link to='/changepassword' >Promeni lozinku</Link>
              <Link to='/login' onClick={logout}>
                Logout
              </Link>
              <Link className='username' to='#' >  User: {authState.username}</Link>
            </>
        )}
        </NavSt>
  )
  }
export default Nav