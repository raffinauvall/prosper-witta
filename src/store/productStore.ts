import { create } from "zustand";
import { fetchProducts } from "@/src/lib/api/products";
import { requestAccess, checkAccess } from "@/src/lib/api/access";

interface ProductState {
  products: any[];
  selected: any | null;
  accessMap: Record<number, boolean>;
  showNotif: boolean;

  loading: boolean;
  error: string | null;

  loadProducts: (category: string) => Promise<void>;
  setSelected: (id: number) => void;
  pollAccess: (id: number) => Promise<void>;
  triggerNotif: () => void;

  requestAccessSubmit: (company: string, purpose: string) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selected: null,
  accessMap: {},
  showNotif: false,

  loading: false,
  error: null,

  // store
loadProducts: async (category: string) => {
  try {
    set({ loading: true, error: null });

    const data = await fetchProducts(category); // kategori sekarang dinamis

    set({
      products: data,
      selected: data[0] ?? null,
      loading: false,
    });
  } catch (err: any) {
    set({
      loading: false,
      error: err?.message ?? "Failed to fetch products",
    });
  }
},


  setSelected: (id) => {
    const prod = get().products.find((p) => p.id === id) ?? null;
    set({ selected: prod });
  },

  pollAccess: async (id: number) => {
    try {
      const { accessMap, triggerNotif } = get();
      const prev = accessMap[id] ?? false;

      const result = await checkAccess(id);

      set({ accessMap: { ...accessMap, [id]: result } });

      if (!prev && result) triggerNotif();
    } catch (err) {
      console.error("pollAccess error:", err);
    }
  },

  triggerNotif: () => {
    set({ showNotif: true });
    setTimeout(() => set({ showNotif: false }), 2000);
  },

  requestAccessSubmit: async (company, purpose) => {
    const selected = get().selected;
    if (!selected) return false;

    try {
      await requestAccess(selected.id, company, purpose);
      return true;
    } catch (err) {
      console.error("Request access error:", err);
      return false;
    }
  },
}));
