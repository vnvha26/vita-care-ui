import { useState } from "react";
import { UploadCloud, FileText, FileSearch, CheckCircle2, Trash2, RefreshCw, MessageSquare, Send, Bot, Database, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";

const initialDocs = [
  { id: "1", name: "Lich_su_kham_Da_Lieu_2025.csv", size: "15.4 MB", status: "learned", date: "15/05/2026" },
  { id: "2", name: "Du_lieu_Tieu_hoa_Q1_2026.xlsx", size: "8.1 MB", status: "learned", date: "14/05/2026" },
  { id: "3", name: "Ho_so_benh_an_Ho_Hap.csv", size: "12.5 MB", status: "learning", date: "Vừa xong" },
];

export default function ManagerAIData() {
  const [documents, setDocuments] = useState(initialDocs);
  const [isDragging, setIsDragging] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate adding a file
    const newDoc = {
      id: Date.now().toString(),
      name: "Ho_so_kham_Tim_Mach_2025.csv",
      size: "10.2 MB",
      status: "learning",
      date: "Vừa xong"
    };
    setDocuments([newDoc, ...documents]);
    
    // Simulate learning process completion
    setTimeout(() => {
      setDocuments(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: "learned" } : d));
    }, 3000);
  };

  const removeDoc = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 pb-2">
      
      {/* Left Column: Data Management */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dữ liệu lịch sử khám bệnh</h1>
          <p className="text-gray-500 mt-1">Tải lên lịch sử ca khám thực tế để AI học hỏi cách tư vấn khách hàng</p>
        </div>

        {/* Upload Zone */}
        <div 
          className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-10 text-center ${
            isDragging 
              ? "border-blue-500 bg-blue-50/50 scale-[1.01]" 
              : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Kéo thả file dữ liệu vào đây</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6 max-w-sm">Hỗ trợ các định dạng: CSV, XLSX. Chứa thông tin triệu chứng và kết luận của bác sĩ.</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-8">
            <FileSearch className="h-4 w-4 mr-2" />
            Chọn file từ máy tính
          </Button>
        </div>

        {/* Documents List */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Tập dữ liệu AI đã huấn luyện
            </h3>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
              {documents.length} tập dữ liệu
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {documents.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FileText className="h-12 w-12 mb-3 opacity-20" />
                <p>Chưa có tài liệu nào</p>
              </div>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs font-medium text-gray-500">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {doc.status === "learning" ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Đang học...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Đã ghi nhớ
                      </span>
                    )}
                    <button 
                      onClick={() => removeDoc(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Try it out Sandbox */}
      <div className="w-[400px] shrink-0 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent h-40 pointer-events-none"></div>
        
        <div className="p-5 border-b border-gray-100 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-gray-900">Sandbox Kiểm thử</h3>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
          <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Hệ thống AI</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Xin chào! Tôi đã nạp xong các lịch sử ca khám. Hãy thử đặt câu hỏi như một khách hàng nhé.
            </p>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-[85%]">
              Dạo này tôi ăn đồ chua hay bị ợ hơi và nóng rát ở ngực, thỉnh thoảng có buồn nôn. Cho hỏi tôi bị gì vậy?
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Hệ thống AI</span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              <p>Dựa trên <span className="font-bold">482 ca khám tương tự</span> trong tập dữ liệu <span className="text-blue-600 bg-blue-50 px-1 rounded font-medium">Du_lieu_Tieu_hoa_Q1_2026.xlsx</span>, các triệu chứng của bạn rất giống với hội chứng <b>Trào ngược dạ dày thực quản (GERD)</b>.</p>
              <p>Hướng xử lý mà các bác sĩ thường tư vấn:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Tạm ngưng đồ ăn chua cay, nhiều dầu mỡ.</li>
                <li>Không nằm ngay sau khi ăn.</li>
                <li>Bạn nên đến phòng khám để nội soi dạ dày nhằm kiểm tra mức độ viêm loét nhé.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100 z-10">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Hỏi AI về tài liệu..." 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
            <button className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
