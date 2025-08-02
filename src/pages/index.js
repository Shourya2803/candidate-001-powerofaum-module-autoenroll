import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
     <button
  onClick={() => window.location.href = "/demo.html"}
  style={{
    marginTop: "2rem",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Go to Demo Page
</button>

    </>
  );
}
