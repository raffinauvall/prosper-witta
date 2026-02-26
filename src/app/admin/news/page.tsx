"use client";

import { useEffect, useState } from "react";
import { getNews, createNews, updateNews, deleteNews } from "@/lib/api/admin/news";
import { News, NewsFormData } from "@/lib/types";

import Modal from "@/components/admin/news/Modals";
import NewsForm from "@/components/admin/news/NewsForms";
import NewsTable from "@/components/admin/news/NewsTable";
import DeleteConfirm from "@/components/admin/news/DeleteConfirmation";

const EMPTY_FORM: NewsFormData = {
    title: "",
    slug: "",
    excerpt: {
        id: "",
        en: "",
    },
    content: {
        id: "",
        en: "",
    },
    thumbnail_url: "",
    is_published: false,
    published_at: "",
};

export default function AdminNewsPage() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<NewsFormData>(EMPTY_FORM);
    const [selected, setSelected] = useState<News | null>(null);
    const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);

    const load = async () => {
        setLoading(true);
        const data = await getNews();
        setNews(data);
        setLoading(false);
    };
    useEffect(() => {
        if (modal === "create") {
            setForm(EMPTY_FORM);
        }
    }, [modal]);

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">News</h1>
                <button
                    onClick={() => {
                        setForm(EMPTY_FORM);
                        setSelected(null);
                        setModal("create");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    + Create
                </button>
            </div>

            <div className="bg-white rounded-xl shadow">
                {loading ? (
                    <div className="p-6 text-gray-500">Loading...</div>
                ) : (
                    <NewsTable
                        data={news}
                        onEdit={(n) => {
                            setSelected(n);
                            setForm({
                                title: n.title,
                                slug: n.slug || "",
                                excerpt: {
                                    id: n.excerpt?.id ?? "",
                                    en: n.excerpt?.en ?? "",
                                },

                                content: {
                                    id: n.content?.id ?? "",
                                    en: n.content?.en ?? "",
                                },
                                thumbnail_url: n.thumbnail_url || "",
                                is_published: n.is_published ?? false,
                                published_at: n.published_at
                                    ? new Date(n.published_at).toISOString().slice(0, 16)
                                    : undefined,
                            });
                            setModal("edit");
                        }}
                        onDelete={(n) => {
                            setSelected(n);
                            setModal("delete");
                        }}
                    />
                )}
            </div>

            {/* CREATE */}
            {modal === "create" && (
                <Modal title="Create News" onClose={() => setModal(null)}>
                    <NewsForm
                        form={form}
                        setForm={setForm}
                        submitText="Create"
                        onSubmit={async () => {
                            await createNews({
                                ...form,
                                published_at: form.published_at
                                    ? new Date(form.published_at).toISOString()
                                    : undefined,
                            });
                            setModal(null);
                            load();
                        }}
                    />
                </Modal>
            )}

            {/* EDIT */}
            {modal === "edit" && selected && (
                <Modal title="Edit News" onClose={() => setModal(null)}>
                    <NewsForm
                        form={form}
                        setForm={setForm}
                        submitText="Update"
                        onSubmit={async () => {
                            await updateNews(selected.id, {
                                ...form,
                                published_at: form.published_at
                                    ? new Date(form.published_at).toISOString()
                                    : undefined,
                            });
                            setModal(null);
                            setSelected(null);
                            load();
                        }}
                    />
                </Modal>
            )}

            {/* DELETE */}
            {modal === "delete" && selected && (
                <Modal title="Delete News" onClose={() => setModal(null)}>
                    <DeleteConfirm
                        title={selected.title}
                        onCancel={() => setModal(null)}
                        onConfirm={async () => {
                            await deleteNews(selected.id);
                            setModal(null);
                            setSelected(null);
                            load();
                        }}
                    />
                </Modal>
            )}
        </div>
    );
}
