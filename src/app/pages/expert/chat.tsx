import { useMemo, useState } from "react";
import { Send, Search, Circle, UserRound, Stethoscope, ListChecks, Clock3, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

type ThreadTab = "users" | "doctors" | "requests";
type RequestStatus = "pending" | "in_progress" | "closed";

type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
};

type ThreadItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
};

type RequestItem = {
  id: string;
  name: string;
  source: string;
  subject: string;
  priority: "high" | "medium" | "low";
  status: RequestStatus;
  waiting: string;
  lastMessage: string;
  unread: number;
  messages: ChatMessage[];
};

const userThreads: ThreadItem[] = [
  {
    id: "u-1",
    name: "Nguyễn Văn An",
    lastMessage: "Chuyên gia ơi, em muốn hỏi về kết quả xét nghiệm.",
    time: "14:15",
    unread: 2,
    online: true,
    messages: [
      { id: "u-1-m1", senderId: "u-1", senderName: "Nguyễn Văn An", content: "Chuyên gia ơi, em muốn hỏi về kết quả xét nghiệm của em ạ.", timestamp: "14:15", isCurrentUser: false },
      { id: "u-1-m2", senderId: "expert", senderName: "Chuyên gia", content: "Tôi đã xem tóm tắt ban đầu, anh gửi thêm ảnh xét nghiệm để tôi kiểm tra nhé.", timestamp: "14:17", isCurrentUser: true },
      { id: "u-1-m3", senderId: "u-1", senderName: "Nguyễn Văn An", content: "Em đã gửi rồi ạ. Em lo chỉ số đường huyết này có nguy hiểm không.", timestamp: "14:18", isCurrentUser: false },
      { id: "u-1-m4", senderId: "expert", senderName: "Chuyên gia", content: "Tạm thời chưa có dấu hiệu nguy cấp. Tôi sẽ giải thích từng chỉ số và gợi ý theo dõi tiếp trong hôm nay.", timestamp: "14:20", isCurrentUser: true },
    ],
  },
  {
    id: "u-2",
    name: "Trần Thị Bình",
    lastMessage: "Em cảm ơn chuyên gia rất nhiều.",
    time: "11:45",
    unread: 0,
    online: false,
    messages: [
      { id: "u-2-m1", senderId: "u-2", senderName: "Trần Thị Bình", content: "Em vừa nhận được hướng dẫn theo dõi sau tư vấn.", timestamp: "11:40", isCurrentUser: false },
      { id: "u-2-m2", senderId: "expert", senderName: "Chuyên gia", content: "Chị cứ giữ lịch uống thuốc như hiện tại, nếu có triệu chứng mới thì nhắn lại ngay.", timestamp: "11:43", isCurrentUser: true },
      { id: "u-2-m3", senderId: "u-2", senderName: "Trần Thị Bình", content: "Em cảm ơn chuyên gia rất nhiều.", timestamp: "11:45", isCurrentUser: false },
    ],
  },
];

const doctorThreads: ThreadItem[] = [
  {
    id: "d-1",
    name: "BS. Nguyễn Văn A",
    lastMessage: "Em đang cần ý kiến về liều insulin.",
    time: "10:30",
    unread: 1,
    online: true,
    messages: [
      { id: "d-1-m1", senderId: "d-1", senderName: "BS. Nguyễn Văn A", content: "Chào chuyên gia, em có ca bệnh nhân tiểu đường cần tư vấn.", timestamp: "10:15", isCurrentUser: false },
      { id: "d-1-m2", senderId: "expert", senderName: "Chuyên gia", content: "Anh gửi lại hồ sơ ngắn gọn theo 3 điểm: triệu chứng, chỉ số, và thuốc đang dùng nhé.", timestamp: "10:18", isCurrentUser: true },
      { id: "d-1-m3", senderId: "d-1", senderName: "BS. Nguyễn Văn A", content: "Đã gửi file qua hệ thống ạ.", timestamp: "10:20", isCurrentUser: false },
      { id: "d-1-m4", senderId: "expert", senderName: "Chuyên gia", content: "Tôi khuyên nên tăng theo dõi đường huyết sau ăn và cân nhắc chỉnh liều insulin theo đáp ứng thực tế.", timestamp: "10:30", isCurrentUser: true },
    ],
  },
  {
    id: "d-2",
    name: "BS. Trần Văn B",
    lastMessage: "Em sẽ thử phương án này trước.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "d-2-m1", senderId: "d-2", senderName: "BS. Trần Văn B", content: "Ca này em muốn xin ý kiến thêm về hướng xử lý.", timestamp: "Yesterday", isCurrentUser: false },
      { id: "d-2-m2", senderId: "expert", senderName: "Chuyên gia", content: "Tôi sẽ xem lại xét nghiệm và phản hồi trong hôm nay.", timestamp: "Yesterday", isCurrentUser: true },
      { id: "d-2-m3", senderId: "d-2", senderName: "BS. Trần Văn B", content: "Em sẽ thử phương án này trước.", timestamp: "Yesterday", isCurrentUser: false },
    ],
  },
];

const requestItems: RequestItem[] = [
  {
    id: "r-1",
    name: "Nguyễn Văn An",
    source: "Người cần tư vấn",
    subject: "Giải thích kết quả xét nghiệm",
    priority: "high",
    status: "pending",
    waiting: "12 phút",
    lastMessage: "Em lo chỉ số đường huyết này có nguy hiểm không ạ?",
    unread: 2,
    messages: [
      { id: "r-1-m1", senderId: "r-1", senderName: "Nguyễn Văn An", content: "Em vừa nhận kết quả xét nghiệm, mong chuyên gia xem giúp.", timestamp: "14:10", isCurrentUser: false },
      { id: "r-1-m2", senderId: "expert", senderName: "Chuyên gia", content: "Tôi đã nhận yêu cầu. Anh gửi ảnh rõ hơn để tôi kiểm tra từng chỉ số.", timestamp: "14:12", isCurrentUser: true },
      { id: "r-1-m3", senderId: "r-1", senderName: "Nguyễn Văn An", content: "Em lo chỉ số đường huyết này có nguy hiểm không ạ?", timestamp: "14:15", isCurrentUser: false },
    ],
  },
  {
    id: "r-2",
    name: "Lê Minh Châu",
    source: "Người cần khám bệnh",
    subject: "Cần hướng dẫn đặt lịch tái khám",
    priority: "medium",
    status: "in_progress",
    waiting: "Đang xử lý",
    lastMessage: "Chỉ số này có nghĩa là gì ạ?",
    unread: 1,
    messages: [
      { id: "r-2-m1", senderId: "r-2", senderName: "Lê Minh Châu", content: "Em muốn được giải thích nhanh trước khi đi khám tiếp.", timestamp: "09:40", isCurrentUser: false },
      { id: "r-2-m2", senderId: "expert", senderName: "Chuyên gia", content: "Tôi đang ghép trường hợp của em vào nhóm cần xem lại hồ sơ trực tiếp.", timestamp: "09:43", isCurrentUser: true },
      { id: "r-2-m3", senderId: "r-2", senderName: "Lê Minh Châu", content: "Chỉ số này có nghĩa là gì ạ?", timestamp: "09:45", isCurrentUser: false },
    ],
  },
  {
    id: "r-3",
    name: "BS. Lê Thị C",
    source: "Bác sĩ",
    subject: "Nhờ chuyên gia rà soát phác đồ",
    priority: "low",
    status: "closed",
    waiting: "Đã đóng",
    lastMessage: "Cảm ơn chuyên gia, em đã cập nhật lại phác đồ.",
    unread: 0,
    messages: [
      { id: "r-3-m1", senderId: "r-3", senderName: "BS. Lê Thị C", content: "Em gửi bản phác đồ mới để chuyên gia xem giúp.", timestamp: "09:00", isCurrentUser: false },
      { id: "r-3-m2", senderId: "expert", senderName: "Chuyên gia", content: "Phác đồ ổn, chỉ cần thêm bước theo dõi sát hơn ở 48 giờ đầu.", timestamp: "09:10", isCurrentUser: true },
      { id: "r-3-m3", senderId: "r-3", senderName: "BS. Lê Thị C", content: "Cảm ơn chuyên gia, em đã cập nhật lại phác đồ.", timestamp: "09:30", isCurrentUser: false },
    ],
  },
];

const tabMeta = {
  users: {
    title: "Người dùng",
    description: "Trao đổi trực tiếp với người cần tư vấn và người cần khám bệnh",
    icon: UserRound,
    count: userThreads.length,
  },
  doctors: {
    title: "Bác sĩ",
    description: "Trao đổi chuyên môn và nhận ca cần hỗ trợ",
    icon: Stethoscope,
    count: doctorThreads.length,
  },
  requests: {
    title: "Yêu cầu",
    description: "Quản lý hàng chờ, gắn nhãn và xử lý yêu cầu tư vấn",
    icon: ListChecks,
    count: requestItems.filter((item) => item.status !== "closed").length,
  },
} satisfies Record<ThreadTab, { title: string; description: string; icon: typeof UserRound; count: number }>;

const requestStatusLabels: Record<RequestStatus, string> = {
  pending: "Chờ tiếp nhận",
  in_progress: "Đang xử lý",
  closed: "Đã đóng",
};

const requestStatusVariant: Record<RequestStatus, "pending" | "warning" | "completed"> = {
  pending: "pending",
  in_progress: "warning",
  closed: "completed",
};

const priorityLabels = {
  high: { text: "Cao", className: "bg-red-100 text-red-700" },
  medium: { text: "Trung bình", className: "bg-amber-100 text-amber-700" },
  low: { text: "Thấp", className: "bg-emerald-100 text-emerald-700" },
} as const;

export default function ExpertChat() {
  const [activeTab, setActiveTab] = useState<ThreadTab>("users");
  const [selectedItemId, setSelectedItemId] = useState<string>(userThreads[0].id);
  const [message, setMessage] = useState("");
  const [requestStatuses, setRequestStatuses] = useState<Record<string, RequestStatus>>(
    Object.fromEntries(requestItems.map((item) => [item.id, item.status])) as Record<string, RequestStatus>
  );
  const [messageStore, setMessageStore] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(
      [...userThreads, ...doctorThreads, ...requestItems].map((thread) => [thread.id, thread.messages])
    ) as Record<string, ChatMessage[]>
  );

  const activeItems = useMemo(() => {
    if (activeTab === "users") {
      return userThreads;
    }

    if (activeTab === "doctors") {
      return doctorThreads;
    }

    return requestItems.map((item) => ({
      ...item,
      status: requestStatuses[item.id],
    }));
  }, [activeTab, requestStatuses]);

  const selectedItem = activeItems.find((item) => item.id === selectedItemId) ?? activeItems[0];
  const currentMessages = messageStore[selectedItem?.id ?? ""] ?? [];

  const totalOpenRequests = requestItems.filter((item) => requestStatuses[item.id] !== "closed").length;
  const totalWaitingUsers = userThreads.reduce((sum, thread) => sum + thread.unread, 0);
  const totalDoctorChats = doctorThreads.reduce((sum, thread) => sum + thread.unread, 0);

  const handleSend = () => {
    if (!message.trim() || !selectedItem) {
      return;
    }

    const nextMessage: ChatMessage = {
      id: `${selectedItem.id}-m-${Date.now()}`,
      senderId: "expert",
      senderName: "Chuyên gia",
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    };

    setMessageStore((current) => ({
      ...current,
      [selectedItem.id]: [...(current[selectedItem.id] ?? []), nextMessage],
    }));
    setMessage("");
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleRequestAction = (requestId: string, nextStatus: RequestStatus) => {
    setRequestStatuses((current) => ({
      ...current,
      [requestId]: nextStatus,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-white via-emerald-50 to-teal-50 p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <ShieldAlert className="h-3.5 w-3.5" />
              Khu làm việc chuyên gia
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">Chat tư vấn online và quản lý yêu cầu</h1>
            <p className="max-w-3xl text-gray-600">
              Trao đổi với người cần tư vấn, người cần khám bệnh và bác sĩ; đồng thời xử lý hàng chờ, chuyển tuyến và đóng yêu cầu ngay trên cùng một màn hình.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
            <Card className="border-emerald-100 bg-white/90">
              <CardContent className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Yêu cầu mở</p>
                <div className="mt-2 text-2xl font-semibold text-gray-900">{totalOpenRequests}</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-white/90">
              <CardContent className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Người dùng chờ</p>
                <div className="mt-2 text-2xl font-semibold text-gray-900">{totalWaitingUsers}</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-white/90">
              <CardContent className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Trao đổi bác sĩ</p>
                <div className="mt-2 text-2xl font-semibold text-gray-900">{totalDoctorChats}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="flex min-h-[calc(100vh-260px)] flex-col overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Tìm theo tên, mã yêu cầu hoặc nội dung..." className="pl-10" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => {
            const nextTab = value as ThreadTab;
            setActiveTab(nextTab);
            const nextItems = nextTab === "users" ? userThreads : nextTab === "doctors" ? doctorThreads : requestItems;
            setSelectedItemId(nextItems[0]?.id ?? "");
          }} className="flex flex-1 flex-col">
            <div className="px-4 pt-4">
              <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-gray-100 p-1">
                <TabsTrigger value="users">Người dùng</TabsTrigger>
                <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
                <TabsTrigger value="requests">Yêu cầu</TabsTrigger>
              </TabsList>
            </div>

            {(["users", "doctors", "requests"] as ThreadTab[]).map((tab) => {
              const meta = tabMeta[tab];
              const Icon = meta.icon;

              return (
                <TabsContent key={tab} value={tab} className="mt-0 flex-1 overflow-y-auto">
                  <div className="px-4 pb-2 pt-4">
                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                      <div>
                        <p className="flex items-center gap-2 font-medium text-gray-900">
                          <Icon className="h-4 w-4 text-emerald-600" />
                          {meta.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{meta.description}</p>
                      </div>
                      <Badge variant="secondary">{meta.count}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 px-2 pb-4">
                    {tab !== "requests" &&
                      (activeItems as ThreadItem[]).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectItem(item.id)}
                          className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                            selectedItem?.id === item.id ? "border-emerald-300 bg-emerald-50" : "border-transparent"
                          }`}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {item.online && <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="truncate font-medium text-gray-900">{item.name}</p>
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">{item.lastMessage}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.online ? "Online" : "Offline"}</span>
                              <span>•</span>
                              <span>{item.unread} chưa đọc</span>
                            </div>
                          </div>
                          {item.unread > 0 && (
                            <Badge variant="default" className="ml-auto h-5 min-w-5 rounded-full px-1 text-xs">
                              {item.unread}
                            </Badge>
                          )}
                        </button>
                      ))}

                    {tab === "requests" &&
                      (activeItems as (RequestItem & { status: RequestStatus })[]).map((item) => {
                        const priority = priorityLabels[item.priority] ?? priorityLabels.medium;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectItem(item.id)}
                            className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                              selectedItem?.id === item.id ? "border-emerald-300 bg-emerald-50" : "border-transparent"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-emerald-100 text-emerald-700">{item.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="truncate font-medium text-gray-900">{item.name}</p>
                                  <span className="text-xs text-gray-500">{item.waiting}</span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.subject}</p>
                                <p className="mt-1 truncate text-sm text-gray-600">{item.lastMessage}</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  <Badge variant={requestStatusVariant[item.status]}>{requestStatusLabels[item.status]}</Badge>
                                  <Badge variant="outline" className={priority.className}>
                                    {priority.text}
                                  </Badge>
                                  <Badge variant="secondary">{item.source}</Badge>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Card>

        <Card className="flex min-h-[calc(100vh-260px)] flex-col overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">{selectedItem?.name?.charAt(0) ?? "C"}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedItem?.name ?? "Chưa chọn cuộc trò chuyện"}</h2>
                    {selectedItem && "online" in selectedItem && selectedItem.online && (
                      <Badge variant="active">Đang online</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === "requests"
                      ? "Xử lý yêu cầu tư vấn, cập nhật trạng thái và theo dõi tiến độ ngay trong khung chat."
                      : activeTab === "doctors"
                        ? "Trao đổi chuyên môn với bác sĩ và phản hồi nhanh các ca cần hỗ trợ."
                        : "Tư vấn trực tiếp cho người cần khám bệnh và người cần tư vấn."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeTab === "requests" && selectedItem && "status" in selectedItem && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleRequestAction(selectedItem.id, "in_progress")}>Tiếp nhận</Button>
                    <Button variant="outline" size="sm" onClick={() => handleRequestAction(selectedItem.id, "closed")}>Đóng yêu cầu</Button>
                  </>
                )}
                <Button variant="outline" size="sm">Xem hồ sơ</Button>
              </div>
            </div>

            {activeTab === "requests" && selectedItem && "status" in selectedItem && (
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Mã yêu cầu</p>
                  <p className="mt-1 font-semibold text-gray-900">{selectedItem.id.toUpperCase()}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Trạng thái hiện tại</p>
                  <p className="mt-1 font-semibold text-gray-900">{requestStatusLabels[selectedItem.status]}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Nguồn gửi</p>
                  <p className="mt-1 font-semibold text-gray-900">{selectedItem.source}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <div className="space-y-4">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] gap-2 ${msg.isCurrentUser ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{msg.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${msg.isCurrentUser ? "bg-emerald-600 text-white" : "border border-gray-200 bg-white text-gray-900"}`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      <p className="mt-1 px-2 text-xs text-gray-400">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            {activeTab === "requests" && selectedItem && "status" in selectedItem && (
              <div className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <Clock3 className="h-4 w-4" />
                Yêu cầu đang ở trạng thái {requestStatusLabels[selectedItem.status].toLowerCase()}, có thể trả lời trực tiếp hoặc đóng yêu cầu sau khi hoàn tất.
              </div>
            )}

            <div className="flex gap-2">
              <Input
                placeholder={
                  activeTab === "requests"
                    ? "Nhập phản hồi, hướng dẫn hoặc ghi chú xử lý..."
                    : activeTab === "doctors"
                      ? "Nhập trao đổi chuyên môn với bác sĩ..."
                      : "Nhập nội dung tư vấn cho người dùng..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
