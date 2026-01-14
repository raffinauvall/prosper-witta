"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState("");
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ⏰ Jam WIB
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const handleLogout = async () => {
  await fetch("/api/logout", { method: "POST" });
  router.push("/login");
};


  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white hidden md:block">
        <div className="h-16 px-6 flex items-center font-bold border-b border-gray-800">
          🚀 Admin Panel
        </div>
        <nav className="p-4 space-y-1">
          <SidebarLink href="/admin" active={pathname === "/admin"}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/admin/products" active={pathname.startsWith("/admin/products")}>
            Products
          </SidebarLink>
          <SidebarLink href="/admin/request-sample" active={pathname.startsWith("/admin/request-sample")}>
            Request Sample
          </SidebarLink>
          <SidebarLink href="/admin/request-access" active={pathname.startsWith("/admin/request-access")}>
            Request Access
          </SidebarLink>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 bg-white border-b px-6 flex justify-between items-center">
          <div className="font-mono text-sm">{time} WIB</div>

          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-1 text-sm"
            >
              {adminName}
              <span>▼</span>
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded text-sm ${
        active
          ? "bg-gray-800 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
