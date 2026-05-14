import { Crown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-bold text-[#011062]">SağlıkCell</h2>
        <p className="text-xs text-gray-500">Kişisel Sağlık Takip Platformu</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-xl bg-[#FEC20D] px-4 py-2 text-sm font-semibold text-[#011062]">
          <Crown size={16} />
          Premium’a Geç
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#217ABF] font-bold text-white">
            A
          </div>
          <span className="hidden text-sm font-medium text-[#011062] md:block">
            Arif
          </span>
        </div>
      </div>
    </header>
  );
}