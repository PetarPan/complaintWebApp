import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function PageNotFound() {
  return (
    <div>
        <h1>Page Not Found Error 404</h1>
        <h3>Go to the Home Page:  <Link to="/"> Home Page</Link></h3>
    </div>
  )
}

export default PageNotFound