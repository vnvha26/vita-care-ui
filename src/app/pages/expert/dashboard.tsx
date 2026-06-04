import { Link } from "react-router";
import { Activity, ArrowRight, Bot, CheckCircle2, Clock, Flag, MessageSquareWarning, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { DataRow, SectionCard, StatusBadge } from "../../components/layout/role-page";

const reviewQueue = [
  { id: "CASE-001", patient: "Nguyễn Minh Anh", symptoms: "Sốt cao, đau họng", priority: "Cao", tone: "rose", rating: "2 sao" },
  { id: "CASE-002", patient: "Trần Thu Hà", symptoms: "Đau bụng âm ỉ, buồn nôn", priority: "Trung bình", tone: "amber", rating: "3 sao" },
  { id: "CASE-003", patient: "Lê Quốc Bảo", symptoms: "Đau đầu, chóng mặt", priority: "Thấp", tone: "slate", rating: "4 sao" },
];

const stats = [
  { value: "12", label: "Chờ đánh giá", icon: <MessageSquareWarning className="h-5 w-5" />, tone: "amber" },
  { value: "48", label: "Đã hoàn thành tháng", icon: <CheckCircle2 className="h-5 w-5" />, tone: "green" },
  { value: "4.2", label: "điểm AI TB", icon: <TrendingUp className="h-5 w-5" />, tone: "blue" },
];

const recentActivity = [
  { text: "CASE-001 được duyệt · chuyển sang đang xử lý", time: "08:40" },
  { text: "Thêm tài liệu y khoa mới", time: "08:15" },
  { text: "CONV-001 gắn cờ · phản hồi 2 sao", time: "Hôm qua" },
];

const navLinks = [
  { to: "/expert/cases", label: "Ca đánh giá", icon: <Flag className="h-4 w-4" /> },
  { to: "/expert/chat", label: "Chat & yêu cầu", icon: <Activity className="h-4 w-4" /> },
  { to: "/expert/conversations", label: "Quản lý hội thoại", icon: <MessageSquareWarning className="h-4 w-4" /> },
  { to: "/expert/knowledge", label: "Quản lý tri thức", icon: <Bot className="h-4 w-4" /> },
];

export default function ExpertDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E293B]">Chào Nguyễn Văn D</h1>
          <p className="mt-1 text-sm text-[#64748B]">Trung tâm kiểm soát chất lượng AI y tế</p>
        </div>
        <Link
          to="/expert/cases"
          className="inline-flex items-center gap-2 rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1C64D1]"
        >
          Ca đánh giá
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Stats - just 3 key numbers */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">{s.icon}{s.label}</div>
            <div className="mt-2 text-2xl font-extrabold text-[#1E293B]">{s.value}</div>
          </div>
        ))}
      </section>

      {/* Main content - 2 columns */}
      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* Left: Review Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#1E293B]">Ca cần kiểm duyệt</h2>
            <Link to="/expert/cases" className="text-xs font-bold text-[#2F80ED] hover:underline">Xem tất cả →</Link>
          </div>
          <div className="space-y-3">
            {reviewQueue.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-[18px] border border-[#E2E8F0] bg-white p-4 transition hover:bg-[#F2F7FB]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#2F80ED]">
                  <Flag className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1E293B]">{item.id}</span>
                    <span className="text-sm text-[#64748B]">· {item.patient}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#94A3B8] truncate">{item.symptoms} · AI {item.rating}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge tone={item.tone}>{item.priority}</StatusBadge>
                  <Link
                    to="/expert/cases/case-001"
                    className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-xs font-bold text-[#1E293B] hover:bg-[#F2F7FB]"
                  >
                    Duyệt
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-3 text-lg font-extrabold text-[#1E293B]">Hoạt động gần đây</h2>
            <div className="space-y-2">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm">
                  <span className="text-[#1E293B] font-medium">{a.text}</span>
                  <StatusBadge tone="slate">{a.time}</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick nav + AI quality */}
        <div className="space-y-4">
          <SectionCard title="Điều hướng nhanh">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-bold text-[#1E293B] hover:bg-[#F2F7FB] transition">
                  <span className="text-[#2F80ED]">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Chất lượng AI tháng 6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Điểm TB phản hồi</span>
                <span className="font-extrabold text-[#1E293B]">4.2 / 5.0</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "5★", pct: "68%", color: "bg-[#27C3A2]" },
                  { label: "4★", pct: "20%", color: "bg-[#2F80ED]" },
                  { label: "3★", pct: "8%", color: "bg-[#F59E0B]" },
                  { label: "2★", pct: "3%", color: "bg-[#EF4444]" },
                  { label: "1★", pct: "1%", color: "bg-[#DC2626]" },
                ].map((star) => (
                  <div key={star.label} className="flex items-center gap-3">
                    <span className="w-6 text-xs font-bold text-[#64748B]">{star.label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F2F7FB]">
                      <div className={`h-full ${star.color} rounded-full`} style={{ width: star.pct }} />
                    </div>
                    <span className="w-8 text-xs font-semibold text-[#64748B] text-right">{star.pct}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-[#E8FFF9] p-3 text-xs font-medium text-[#148E77]">
                ✓ Tỷ lệ phản hồi đạt chuẩn: <strong>96.8%</strong>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}