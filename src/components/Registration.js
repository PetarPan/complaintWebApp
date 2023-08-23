import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import FormSt from '../styledComponents/FormSt.style'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from "../helpers/AuthContext";

function Registration() {
    const initialValues = {
        username: "",
        password: "",
        role: "",
        name:"",
        lastName:""
    };

const history = useHistory();
const { authState } = useContext(AuthContext);



    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    });
    const onSubmit= (data) => {
        axios.post("http://localhost:3002/auth", data).then(() => {
            
            //history.push('/login')
            alert('Novi nalog kreiran!');
           
        })
    }

  return (
    
   authState.role === 1 ?

    <FormSt>
          
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
                <Form>
            <div className="loginContainer">
                <label>Korisničko ime: </label>
                <ErrorMessage name='username' component='span' />
                <Field id='inputCreatePost' name='username' placeholder='(Ex. josh123)' />
                <label>Lozinka: </label>
                <ErrorMessage name='password' component='span' />
                <Field id='inputCreatePost1' name='password' type='password' placeholder='(Unesite lozinku)' />
                <label>Role: </label>
                <ErrorMessage name='role' component='span' />
                <Field id='inputCreatePost2' name='role' as='select'  >
                    <option value='' disabled>Odaberi ulogu</option>
                    <option value='1'>Admin</option>
                    <option value='2'>Korisnik</option>
                </Field>
                <label>Ime: </label>
                <ErrorMessage name='name' component='span' />
                <Field id='inputCreatePost3' name='name' type='text' placeholder='(Ime korisnika)' />
                <label>Prezime: </label>
                <ErrorMessage name='lastName' component='span' />
                <Field id='inputCreatePost4' name='lastName' type='text' placeholder='(Prezime korisnika)' />
                <button type='submit'>Registruj</button>
                </div>
                </Form>
            </Formik>
            </FormSt>
   :
   <div>
   <div>Niste verifikovani da vidite ovu stranicu</div>
    <Link to='/'>Home Page</Link>
   
   </div>

   
    
       
         
  )
}


export default Registration