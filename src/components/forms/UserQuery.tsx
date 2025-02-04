"use client"
import {  useState } from "react";
import { fetchUserData } from "@/lib/actions";

export default function UserQueryForm(){

    const [username, setUsername] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const result = await fetchUserData(username)
        console.log(result)
    }

    return(
        <form onSubmit={handleSubmit} className="flex text-2xl gap-4 mt-[4vh]">
        <h3>Enter github user:</h3>
        <input 
        type="text" 
        onChange={(e)=>setUsername(e.target.value)}
        name="username"/>
        <button type="submit" > -{`>`}</button>
        </form>
    )
}