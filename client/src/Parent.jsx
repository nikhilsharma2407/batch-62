import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


export const Child1 = ()=>{
  const {state} = useLocation();
  console.log("🚀 ~ Child1 ~ state:", state)
return <h1>Child1 component</h1>
}
export const Child2 = ()=><h1>Child2 component</h1>
export const Child3 = ()=><h1>Child3 component</h1>

export const Parent = () => {
  return (
    <>
      {/* <h1>Parent Component</h1>
      <section>
        <Link to="child1">child 1</Link>
        <br />
        <Link to="child2">
          Child 2
        </Link>
        <br />
        absolute URL begin with /
        <Link to="/parent/child3">Child 3</Link>
      </section> */}

      <Outlet/>
    </>
  );
}

