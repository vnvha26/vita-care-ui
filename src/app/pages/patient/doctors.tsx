import { useState } from "react";
import { Link } from "react-router";
import { mockDoctors, mockSpecialties, mockClinics } from "../../lib/mock-data";

export default function PatientDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialtyId === selectedSpecialty;
    const matchesClinic = !selectedClinic || doctor.clinicId === selectedClinic;
    const matchesPrice = doctor.price >= priceRange[0] && doctor.price <= priceRange[1];
    return matchesSearch && matchesSpecialty && matchesClinic && matchesPrice;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tìm kiếm bác sĩ</h1>
        <p className="text-gray-600 mt-1">
          Tìm kiếm và đặt lịch khám với hơn {mockDoctors.length}+ bác sĩ chuyên khoa
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tìm kiếm</h3>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên bác sĩ..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Chuyên khoa</h3>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả</option>
                {mockSpecialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Phòng khám</h3>
              <select
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả</option>
                {mockClinics
                  .filter((c) => c.status === "active")
                  .map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Giá khám</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()}đ</span>
                  <span>{priceRange[1].toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("");
                setSelectedClinic("");
                setPriceRange([0, 500000]);
              }}
              className="w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredDoctors.length}</span> bác sĩ
          </div>

          <div className="grid gap-4">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 mt-1">{doctor.specialtyName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {doctor.price.toLocaleString()}đ
                        </div>
                        <div className="text-sm text-gray-500">Giá khám</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span className="font-semibold">{doctor.rating}</span>
                        <span>({doctor.reviewCount} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💼</span>
                        <span>{doctor.experience} năm kinh nghiệm</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <span>📍</span>
                      <span>{doctor.clinicName}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      {doctor.available ? (
                        <>
                          <Link
                            to="/patient/book"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Đặt lịch khám
                          </Link>
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Có lịch trống
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-red-600 font-medium">✗ Hết lịch</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bác sĩ</h3>
              <p className="text-gray-600">Thử điều chỉnh bộ lọc để tìm kiếm bác sĩ phù hợp</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
