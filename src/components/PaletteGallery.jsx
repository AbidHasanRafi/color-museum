import { useState } from "react";
import { Copy, ChevronDown } from "lucide-react";

const PaletteGallery = ({ palettes }) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  // Extract unique palette titles from the JSON data
  const uniqueTitles = [...new Set(palettes.map((palette) => palette.name))];

  // Filter palettes based on the selected title
  const filteredPalettes = selectedTitle
    ? palettes.filter((palette) => palette.name === selectedTitle)
    : palettes;

  // Copy color to clipboard
  const copyToClipboard = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      alert(`Copied: ${color}`);
    } catch (error) {
      console.error("Failed to copy color:", error);
      alert("Failed to copy color to clipboard");
    }
  };

  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl text-white font-semibold mb-4">Color Gallery</h2>

      {/* Stylish Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="filter" className="block text-sm text-white font-medium mb-4">
          Filter by Title
        </label>
        <div className="relative">
          <select
            id="filter"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="appearance-none w-full p-3 pl-4 pr-10 bg-transparent border-1 text-white focus:text-cyan-600 rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition-all duration-300"
          >
            <option value="">All Colors</option>
            {uniqueTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Display Filtered Palettes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPalettes.length > 0 ? (
          filteredPalettes.map((palette, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{palette.name}</h3>
              <div className="flex gap-3 flex-wrap">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 rounded-lg shadow-md relative transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: color }}
                  >
                    {/* Color Code Display (Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs py-1 text-center rounded-b-lg backdrop-blur-sm">
                      {color}
                    </div>

                    {/* Copy Color Button (Top-Right) */}
                    <button
                      onClick={() => copyToClipboard(color)}
                      className="absolute top-1 right-1 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all duration-300"
                      aria-label={`Copy color ${color} to clipboard`}
                    >
                      <Copy size={16} className="text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No palettes found.</p>
        )}
      </div>
    </div>
  );
};

export default PaletteGallery;