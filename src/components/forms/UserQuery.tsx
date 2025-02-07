"use client";
import { useState } from "react";
import { fetchUserData } from "@/lib/actions";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UserQueryForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await fetchUserData(username);
      if (!result) {
        setError("User not found");
        return;
      }

      // Store the username (not the full user data) in localStorage
      localStorage.setItem('githubUser', username);

      router.push(`/user/${username}`);
    } catch (err) {
      setError("An error occurred while fetching user data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row text-base sm:text-lg gap-3 sm:gap-4 mt-8 sm:mt-6 items-center w-full"
    >
      <h3 className="text-center sm:text-left">Enter GitHub user:</h3>
      <input
        className="bg-[#5A6579] rounded-md p-2 w-full sm:w-auto text-white placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        disabled={isSubmitting}
      />
      <button
        className={`bg-[#39D353] px-4 py-2 rounded-md text-black font-bold transition 
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2c9e40]'}`}
        type="submit"
        disabled={isSubmitting}
      >
        <FaLongArrowAltRight className={isSubmitting ? 'animate-pulse' : ''} />
      </button>
      {error && (
        <p className="text-red-500 text-sm absolute mt-16">{error}</p>
      )}
    </form>
  );
}
