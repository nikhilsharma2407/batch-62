import React, { useEffect, useState } from 'react'

const FuntionalComponent = (props) => {
  console.log("🚀 ~ FuntionalComponent ~ props:", props);
  
  const [name, setName] = useState("");
  const [id, setId] = useState(1);
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ FuntionalComponent ~ users:", users)

  const BASE_URL   = 'https://jsonplaceholder.typicode.com/users';

  useEffect(()=>{
    (async ()=>{
        console.log('UseEffect with empty dep array', "Behaves like componentDidMount hook")

        const users  = await (await fetch(BASE_URL)).json();
        setUsers(users);
    })();

    return ()=>{
        console.log('cleanup function', "Behaves like componentDidUnMount hook")
    }
  },[]);

  
  useEffect(()=>{
    (async ()=>{
        console.log("🚀 ~ useEffect ~ id updated:", id,"Behaves like componentDidUpdate hook")
        const user = await (await fetch(`${BASE_URL}/${id}`)).json();

        setName(user.name)
    })()
  },[id]);
  

  return (
    <>
        <h1>hello {name}</h1>
        <h2>prop {props.name}</h2>
        <h2>id - {id}</h2>
        <input type="text" />
        <br />
        <h3>counter value - {id}</h3>
        {/* <input type="number" value={this.state.counter} /> */}
        <button onClick={() => setId(id+1)}>
          Increment Counter
        </button>
        <section>
          current user - {name}
        </section>

        <h4>Users list</h4>


      </>
  )
}

export default FuntionalComponent