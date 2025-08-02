import { RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "./Alert";

export const ErrorBox = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <Alert variant="destructive" className="flex items-start gap-2">
    <RefreshCw className="h-4 w-4 mt-0.5" />
    <AlertDescription className="flex-1">
      {message}
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 underline text-sm text-red-500"
        >
          다시 시도
        </button>
      )}
    </AlertDescription>
  </Alert>
);
