import { supabaseAdmin } from "@/src/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { supabaseClient } from "@/src/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            product_id,
            full_name,
            company_name,
            email,
            phone,
            shipping_address,
            purpose,
        } = body;


        if (!product_id || !full_name || !company_name || !email || !phone) {
            return NextResponse.json(
                {
                    message:
                        "Product, full name, company name, email, and phone are required",
                },
                { status: 400 }
            );
        }

        const { error } = await supabaseClient
            .from("request_sample")
            .insert([
                {
                    product_id,
                    full_name,
                    company_name,
                    email,
                    phone,
                    shipping_address,
                    purpose,
                },
            ]);

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { message: "Request sample berhasil dikirim" },
            { status: 201 }
        );

    } catch (err) {
        console.error("POST error:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
