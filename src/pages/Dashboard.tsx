"use client";

import { useState } from "react";
import ExpenseSummary from "@/components/dashboard/ExpenseSummary";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import CategoryChart from "@/components/dashboard/CategoryChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import FileUpload from "@/components/dashboard/FileUpload";

// 샘플 데이터
const monthlyExpense = 1250000;
const monthlyGoal = 1500000;

const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500" },
  { name: "교통비", value: 120000, color: "bg-blue-500" },
  { name: "주거비", value: 350000, color: "bg-amber-500" },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500" },
  { name: "여가", value: 150000, color: "bg-purple-500" },
];

const recentTransactions = [
  { date: "2023-06-15", description: "스타벅스", amount: 5500 },
  { date: "2023-06-14", description: "지하철 충전", amount: 30000 },
  { date: "2023-06-13", description: "온라인 쇼핑", amount: 45000 },
  { date: "2023-06-12", description: "식료품", amount: 32000 },
  { date: "2023-06-10", description: "영화 티켓", amount: 15000 },
];

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6">
      {/* 이번 달 총 지출 */}
      <ExpenseSummary expense={monthlyExpense} goal={monthlyGoal} />

      {/* 목표 대비 퍼센트 */}
      <BudgetProgress expense={monthlyExpense} goal={monthlyGoal} />

      {/* 엑셀 업로드 */}
      <FileUpload selectedFile={selectedFile} onFileChange={handleFileChange} />

      {/* 카테고리별 지출 도넛 차트 */}
      <div className="lg:col-span-2">
        <CategoryChart data={categoryData} />
      </div>

      {/* 최근 지출 내역 */}
      <div className="lg:col-span-3">
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
