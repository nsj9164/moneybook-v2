import type { LucideIcon } from "lucide-react"

interface FeatureIconProps {
  icon: LucideIcon
}

export function FeatureIcon({ icon: Icon }: FeatureIconProps) {
  return (
    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
      <Icon className="text-white" size={24} />
    </div>
  )
}
