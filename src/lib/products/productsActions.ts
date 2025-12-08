import { useProductStore } from "@/src/store/productStore";

export const useProductActions = () => {
  const { requestAccessSubmit } = useProductStore();

  const handleSubmitAccess = async (
    company: string,
    purpose: string,
    onSuccess?: () => void
  ) => {
    const success = await requestAccessSubmit(company, purpose);
    if (success && onSuccess) onSuccess();
    return success;
  };

  return { handleSubmitAccess };
};
