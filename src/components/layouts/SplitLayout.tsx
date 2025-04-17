import type { ReactNode } from "react"

interface SplitLayoutProps {
  left: ReactNode
  right: ReactNode
}

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* 왼쪽 섹션 - 모바일에서는 숨김 */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
        {left}
      </div>

      {/* 오른쪽 섹션 */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">{right}</div>
      </div>
    </main>
  )
}
