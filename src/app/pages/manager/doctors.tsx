import { useMemo, useState } from "react";
import { Edit3, Eye, Filter, Plus, Search, Star, Stethoscope, Users } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

type DoctorStatus = "Hoạt động" | "Ngưng hoạt động";
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  rating: number;
  status: DoctorStatus;
  phone: string;
  email: string;
  schedule: string;
};

const doctors: Doctor[] = [
  { id: "D001", name: "BS. Nguyễn Văn A", specialty: "Tim mạch", patients: 45, rating: 4.8, status: "Hoạt động", phone: "0901 111 222", email: "nva@vitacare.vn", schedule: "Thứ 2 - Thứ 6, ca sáng" },
  { id: "D002", name: "BS. Trần Văn B", specialty: "Nội tổng hợp", patients: 38, rating: 4.6, status: "Hoạt động", phone: "0902 222 333", email: "tvb@vitacare.vn", schedule: "Thứ 2 - Thứ 7, ca chiều" },
  { id: "D003", name: "BS. Lê Thị C", specialty: "Tiểu đường", patients: 52, rating: 4.9, status: "Hoạt động", phone: "0903 333 444", email: "ltc@vitacare.vn", schedule: "Thứ 3 - Thứ 6, ca sáng" },
  { id: "D004", name: "BS. Phạm Đức D", specialty: "Hô hấp", patients: 29, rating: 4.5, status: "Hoạt động", phone: "0904 444 555", email: "pdd@vitacare.vn", schedule: "Thứ 2 - Thứ 5, ca tối" },
  { id: "D005", name: "BS. Hoàng Thị E", specialty: "Thần kinh", patients: 31, rating: 4.7, status: "Ngưng hoạt động", phone: "0905 555 666", email: "hte@vitacare.vn", schedule: "Tạm nghỉ trong tuần này" },
];

export default function ManagerDoctors() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(doctors[0].id);
  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedId) ?? doctors[0];

  const filteredDoctors = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return doctors;
    return doctors.filter((doctor) => `${doctor.id} ${doctor.name} ${doctor.specialty}`.toLowerCase().includes(keyword));
  }, [query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý thông tin bác sĩ"
        description="Quản lý hồ sơ, chuyên khoa, lịch làm việc và trạng thái nhận lịch."
        actions={<ActionButton icon={<Plus className="h-4 w-4" />}>Thêm bác sĩ</ActionButton>}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng bác sĩ" value="5" tone="blue" icon={<Stethoscope className="h-5 w-5" />} />
        <StatCard label="Đang hoạt động" value="4" tone="green" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Tổng bệnh nhân" value="195" tone="violet" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Đánh giá TB" value="4.7" tone="amber" icon={<Star className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <SectionCard
          title="Danh sách bác sĩ"
          description="Thông tin chi tiết về đội ngũ bác sĩ"
          actions={
            <div className="flex flex-wrap gap-2">
              <div className="flex h-11 min-w-[260px] items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
                <Search className="h-4 w-4" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder="Tìm theo tên hoặc chuyên khoa..."
                />
              </div>
              <ActionButton variant="secondary" icon={<Filter className="h-4 w-4" />}>Lọc</ActionButton>
            </div>
          }
        >
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-[#F7FAFC] text-[#64748B]">
                <tr>
                  <th className="px-4 py-3 font-extrabold">Mã BS</th>
                  <th className="px-4 py-3 font-extrabold">Họ và tên</th>
                  <th className="px-4 py-3 font-extrabold">Chuyên khoa</th>
                  <th className="px-4 py-3 font-extrabold">Bệnh nhân</th>
                  <th className="px-4 py-3 font-extrabold">Đánh giá</th>
                  <th className="px-4 py-3 font-extrabold">Trạng thái</th>
                  <th className="px-4 py-3 text-right font-extrabold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-t border-[#E2E8F0]">
                    <td className="px-4 py-4 font-bold text-[#1E293B]">{doctor.id}</td>
                    <td className="px-4 py-4 font-extrabold text-[#1E293B]">{doctor.name}</td>
                    <td className="px-4 py-4 text-[#475569]">{doctor.specialty}</td>
                    <td className="px-4 py-4"><StatusBadge tone="blue">{doctor.patients}</StatusBadge></td>
                    <td className="px-4 py-4 font-bold text-[#1E293B]">★ {doctor.rating}</td>
                    <td className="px-4 py-4"><StatusBadge tone={doctor.status === "Hoạt động" ? "green" : "slate"}>{doctor.status}</StatusBadge></td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setSelectedId(doctor.id)} className="rounded-full p-2 text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B]" aria-label="Xem chi tiết">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-full p-2 text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B]" aria-label="Chỉnh sửa">
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Chi tiết bác sĩ">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-5">
            <p className="text-sm font-bold text-[#64748B]">{selectedDoctor.id}</p>
            <h2 className="mt-1 text-xl font-extrabold text-[#1E293B]">{selectedDoctor.name}</h2>
            <div className="mt-3"><StatusBadge tone={selectedDoctor.status === "Hoạt động" ? "green" : "slate"}>{selectedDoctor.status}</StatusBadge></div>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <Detail label="Chuyên khoa" value={selectedDoctor.specialty} />
            <Detail label="Bệnh nhân phụ trách" value={`${selectedDoctor.patients} bệnh nhân`} />
            <Detail label="Đánh giá" value={`${selectedDoctor.rating}/5`} />
            <Detail label="Điện thoại" value={selectedDoctor.phone} />
            <Detail label="Email" value={selectedDoctor.email} />
            <Detail label="Lịch làm việc" value={selectedDoctor.schedule} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 font-extrabold text-[#1E293B]">{value}</p>
    </div>
  );
}
