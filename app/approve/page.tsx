
import { Suspense } from "react";
import ApprovePageClient from "./ApprovePageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApprovePageClient />
    </Suspense>
  );
}
