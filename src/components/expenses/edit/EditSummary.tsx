interface EditSummaryProps {
  newExpenseCount: number;
}
export const EditSummary = ({ newExpenseCount }: EditSummaryProps) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">요약</h3>
          <p className="text-sm text-gray-500">
            총 {newExpenseCount}개 항목, {newExpenseCount}개 유효
          </p>
        </div>
        <div className="mt-3 sm:mt-0 space-y-1">
          <p className="text-sm text-gray-500">
            총 결제 금액:{" "}
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
                maximumFractionDigits: 0,
              }).format(27000)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            총 실제 지출:{" "}
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
                maximumFractionDigits: 0,
              }).format(21000)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
