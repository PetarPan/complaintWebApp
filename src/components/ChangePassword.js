import axios from 'axios'
import React, { useState } from 'react'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const changePassword = () => {
        axios.put('http://localhost:3002/auth/changepassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        },
        {headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
        ).then((response) => {
            if(response.data.error) {
                alert(response.data.error);
            }
        }); 
    }
  return (
    <div>
        <h1>Change Your Password:</h1>
        <label>Old Password: </label>
        <input type='text' placeholder='Old password...' onChange={(event) => {setOldPassword(event.target.value)}}></input>  <br></br>
       
        <label>New Password: </label>
        <input type='text' placeholder='New password...' onChange={(event) => {setNewPassword(event.target.value)}}></input> <br></br>
        <button onClick={changePassword}>Save Changes</button>
    </div>
  );
}

export default ChangePassword;