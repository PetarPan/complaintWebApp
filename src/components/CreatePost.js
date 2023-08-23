/** @format */

import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormSt from "../styledComponents/FormSt.style";
import { AuthContext } from "../helpers/AuthContext";
function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Polje Naslov je obavezno!"),
    postText: Yup.string().required(),
  });

  let history = useHistory();
  const { authState } = useContext(AuthContext);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3002/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history.push("/");
      });
  };
  return (
    
      <FormSt>
        <div className='formContainer'>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
            
          <Form>
            <label>Title: </label>
            <ErrorMessage name='title' component='span' />
            <Field
              id='inputCreatePost'
              name='title'
              placeholder='(Enter Title)'
            />
            <label>Post: </label>
            <ErrorMessage name='postText' component='span' />
            <Field
              id='inputCreatePost'
              name='postText'
              placeholder='(Ex. Post...)'
            />
            <button type='submit'>Create Post</button>
            
          </Form>
      
        </Formik>
        </div>
      </FormSt>
    
  );
}

export default CreatePost;
