import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// 샘플 데이터
const initialPaymentMethods = [
  { id: "1", name: "신용카드", icon: "💳", isDefault: true },
  { id: "2", name: "체크카드", icon: "💳", isDefault: true },
  { id: "3", name: "현금", icon: "💵", isDefault: true },
  { id: "4", name: "계좌이체", icon: "🏦", isDefault: true },
  { id: "5", name: "자동이체", icon: "⏱️", isDefault: true },
  { id: "6", name: "네이버페이", icon: "🟢", isDefault: false },
  { id: "7", name: "카카오페이", icon: "🟡", isDefault: false },
  { id: "8", name: "토스", icon: "🔵", isDefault: false },
  { id: "9", name: "기타", icon: "📌", isDefault: true },
];

// 아이콘 옵션

interface PayMethod {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payMethod: PayMethod) => void;
  payMethod?: PayMethod;
  isEditing: boolean;
}

const ManagePayMethods = () => {
  const [payMethods, setPayMethods] = useState<PayMethod[]>(
    initialPaymentMethods
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<
    PayMethod | undefined
  >(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 검색 및 페이지네이션 적용된 결제수단 목록
  const filteredPaymentMethods = payMethods.filter((method) =>
    method.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPaymentMethods.length / itemsPerPage);
  const paginatedPaymentMethods = filteredPaymentMethods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddPaymentMethod = () => {
    setCurrentPaymentMethod(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditPaymentMethod = (payMethod: PayMethod) => {
    setCurrentPaymentMethod(payMethod);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeletePaymentMethod = (paymentMethodId: string) => {
    if (window.confirm("이 결제수단을 삭제하시겠습니까?")) {
      setPayMethods(payMethods.filter((p) => p.id !== paymentMethodId));
    }
  };

  const handleSavePaymentMethod = (payMethod: PayMethod) => {
    if (isEditing) {
      setPayMethods(
        payMethods.map((p) => (p.id === payMethod.id ? payMethod : p))
      );
    } else {
      setPayMethods([
        ...payMethods,
        { ...payMethod, id: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">결제수단 관리</h2>
        <button
          onClick={handleAddPaymentMethod}
          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          결제수단 추가
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="search" className="sr-only">
            결제수단 검색
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
              placeholder="결제수단 검색"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  아이콘
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  결제수단명
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  상태
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">편집</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedPaymentMethods.map((method) => (
                <tr key={method.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-center text-xl">
                    <span role="img" aria-label={method.name}>
                      {method.icon}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {method.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {method.isDefault ? (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        기본
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        사용자 정의
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditPaymentMethod(method)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">편집</span>
                      </button>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">삭제</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    전체{" "}
                    <span className="font-medium">
                      {filteredPaymentMethods.length}
                    </span>{" "}
                    항목 중{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>
                    -
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredPaymentMethods.length
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        currentPage === 1 ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="sr-only">이전</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === i + 1
                            ? "z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                        currentPage === totalPages ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="sr-only">다음</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePaymentMethod}
        payMethod={currentPaymentMethod}
        isEditing={isEditing}
      />
    </div>
  );
};

// 결제수단 추가/수정 모달
const PaymentMethodModal = ({
  isOpen,
  onClose,
  onSave,
  payMethod,
  isEditing,
}: PaymentMethodModalProps) => {
  const [form, setForm] = useState<PayMethod>({
    id: payMethod?.id || "",
    name: payMethod?.name || "",
    icon: payMethod?.icon || iconOptions[0],
    isDefault: payMethod?.isDefault || false,
  });

  // 모달이 열릴 때마다 폼 초기화
  useState(() => {
    if (isOpen) {
      setForm({
        id: payMethod?.id || "",
        name: payMethod?.name || "",
        icon: payMethod?.icon || iconOptions[0],
        isDefault: payMethod?.isDefault || false,
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleIconChange = (icon: string) => {
    setForm({ ...form, icon });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {isEditing ? "결제수단 수정" : "결제수단 추가"}
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">닫기</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      결제수단명
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      placeholder="결제수단명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      아이콘
                    </label>
                    <div className="mt-1 grid grid-cols-10 gap-2">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => handleIconChange(icon)}
                          className={`flex h-8 w-8 items-center justify-center rounded-md text-lg ${
                            form.icon === icon
                              ? "bg-emerald-100 ring-2 ring-emerald-500"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <span role="img" aria-label={`아이콘 ${icon}`}>
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      onClick={onClose}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                    >
                      {isEditing ? "수정" : "추가"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ManagePayMethods;
