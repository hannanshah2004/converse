"use client"

import { useEffect, Suspense } from "react"
import { useAuth } from "@/lib/supabase/auth-context"
import { useRouter } from "next/navigation"

import ChatPageContent from "@/components/ChatPageContent"

export default function ChatPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg">Loading chat...</p>
        </div>
      </div>
    }>
      <ChatPageContent user={user} />
    </Suspense>
  )
}
