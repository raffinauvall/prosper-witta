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

export default function NewsForm({
  form,
  setForm,
  onSubmit,
  submitText,
}: Props) {
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

  const removeImage = () => {
    setForm({ ...form, thumbnail_url: undefined });
  };

  const isDisabled = uploading || !form.title?.trim();

  return (
    <div className="flex flex-col gap-6 pb-24">

      {/* BASIC INFO */}
      <div className="grid gap-4">
        <Input
          label="Title *"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
        />

        <Input
          label="Slug"
          value={form.slug || ""}
          onChange={(v) => setForm({ ...form, slug: v })}
        />

        <Textarea
          label="Excerpt"
          value={form.excerpt || ""}
          onChange={(v) => setForm({ ...form, excerpt: v })}
        />

        <Textarea
          label="Content"
          rows={8}
          value={form.content || ""}
          onChange={(v) => setForm({ ...form, content: v })}
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Thumbnail Image</label>

        <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-500 transition">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
            className="hidden"
            id="thumbnailUpload"
          />

          <label
            htmlFor="thumbnailUpload"
            className="cursor-pointer text-sm text-gray-600"
          >
            {uploading ? (
              "Uploading..."
            ) : (
              "Click to upload or replace image"
            )}
          </label>
        </div>

        {form.thumbnail_url && (
          <div className="relative">
            <img
              src={form.thumbnail_url}
              className="h-48 w-full rounded-xl border object-cover shadow-sm"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full hover:bg-black"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* META */}
      <div className="grid gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) =>
              setForm({ ...form, is_published: e.target.checked })
            }
            className="h-4 w-4"
          />
          <span className="text-sm font-medium">Published</span>
        </div>

        <Input
          label="Published At"
          type="datetime-local"
          value={form.published_at || ""}
          onChange={(v) =>
            setForm({ ...form, published_at: v })
          }
        />
      </div>

      {/* STICKY FOOTER */}
      <div className="sticky bottom-0 bg-white border-t pt-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isDisabled}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium 
    hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : submitText}
        </button>
      </div>

    </div>
  );
}
