import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bot, HeartPulse, ShieldCheck, ClipboardList } from "lucide-react";

export default function ConsultantLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/consultant/consultation");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[1fr_430px]">
        <section className="flex flex-col justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-8 py-12 lg:px-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nhóm 4</h1>
              <p className="text-sm text-gray-500">Chatbot tư vấn sức khỏe ban đầu</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold leading-tight text-gray-900">
              Tư vấn sức khỏe nhanh, dễ hiểu và đáng tin cậy
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              Nhập triệu chứng, trả lời câu hỏi bổ sung và nhận đánh giá nguy cơ ban đầu.
              Chatbot hỗ trợ người dùng theo dõi sức khỏe nhưng không thay thế bác sĩ.
            </p>
          </div>

          <div className="mt-8 grid max-w-xl gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <HeartPulse className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-gray-800">Hỏi thêm thông tin khi triệu chứng chưa đủ</span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-gray-800">Đánh giá nguy cơ thấp, trung bình hoặc cao</span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <ClipboardList className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-800">Lưu lịch sử tư vấn để theo dõi sức khỏe</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
            <p className="mt-2 text-sm text-gray-500">
              Tiếp tục với vai trò người cần tư vấn sức khỏe.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700">Email hoặc số điện thoại</label>
                <input
                  value={formData.account}
                  onChange={(event) => setFormData({ ...formData, account: event.target.value })}
                  placeholder="Nhập email hoặc số điện thoại"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Mật khẩu</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  placeholder="Nhập mật khẩu"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Đăng nhập
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 font-bold text-gray-700 hover:bg-gray-50"
              >
                Tạo tài khoản mới
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">
                Quên mật khẩu?
              </a>
            </div>

            <Link
              to="/"
              className="mt-6 block text-center text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              Quay lại chọn vai trò
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}