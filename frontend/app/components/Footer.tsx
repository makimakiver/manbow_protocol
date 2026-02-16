export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="divider mb-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-[#333] mb-1">Manbow</p>
            <p className="text-[11px] text-[#bbb] max-w-xs leading-[1.7]">
              Multi-chain lending protocol.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {["Docs", "GitHub", "Discord", "Twitter"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] text-[#bbb] hover:text-[#333] font-mono"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] text-[#ccc] font-mono">&copy; 2026 Manbow Protocol</span>
          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Security"].map((item) => (
              <a key={item} href="#" className="text-[10px] text-[#ccc] hover:text-[#999] font-mono">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
