
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import FuntionalComponent from './FuntionalComponent'

const DeclarativeRoutes = () => {
  return (
    <>
    <section>
        <a href="test">Test Hyperlink</a>
        <br />
        <a href="routing">Routing Hyperlink</a>
        <br />
        <a href="abcd">ABCD Hyperlink</a>
      </section>
      <section>
        <h1>Router Link</h1>
        <Link to="test">Test Hyperlink</Link>
        <br />
        <Link to="routing">Routing Hyperlink</Link>
        <br />
        <Link to="abcd">ABCD Hyperlink</Link>
      </section>
      <Routes>
        <Route path="test" element={<FuntionalComponent />} />
        <Route path="routing" element={<h1>Routing</h1>} />
        <Route path="abcd" element={<h1>abcd</h1>} />
      </Routes>
      </>
  )
}

export default DeclarativeRoutes
