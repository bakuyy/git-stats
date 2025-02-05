"use client"
import { useState } from "react"
import { fetchUserData } from "@/lib/actions"
import { FaLongArrowAltRight } from "react-icons/fa"

export default function UserQueryForm() {
  const [username, setUsername] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await fetchUserData(username);
    console.log(result);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sm:flex-row text-lg sm:text-2xl gap-4 mt-6 items-center w-full "
    >
      <h3 className="text-center sm:text-left">Enter GitHub user:</h3>
      <input
        className="bg-[#5A6579] rounded-md p-2 w-full sm:w-auto text-white placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
        name="username"
      />
      <button
        className="bg-[#39D353] px-4 py-2 rounded-md text-black font-bold transition hover:bg-[#2c9e40]"
        type="submit"
      >
        <FaLongArrowAltRight />
      </button>
    </form>
  )
}
