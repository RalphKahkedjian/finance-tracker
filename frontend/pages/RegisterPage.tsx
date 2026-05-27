'use client'

import { registerUser } from "@/services/authService"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async()=> {
    const response = await registerUser({
      name,
      email,
      password
    })

    localStorage.setItem('token', response.data.token)
    router.push('/')
  }

  return (
    <main style={{padding:'40px'}}>
      <h1>
        Register
      </h1>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
      />

      <input
       placeholder="Enter your email"
       value={email}
       onChange={(e)=> setEmail(e.target.value)}
      />

      <input
       placeholder="Enter your password"
       value={password}
       type="password"
       onChange={(e)=> setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </main>
  )
}