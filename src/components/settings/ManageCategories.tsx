import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// 샘플 데이터
const initialCategories = [
  { id: "1", name: "식비", color: "#ef4444", icon: "🍔", isDefault: true },
  { id: "2", name: "교통비", color: "#3b82f6", icon: "🚗", isDefault: true },
  { id: "3", name: "주거비", color: "#f59e0b", icon: "🏠", isDefault: true },
  { id: "4", name: "통신비", color: "#10b981", icon: "📱", isDefault: true },
  { id: "5", name: "의료/건강", color: "#6366f1", icon: "💊", isDefault: true },
  { id: "6", name: "교육", color: "#8b5cf6", icon: "📚", isDefault: false },
  { id: "7", name: "쇼핑", color: "#ec4899", icon: "🛍️", isDefault: false },
  { id: "8", name: "여가", color: "#14b8a6", icon: "🎮", isDefault: false },
  { id: "9", name: "기타", color: "#6b7280", icon: "📌", isDefault: true },
];

// 색상 옵션
const colorOptions = [
  { name: "빨강", value: "#ef4444" },
  { name: "주황", value: "#f97316" },
  { name: "노랑", value: "#f59e0b" },
  { name: "초록", value: "#10b981" },
  { name: "청록", value: "#14b8a6" },
  { name: "파랑", value: "#3b82f6" },
  { name: "남색", value: "#6366f1" },
  { name: "보라", value: "#8b5cf6" },
  { name: "분홍", value: "#ec4899" },
  { name: "회색", value: "#6b7280" },
];

// 아이콘 옵션
const iconOptions = [
  "🍔",
  "🚗",
  "🏠",
  "📱",
  "💊",
  "📚",
  "🛍️",
  "🎮",
  "💼",
  "💰",
  "✈️",
  "🎬",
  "🎵",
  "🏋️",
  "🧘",
  "🍷",
  "☕",
  "🎁",
  "📌",
  "🔧",
];

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category?: Category;
  isEditing: boolean;
}

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 검색 및 페이지네이션 적용된 카테고리 목록
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddCategory = () => {
    setCurrentCategory(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
      setCategories(categories.filter((c) => c.id !== categoryId));
    }
  };

  const handleSaveCategory = (category: Category) => {
    if (isEditing) {
      setCategories(
        categories.map((c) => (c.id === category.id ? category : c))
      );
    } else {
      setCategories([
        ...categories,
        { ...category, id: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">카테고리 관리</h2>
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          카테고리 추가
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="search" className="sr-only">
            카테고리 검색
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
              placeholder="카테고리 검색"
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
                  카테고리명
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  색상
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
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-center text-xl">
                    <span role="img" aria-label={category.name}>
                      {category.icon}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="ml-2 text-sm text-gray-500">
                        {colorOptions.find((c) => c.value === category.color)
                          ?.name || "사용자 지정"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {category.isDefault ? (
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
                        onClick={() => handleEditCategory(category)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">편집</span>
                      </button>
                      {!category.isDefault && (
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
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
                      {filteredCategories.length}
                    </span>{" "}
                    항목 중{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>
                    -
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredCategories.length
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={currentCategory}
        isEditing={isEditing}
      />
    </div>
  );
};

// 카테고리 추가/수정 모달
const CategoryModal = ({
  isOpen,
  onClose,
  onSave,
  category,
  isEditing,
}: CategoryModalProps) => {
  const [form, setForm] = useState<Category>({
    id: category?.id || "",
    name: category?.name || "",
    color: category?.color || colorOptions[0].value,
    icon: category?.icon || iconOptions[0],
    isDefault: category?.isDefault || false,
  });

  // 모달이 열릴 때마다 폼 초기화
  useState(() => {
    if (isOpen) {
      setForm({
        id: category?.id || "",
        name: category?.name || "",
        color: category?.color || colorOptions[0].value,
        icon: category?.icon || iconOptions[0],
        isDefault: category?.isDefault || false,
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleColorChange = (color: string) => {
    setForm({ ...form, color });
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
                  {isEditing ? "카테고리 수정" : "카테고리 추가"}
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
                      카테고리명
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      placeholder="카테고리명을 입력하세요"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      색상
                    </label>
                    <div className="mt-1 grid grid-cols-5 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleColorChange(color.value)}
                          className={`flex h-8 w-full items-center justify-center rounded-md ${
                            form.color === color.value
                              ? "ring-2 ring-offset-2 ring-emerald-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {form.color === color.value && (
                            <Check className="h-5 w-5 text-white" />
                          )}
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

export default ManageCategories;
