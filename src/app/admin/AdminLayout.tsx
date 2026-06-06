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
  Menu,
  X,
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

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminLayout({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  const pageTitle = pathname.split("/").filter(Boolean).slice(-1)[0] || "Dashboard";

  const nav = (
    <nav className="flex-1 p-2 space-y-1">
      {sidebarItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileSidebarOpen(false)}
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            {(!sidebarCollapsed || mobileSidebarOpen) && item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`relative hidden flex-col bg-gray-900 text-white transition-all duration-300 md:flex ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-16 px-4 flex items-center font-bold text-lg border-b border-gray-800">
          {!sidebarCollapsed ? "Prosper Admin" : "PA"}
        </div>

        {nav}

        <button
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside className="relative flex h-full w-72 max-w-[82vw] flex-col bg-gray-900 text-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
              <span className="font-bold">Prosper Admin</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-16 items-center justify-between gap-3 bg-white px-4 shadow-sm sm:px-6 md:h-20">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-700 md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold capitalize text-gray-700 sm:text-xl">
                {pageTitle}
              </h1>
              <span className="hidden font-mono text-xs text-gray-500 sm:block">{time} WIB</span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 shadow-sm transition hover:bg-gray-200 sm:px-3"
            >
              <span className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">
                {adminName[0].toUpperCase()}
              </span>
              <span className="hidden font-medium text-gray-700 sm:inline">{adminName}</span>
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

        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
