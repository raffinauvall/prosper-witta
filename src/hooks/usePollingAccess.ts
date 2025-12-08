import { useProductStore } from "../store/productStore";
import { useEffect } from "react";

export function usePollingAccess(id?: number) {
  const { pollAccess } = useProductStore();

  useEffect(() => {
    if (!id) return;
    const interval = setInterval(() => pollAccess(id), 5000);
    return () => clearInterval(interval);
  }, [id]);
}
