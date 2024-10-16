"use client"
import React from 'react'
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"


const LogoutButton = () => {

    const handleClick = async () => {
        await signOut({
            callbackUrl: "/auth/login"
        })
    }

  return (
    <Button onClick={handleClick}>LogOut</Button>
  )
}

export default LogoutButton