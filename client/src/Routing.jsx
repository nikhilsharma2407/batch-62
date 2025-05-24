import React from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'


const Routing = () => {
    const {pathname, search} = useLocation();
    
    // used to read the route params
    const params = useParams()

    // used to read the search params
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate();

    console.log("🚀 ~ Routing ~ searchParams:", [...searchParams.entries()])
    console.log("🚀 ~ Routing ~ params:", params)
    console.log("🚀 ~ Routing ~ pathname:", pathname)


    // navigate programatically
    

    return (
      <>
        <section>path - {pathname}</section>
        <section>search - {search}</section>
        <section>Route Params - {params.productId}</section> 
        <section>query Params- {searchParams.get('search')}</section> 

        <section>
          <input type="text" onChange={e=> setSearchParams({search:e.target.value}) } />
        </section>

        <button onClick={()=>navigate('/parent/child1',{
          state:{source:'routing'},
          replace:true
        })}>Navigate to child 1</button>
      </>
    
  )
}

export default Routing