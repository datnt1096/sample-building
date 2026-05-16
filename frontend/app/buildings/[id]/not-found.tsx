import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function BuildingNotFound() {
  return (
    <div
      className={`${inter.className} flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-[#333]`}
    >
      <h1 className="text-2xl font-medium text-gray-800">Building not found</h1>
      <Link href="/" className="text-sm text-gray-600 underline hover:text-gray-800">
        Back to rental buildings
      </Link>
    </div>
  );
}
