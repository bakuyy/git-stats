"use server"

export async function fetchUserData(username: string){

    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        console.log("response",response)
    
    if (!response.ok) {
        throw new Error('User not found')
        }
        
        return await response.json()
    } catch (error) {
        return { error: error.message }
    }
    



}