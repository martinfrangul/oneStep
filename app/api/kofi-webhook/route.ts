import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const payloadStr = data.get("data");

    if (!payloadStr || typeof payloadStr !== "string") {
      return NextResponse.json({ error: "No data payload" }, { status: 400 });
    }

    const payload = JSON.parse(payloadStr);

    // Verify token
    const verificationToken = process.env.VITE_KOFI_WEBHOOK_TOKEN;
    if (payload.verification_token !== verificationToken) {
      console.error("Invalid Ko-fi webhook token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Process the webhook (Ko-fi already sends emails, so we just acknowledge it)
    console.log(`Received Ko-fi webhook: ${payload.type} from ${payload.from_name}`);
    console.dir(payload, { depth: null });

    // Must return 200 OK so Ko-fi knows we received it
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Ko-fi webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
