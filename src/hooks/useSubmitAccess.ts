// src/hooks/useSubmitAccess.ts
import { useProductActions } from "@/src/lib/products/productsActions";

export const useSubmitAccess = () => {
  const { handleSubmitAccess } = useProductActions();

  const submit = async (company: string, purpose: string, cb: () => void) => {
    await handleSubmitAccess(company, purpose, cb);
  };

  return { submit };
};
