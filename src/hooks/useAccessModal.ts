// src/hooks/useAccessModal.ts
import { useState } from "react";

export function useAccessModal() {
  const [openModal, setOpenModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState("");

  const reset = () => {
    setCompanyName("");
    setPurpose("");
  };

  return {
    openModal, setOpenModal,
    companyName, setCompanyName,
    purpose, setPurpose,
    reset,
  };
}
