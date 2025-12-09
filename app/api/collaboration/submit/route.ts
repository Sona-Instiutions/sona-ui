import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("🔵 [API] Received form submission");

    const body = await req.json();
    console.log("🟡 [API] FormData:", body);

    const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

    console.log("🟣 STRAPI URL:", STRAPI_URL);
    console.log("🟣 TOKEN exists:", STRAPI_TOKEN ? "YES" : "NO");

    try {
        const response = await fetch(`${STRAPI_URL}/api/industry-collaboration-leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
            body: JSON.stringify({
                data: body,
            }),
        });


        const result = await response.json();
        console.log("🔴 [API] Strapi response RAW:", result);

        if (!response.ok) {
            console.error("❌ [API] Strapi ERROR:", result);
            return NextResponse.json(
                { success: false, error: result },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        console.error("❌ [API] Server ERROR:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
