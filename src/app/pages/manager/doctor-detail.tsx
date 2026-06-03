import { ListPage } from "../shared/standard-pages";

export default function DoctorDetail() {
  return (
    <ListPage
      title="Chi ti?t b�c si"
      description="Xem th�ng tin chuy�n m�n, l?ch l�m vi?c v� hi?u su?t ti?p nh?n b?nh nh�n."
      rows={[
        { title: "Th�ng tin chuy�n m�n", description: "Tim m?ch � 15 nam kinh nghi?m � 4.8/5 d�nh gi�", badge: "�� duy?t", tone: "green" },
        { title: "L?ch h�m nay", description: "8 l?ch h?n, 2 l?ch t�i kh�m, 1 l?ch online.", badge: "B?n", tone: "amber" },
        { title: "Hi?u su?t", description: "T? l? ho�n t?t h? so sau kh�m d?t 92%.", badge: "T?t", tone: "green" },
      ]}
    />
  );
}
