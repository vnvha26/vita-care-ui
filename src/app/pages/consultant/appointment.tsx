import { useState } from "react";
import { Link } from "react-router";
import { CalendarCheck, MapPin, Monitor, Stethoscope } from "lucide-react";

const suggestions = [
  {
    id: "1",
    name: "BS. Trần Minh",
    description: "Nội tổng quát · Phù hợp với đau đầu, mệt mỏi · Có lịch hôm nay",
    tag: "Gợi ý",
    icon: Stethoscope,
  },
  {
    id: "2",
    name: "Phòng khám Đa khoa An Tâm",
    description: "Cách 2.5 km · Khám ngoài giờ · Đánh giá tốt",
    tag: "Gần bạn",
    icon: MapPin,
  },
  {
    id: "3",
    name: "BS. Lê An",
    description: "Tư vấn sức khỏe từ xa · Có lịch trực tuyến",
    tag: "Online",
    icon: Monitor,
  },
];

const timeSlots = ["08:30", "10:00", "14:00", "15:30", "17:00", "19:00"];

export default function ConsultantAppointment() {
  const [selectedSuggestion, setSelectedSuggestion] = useState(suggestions[0].id);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const selected = suggestions.find((item) => item.id === selectedSuggestion) ?? suggestions[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Đặt lịch khám</h1>
        <p className="mt-1 text-gray-600">
          Gợi ý cơ sở y tế hoặc bác sĩ dựa trên phiên tư vấn gần nhất.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Gợi ý cơ sở y tế / bác sĩ phù hợp
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Dựa trên kết quả đánh giá nguy cơ và triệu chứng người dùng đã cung cấp.
          </p>

          <div className="mt-6 space-y-4">
            {suggestions.map((item) => {
              const Icon = item.icon;
              const isActive = selectedSuggestion === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSuggestion(item.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{item.description}</p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                    {item.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Xác nhận lịch hẹn</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Chọn thời gian phù hợp để đặt lịch tư vấn hoặc khám trực tiếp.
          </p>

          <div className="mt-5 rounded-xl border border-gray-200 bg-slate-50 p-4">
            <h3 className="font-bold text-gray-900">Thông tin tư vấn gần nhất</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Đau đầu, buồn nôn, mệt mỏi. Nguy cơ trung bình. Nên theo dõi và đi khám nếu kéo dài.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 bg-slate-50 p-4">
            <h3 className="font-bold text-gray-900">Lựa chọn hiện tại</h3>
            <p className="mt-2 text-sm text-gray-600">{selected.name}</p>
          </div>

          <div className="mt-5">
            <h3 className="font-bold text-gray-900">Chọn thời gian</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                    selectedTime === time
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert("Đặt lịch thành công!")}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"
          >
            Xác nhận đặt lịch
          </button>

          <Link
            to="/consultant/consultation"
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Quay lại chatbot
          </Link>
        </aside>
      </div>
    </div>
  );
}