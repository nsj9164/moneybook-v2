"use client"

import { Button } from "../ui/Button"
import { GoogleIcon } from "../icons/GoogleIcon"
import { KakaoIcon } from "../icons/KakaoIcon"

type SocialProvider = "google" | "kakao"

interface SocialButtonProps {
  provider: SocialProvider
  onClick: () => void
  disabled?: boolean
}

export function SocialButton({ provider, onClick, disabled }: SocialButtonProps) {
  const config = {
    google: {
      text: "Google로 계속하기",
      icon: GoogleIcon,
      className:
        "w-full py-6 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 border-gray-200",
      variant: "outline" as const,
    },
    kakao: {
      text: "카카오로 계속하기",
      icon: KakaoIcon,
      className:
        "w-full py-6 flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] text-black transition-all duration-300 border-none",
      variant: "default" as const,
    },
  }

  const { text, icon: Icon, className, variant } = config[provider]

  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} className={className}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{text}</span>
    </Button>
  )
}
