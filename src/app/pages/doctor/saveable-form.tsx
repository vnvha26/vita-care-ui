import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Save } from "lucide-react";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Tone = "blue" | "green" | "amber" | "rose" | "violet" | "slate";

type SideRow = {
  title: string;
  description: string;
  badge?: string;
  tone?: Tone;
};

type SaveableFormProps = {
  storageKey: string;
  title: string;
  description: string;
  fields: string[];
  initialValues?: Record<string, string>;
  notePlaceholder?: string;
  sideTitle: string;
  sideRows: SideRow[];
};

export function SaveableForm({
  storageKey,
  title,
  description,
  fields,
  initialValues = {},
  notePlaceholder = "Ghi chú",
  sideTitle,
  sideRows,
}: SaveableFormProps) {
  const fieldDefaults = useMemo(
    () =>
      fields.reduce<Record<string, string>>((result, field) => {
        result[field] = initialValues[field] ?? "";
        return result;
      }, {}),
    [fields, initialValues]
  );
  const [values, setValues] = useState(fieldDefaults);
  const [note, setNote] = useState(initialValues[notePlaceholder] ?? "");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { values?: Record<string, string>; note?: string; savedAt?: string };
      setValues({ ...fieldDefaults, ...(parsed.values ?? {}) });
      setNote(parsed.note ?? "");
      setSavedAt(parsed.savedAt ?? null);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [fieldDefaults, storageKey]);

  const handleSave = () => {
    const nextSavedAt = new Date().toLocaleString("vi-VN");
    window.localStorage.setItem(storageKey, JSON.stringify({ values, note, savedAt: nextSavedAt }));
    setSavedAt(nextSavedAt);
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <ActionButton icon={<Save className="h-4 w-4" />} onClick={handleSave}>
            Lưu thay đổi
          </ActionButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <SectionCard
          title="Biểu mẫu"
          description={savedAt ? `Đã lưu lúc ${savedAt}` : "Dữ liệu sẽ được lưu lại sau khi bấm nút lưu."}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-extrabold text-[#1E293B]">{field}</span>
                <input
                  value={values[field] ?? ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                  className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </label>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="mt-4 min-h-32 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
            placeholder={notePlaceholder}
          />

          {savedAt && (
            <div className="mt-4 rounded-2xl border border-[#BEF4E7] bg-[#E8FFF9] px-4 py-3 text-sm font-bold text-[#148E77]">
              Đã lưu thành công. Reload trang vẫn giữ lại nội dung vừa nhập.
            </div>
          )}
        </SectionCard>

        <SectionCard title={sideTitle}>
          <div className="space-y-3">
            {sideRows.map((row) => (
              <DataRow
                key={row.title}
                title={row.title}
                description={row.description}
                icon={<CheckCircle2 className="h-5 w-5" />}
                meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
