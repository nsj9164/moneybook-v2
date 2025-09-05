import { EditHeader } from "./EditHeader";
import { EditSummary } from "./EditSummary";
import { TableForm } from "./expense-form/table-form";
import { ExpenseFormProvider } from "./context/ExpenseFormContext";
import { FormProvider, useForm } from "react-hook-form";
import { TransactionEntity } from "@/types";

const ExpenseFormPage = () => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const FormComponent = isMobile ? CardForm : TableForm;
  const methods = useForm<TransactionEntity>();

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpenseFormProvider>
        {/* 헤더 영역 */}
        <EditHeader />

        {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
        <FormProvider {...methods}>
          <TableForm />
        </FormProvider>

        {/* 요약 정보 */}
        <EditSummary />
      </ExpenseFormProvider>
      {/* 하단 고정 저장 버튼 (모바일) */}
      {/* {isMobile && <AddExpenseMobileFooter />} */}
    </div>
  );
};

export default ExpenseFormPage;
