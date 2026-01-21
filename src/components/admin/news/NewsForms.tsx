import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import { uploadNewsImage } from "@/lib/api/admin/news";
import { NewsFormData } from "@/lib/types";
import { useState } from "react";

interface Props {
  form: NewsFormData;
  setForm: (v: NewsFormData) => void;
  onSubmit: () => void;
  submitText: string;
}

export default function NewsForm({ form, setForm, onSubmit, submitText }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (file?: File) => {
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadNewsImage(file);
      setForm({ ...form, thumbnail_url: url });
    } catch {
      alert("Upload image failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />

      <Input label="Slug" value={form.slug || ""} onChange={(v) => setForm({ ...form, slug: v })} />

      <Textarea label="Excerpt" value={form.excerpt || ""} onChange={(v) => setForm({ ...form, excerpt: v })} />

      <Textarea label="Content" rows={6} value={form.content || ""} onChange={(v) => setForm({ ...form, content: v })} />

      {/* IMAGE UPLOAD */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Thumbnail Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
          className="block w-full text-sm"
        />

        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}

        {form.thumbnail_url && (
          <img
            src={form.thumbnail_url}
            className="h-40 w-full rounded border object-cover"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
        />
        <span>Published</span>
      </div>

      <Input
        label="Published At"
        type="datetime-local"
        value={form.published_at || ""}
        onChange={(v) => setForm({ ...form, published_at: v })}
      />

      {/* STICKY FOOTER */}
      <div className="sticky bottom-0 bg-white pt-4 border-t flex justify-end">
        <button
          onClick={onSubmit}
          disabled={uploading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}
