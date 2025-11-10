import React, { useState } from "react";

export default function App() {
  const secim = ["Taş", "Kağıt", "Makas"];
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  function computerPlay() {
    const randomSayi = Math.floor(Math.random() * secim.length);
    return secim[randomSayi];
  }

  function play(oyuncuSecimi: React.SetStateAction<string>) {
    const computersecimi = computerPlay();
    setUserChoice(oyuncuSecimi);
    setComputerChoice(computersecimi);

    if (oyuncuSecimi === computersecimi) {
      setResult("Oyun berabere!");
      return;
    }

    const userWon =
      (oyuncuSecimi === "Taş" && computersecimi === "Makas") ||
      (oyuncuSecimi === "Kağıt" && computersecimi === "Taş") ||
      (oyuncuSecimi === "Makas" && computersecimi === "Kağıt");

    if (userWon) {
      setUserScore((s) => s + 1);
      setResult(`Sen kazandın! ${oyuncuSecimi} ▶ ${computersecimi}`);
    } else {
      setComputerScore((s) => s + 1);
      setResult(`Kaybettin! ${oyuncuSecimi} ▶ ${computersecimi}`);
    }
  }

  function Icon({ type, size = 36 }: { type: "Taş" | "Kağıt" | "Makas"; size?: number }) {
    if (type === "Taş")
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2L2 9l10 13 10-13L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
      );

    if (type === "Kağıt")
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="4" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 7h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M8 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M14 10l6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="17" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  const bgColor =
    result.includes("Berabere")
      ? "bg-yellow-500/20"
      : result.includes("Kazandın")
      ? "bg-green-500/20"
      : result.includes("Kaybettin")
      ? "bg-red-500/20"
      : "bg-transparent";

  return (
    <div className={`min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 to-slate-800 p-6 transition-all duration-300 ${bgColor}`}>
      <div className="w-full max-w-2xl bg-white/6 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Taş • Kağıt • Makas</h1>
            <p className="text-sm text-white/70">Modern, icon tabanlı tasarım</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">Senin Skor</p>
            <p className="text-2xl font-bold text-white">{userScore}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { key: "Taş" as const, color: "from-amber-400 to-amber-500", label: "Taş" },
            { key: "Kağıt" as const, color: "from-sky-400 to-sky-500", label: "Kağıt" },
            { key: "Makas" as const, color: "from-rose-400 to-rose-500", label: "Makas" },
          ].map((b) => (
            <button
              key={b.key}
              onClick={() => play(b.key)}
              className={`group flex flex-col items-center gap-3 py-6 rounded-xl shadow-lg transform transition-all duration-200 bg-linear-to-br ${b.color} text-white border border-white/10 hover:scale-105`}
              aria-label={b.label}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/12 border border-white/8">
                <Icon type={b.key} size={36} />
              </div>
              <span className="text-lg font-semibold tracking-wide">{b.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 items-center mb-4">
          <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm text-white/70">Senin Seçimin</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/12">
                <Icon type={userChoice as "Taş" | "Kağıt" | "Makas" || "Taş"} size={28} />
              </div>
              <span className="text-white font-medium">{userChoice || "—"}</span>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm text-white/70">Bilgisayarın Seçimi</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/12">
                <Icon type={computerChoice as "Taş" | "Kağıt" | "Makas" || "Kağıt"} size={28} />
              </div>
              <span className="text-white font-medium">{computerChoice || "—"}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-white/90 font-semibold">{result || "Oynamak için bir seçim yap"}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70">Bilgisayar Skor: <span className="font-bold text-white">{computerScore}</span></div>
          <div className="flex gap-2">
            <button
              onClick={() => { setUserScore(0); setComputerScore(0); setUserChoice(""); setComputerChoice(""); setResult(""); }}
              className="px-4 py-2 rounded-md bg-white/6 border border-white/10 text-white/90 hover:bg-white/8"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
