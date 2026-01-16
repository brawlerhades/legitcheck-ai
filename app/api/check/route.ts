import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const images: string[] = body.images || [];
    const mode: "quick" | "deep" = body.mode || "quick";
    const model: string = body.model || "Unknown sneaker";

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY in environment variables" },
        { status: 500 }
      );
    }

    if (!images.length) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `
You are a professional sneaker authenticator.
You MUST be honest: if photos are not enough, say "Uncertain".

Return ONLY valid JSON with this exact format:
{
  "verdict": "Authentic" | "Fake" | "Uncertain",
  "confidence": number,
  "reasons": string[],
  "redFlags": string[],
  "modelGuess": string,
  "barcodeOrSku": string | null
}
Rules:
- confidence is 0-100
- if mode is "quick", be more conservative
- if mode is "deep", use all photos including box label / inside tag if present
- never guarantee authenticity
`;

    const userPrompt = `
Mode: ${mode}
User selected model: ${model}

Analyze these images and give an authenticity assessment.
If you can read SKU / barcode text, include it in "barcodeOrSku".
`;

    const content: any[] = [{ type: "text", text: userPrompt }];

    for (const img of images) {
      content.push({
        type: "image_url",
        image_url: { url: img },
      });
    }

    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content },
      ],
    });

    const raw = resp.choices?.[0]?.message?.content || "";

    let parsed: any = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "AI returned non-JSON output", raw },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
