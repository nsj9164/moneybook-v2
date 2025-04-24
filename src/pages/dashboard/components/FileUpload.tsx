import { Upload } from "lucide-react";

interface FileUploadProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload = ({ selectedFile, onFileChange }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4">
        <h2 className="text-base font-semibold">데이터 가져오기</h2>
        <p className="text-sm text-gray-500">엑셀 파일을 업로드하세요</p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
            <label htmlFor="file-upload" className="cursor-pointer text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm font-medium">
                {selectedFile ? selectedFile.name : "파일을 선택하세요"}
              </p>
              <p className="text-xs text-gray-500">Excel 파일만 지원됩니다</p>
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={!selectedFile}
            className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Upload className="mr-2 -ml-1 h-4 w-4" />
            업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
