import { useState, useEffect } from "react";
import ColorPaletteGenerator from "./components/ColorPaletteGenerator";

function App() {
  const [currentYear, setCurrentYear] = useState("");

  // Update current year dynamically
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Pattern (fixed and covering the entire viewport) */}
      <div className="absolute inset-0 bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-fixed" />

      {/* Color Palette Generator */}
      <div className="relative z-10 flex-grow">
        <ColorPaletteGenerator />
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-slate-950 text-white text-center mt-auto">
      </footer>
    </div>
  );
}

export default App;
