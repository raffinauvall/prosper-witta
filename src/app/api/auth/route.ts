export const runtime = "nodejs"; // wajib biar jsonwebtoken jalan

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: user } = await supabase
            .from("admin")
            .select("*")
            .eq("username", username)
            .single();

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (user.password !== password)
            return NextResponse.json({ message: "Wrong password" }, { status: 401 });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        const res = NextResponse.json({ message: "OK" });
        res.cookies.set("session_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;

    } catch (err) {
        console.log("Error Login:", err);
        return NextResponse.json({ message: "Server Error", err }, { status: 500 });
    }
}
