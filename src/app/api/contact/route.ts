import { NextResponse } from "next/server";

const required = ["first", "last", "email", "company", "job", "message"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  for (const k of required) {
    if (typeof body[k] !== "string" || !(body[k] as string).trim()) return NextResponse.json({ ok: false, field: k }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string)) return NextResponse.json({ ok: false, field: "email" }, { status: 422 });
  // TODO: send via your provider (Resend, SendGrid, SES) or push to your CRM.
  console.log("New contact request:", body);
  return NextResponse.json({ ok: true });
}
