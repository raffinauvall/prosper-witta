"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Grid,
  Package,
  Mail,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { href: "/admin", label: "Dashboard", icon: <Grid className="w-5 h-5" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="w-5 h-5" /> },
  { href: "/admin/request-sample", label: "Request Sample", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/request-access", label: "Request Access", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/news", label: "News", icon: <FileText className="w-5 h-5" /> },
  { href: "/admin/contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
];

export default function AdminLayout({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [time, setTime] = useState("");
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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
      <aside
        className={`bg-gray-900 text-white flex flex-col relative transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-16 px-4 flex items-center font-bold text-lg border-b border-gray-800">
          {!sidebarCollapsed ? "🚀 Admin Panel" : "🚀"}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  active
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 ">
          <span className="font-mono text-sm text-gray-500">{time} WIB</span>

          <h1 className="text-xl font-bold text-gray-700 capitalize">
            {pathname.split("/").filter(Boolean).slice(-1)[0] || "Dashboard"}
          </h1>

          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition shadow-sm"
            >
              <span className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">
                {adminName[0].toUpperCase()}
              </span>
              <span className="text-gray-700 font-medium">{adminName}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
