import { useAuth } from "@/contexts/AuthContext";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { EditHeader } from "./EditHeader";
import { EditSummary } from "./EditSummary";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import { initialExpense } from "../../constants/expense.initial";
import { expensesState } from "@/recoil/atoms";
import { useSearchParams } from "react-router-dom";
import { useFetchExpensesByIds } from "@/hooks/fetchData/useFetchExpensesByIds";
import { TableForm } from "./expense-form/table-form";
import { useExpenseHandlers } from "../../hooks/useExpenseHandlers";
import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { diffFields } from "@/utils/form";
import { toast } from "react-hot-toast";
import { calActualAmount } from "../../utils/expenseCalc";
import { TempId } from "@/types/ids";
import { parseCurrency } from "@/utils/format";
import { ExpenseFormProvider } from "./context/ExpenseFormContext";

const ExpenseFormPage = () => {
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const [searchParams] = useSearchParams();

  const ids = searchParams.get("ids")?.split(",").map(Number) || [];
  const editExpenses = useFetchExpensesByIds(ids);

  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const FormComponent = isMobile ? CardForm : TableForm;

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpenseFormProvider editExpenses={editExpenses}>
        {/* 헤더 영역 */}
        <EditHeader />

        {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}

        <TableForm categories={categories} payMethods={payMethods} />

        {/* 요약 정보 */}
        <EditSummary />
      </ExpenseFormProvider>
      {/* 하단 고정 저장 버튼 (모바일) */}
      {/* {isMobile && <AddExpenseMobileFooter />} */}
    </div>
  );
};

export default ExpenseFormPage;
