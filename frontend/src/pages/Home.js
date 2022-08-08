import { useEffect, useState } from "react"


const Home = () =>{
//fetch data from backend
    useEffect(()=>{
const fetchWorkouts = async () =>{
const response = await fetch('http://localhost:4000/api/workouts')
}
fetchWorkouts()
})

    return (
        <div classname="home">
            <h2>Home Page</h2>
        </div>
    )
}

export default Home