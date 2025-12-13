"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { login } from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      await login({
        username,
        password,
      });

      router.push("/admin"); // redirect setelah login

    } catch (err: any) {
      alert(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-md p-10"
      >
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl mb-1 font-bold">
            <span className="text-green-600">Prosper Witta Sejahtera</span>
          </h1>
          <p className="text-sm text-gray-500">Chemical Product Distributor</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
        <p className="text-gray-400 text-sm mb-6">
          Please sign in to access admin dashboard
        </p>

        {/* Username */}
        <label className="text-sm text-gray-600">Username</label>
        <div className="flex items-center gap-2 border rounded-xl px-3 py-3 mt-1 mb-4 bg-white shadow-sm">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="your username"
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Password */}
        <label className="text-sm text-gray-600">Password</label>
        <div className="flex items-center gap-2 border rounded-xl px-3 py-3 mt-1 mb-6 bg-white shadow-sm">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full outline-none text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handleLogin}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600"
          } text-white w-full py-3 rounded-xl font-semibold shadow-md text-center`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </motion.button>
      </motion.div>
    </div>
  );
}
