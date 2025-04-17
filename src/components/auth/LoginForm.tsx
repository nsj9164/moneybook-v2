"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/Card"
import { SocialButton } from "./SocialButton"
import { Divider } from "../ui-elements/Divider"
import { ActionButtons } from "./ActionButtons"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // 실제 구현에서는 Google OAuth 로직 추가
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleKakaoLogin = async () => {
    setIsLoading(true)
    // 실제 구현에서는 Kakao OAuth 로직 추가
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <Card className="w-full shadow-lg border border-gray-100 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <SocialButton provider="google" onClick={handleGoogleLogin} disabled={isLoading} />
        <SocialButton provider="kakao" onClick={handleKakaoLogin} disabled={isLoading} />
        <Divider text="또는" />
        <ActionButtons isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}
