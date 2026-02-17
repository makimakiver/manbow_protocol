import CustomCursor from "../components/CustomCursor";
import ConnectWallet from "../components/ConnectWallet";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#f5f3ee]">
      <CustomCursor />
      <Sidebar />
      <ConnectWallet />

      {/* Outer box */}
      <div className="min-h-screen flex items-stretch p-6 pl-16 pr-24">
        <div className="w-full border border-[rgba(0,0,0,0.1)] rounded-2xl bg-white/40 backdrop-blur-sm p-4 sm:p-5">
          {/* Inner box */}
          <div className="h-full border border-[rgba(0,0,0,0.08)] rounded-xl bg-white/70 backdrop-blur-sm overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
