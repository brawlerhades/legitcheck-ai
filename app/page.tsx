"use client";

import { useState } from "react";
import AdSlot from "@/components/AdSlot";

type Result = {
  verdict: "Authentic" | "Fake" | "Uncertain";
  confidence: number;
  reasons: string[];
  redFlags: string[];
  modelGuess: string;
  barcodeOrSku: string | null;
};

export default function Home() {
  const [mode, setMode] = useState<"quick" | "deep">("quick");
  const [model, setModel] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onCheck() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      if (files.length === 0) {
        setError("Upload at least 1 photo.");
        setLoading(false);
        return;
      }

      const images: string[] = [];
      for (const f of files) {
        images.push(await fileToBase64(f));
      }

      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images, mode, model }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Request failed");
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-7xl w-full flex items-start justify-center gap-6">
        {/* LEFT AD */}
        <div className="hidden lg:block w-[300px] sticky top-6">
          <AdSlot label="Ad (Left)" />
        </div>

        {/* CENTER */}
        <div className="w-full max-w-xl border border-white/10 rounded-2xl p-6 bg-white/5">
          <h1 className="text-2xl font-bold">LegitCheck AI</h1>
          <p className="text-white/70 mt-1">
            Upload sneaker photos → get authenticity confidence or red flags.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-white/70">Mode</label>
              <div className="flex gap-2 mt-2">
                <button
                  className={`px-3 py-2 rounded-lg border ${
                    mode === "quick"
                      ? "bg-white text-black"
                      : "border-white/20 text-white"
                  }`}
                  onClick={() => setMode("quick")}
                >
                  Quick
                </button>

                <button
                  className={`px-3 py-2 rounded-lg border ${
                    mode === "deep"
                      ? "bg-white text-black"
                      : "border-white/20 text-white"
                  }`}
                  onClick={() => setMode("deep")}
                >
                  Deep Research
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-white/70">Sneaker Model</label>
              <input
                className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/15 outline-none"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Air Jordan 1, Dunk Low, Yeezy 350..."
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Upload Photos</label>

              <div className="mt-2 flex items-center gap-3">
                <label className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-white text-black font-semibold cursor-pointer hover:opacity-90 transition">
                  Upload photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const selected = Array.from(e.target.files || []);
                      setFiles(selected);
                    }}
                  />
                </label>

                <div className="text-sm text-white/70">
                  {files.length === 0
                    ? "No files selected"
                    : `${files.length} file(s) selected`}
                </div>

                {files.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="ml-auto text-sm text-white/60 hover:text-white transition"
                  >
                    Clear
                  </button>
                )}
              </div>

              {files.length > 0 && (
                <div className="mt-3 p-3 rounded-lg border border-white/10 bg-black/30">
                  <div className="text-xs text-white/60 mb-2">Selected:</div>
                  <ul className="text-sm text-white/80 space-y-1 max-h-28 overflow-auto">
                    {files.map((f, idx) => (
                      <li key={idx} className="truncate">
                        • {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-white/50 mt-2">
                Tip: For Deep Research upload: side, heel, tongue, inside tag,
                box label.
              </p>
            </div>

            <button
              onClick={onCheck}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Checking..." : "Check Authenticity"}
            </button>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 rounded-2xl border border-white/15 bg-black/30">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">{result.verdict}</div>
                  <div className="text-white/70">
                    {Math.round(result.confidence)}%
                  </div>
                </div>

                <div className="text-sm text-white/60 mt-2">
                  Model guess:{" "}
                  <span className="text-white">{result.modelGuess}</span>
                </div>

                {result.barcodeOrSku && (
                  <div className="text-sm text-white/60 mt-1">
                    SKU/Barcode:{" "}
                    <span className="text-white">{result.barcodeOrSku}</span>
                  </div>
                )}

                <div className="mt-4">
                  <div className="font-semibold">Reasons</div>
                  <ul className="list-disc pl-5 text-white/75 mt-2 space-y-1">
                    {result.reasons?.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>

                {result.redFlags?.length > 0 && (
                  <div className="mt-4">
                    <div className="font-semibold text-red-300">Red Flags</div>
                    <ul className="list-disc pl-5 text-red-200 mt-2 space-y-1">
                      {result.redFlags.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT AD */}
        <div className="hidden lg:block w-[300px] sticky top-6">
          <AdSlot label="Ad (Right)" />
        </div>
      </div>
    </main>
  );
}
