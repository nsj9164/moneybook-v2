import { Button } from "../ui/Button"

interface ActionButtonsProps {
  isLoading?: boolean
}

export function ActionButtons({ isLoading }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="border-gray-200 hover:bg-gray-50 transition-all duration-300"
        disabled={isLoading}
      >
        둘러보기
      </Button>
      <Button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        disabled={isLoading}
      >
        회원가입
      </Button>
    </div>
  )
}
