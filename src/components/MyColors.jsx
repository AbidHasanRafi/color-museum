import { useState } from "react";
import ColorCard from "./ColorCard";
import { Edit, Check, Copy } from "lucide-react"; // Import the Copy icon

const MyColors = ({ myColors, deletePalette, editPalette }) => {
  const [editingId, setEditingId] = useState(null); // Track which palette is being edited
  const [editName, setEditName] = useState(""); // Track the edited name
  const [editingColorIndex, setEditingColorIndex] = useState(null); // Track which color is being edited
  const [selectedColor, setSelectedColor] = useState("#FFFFFF"); // Track the selected color for editing

  // Handle editing a palette name
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // Save the edited palette name
  const saveEdit = (id) => {
    editPalette(id, { name: editName });
    setEditingId(null);
    setEditName("");
  };

  // Handle editing a color
  const startEditingColor = (paletteId, colorIndex, color) => {
    setEditingColorIndex({ paletteId, colorIndex });
    setSelectedColor(color); // Set the selected color to the current color
  };

  // Save the edited color
  const saveEditedColor = () => {
    const { paletteId, colorIndex } = editingColorIndex;
    const updatedPalettes = myColors.map((palette) => {
      if (palette.id === paletteId) {
        const updatedColors = [...palette.colors];
        updatedColors[colorIndex] = selectedColor; // Update the color
        return { ...palette, colors: updatedColors };
      }
      return palette;
    });
    editPalette(paletteId, { colors: updatedPalettes.find((p) => p.id === paletteId).colors });
    setEditingColorIndex(null); // Exit edit mode
  };

  // Copy color to clipboard with fallback
  const copyToClipboard = async (color) => {
    try {
      // Check if navigator.clipboard is supported
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(color);
        alert(`Copied: ${color}`); // Show a simple alert
      } else {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement("textarea");
        textArea.value = color;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(`Copied: ${color}`); // Show a simple alert
      }
    } catch (error) {
      console.error("Failed to copy color:", error);
      alert("Failed to copy color to clipboard");
    }
  };

  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl text-white font-semibold text-gray-800 mb-4">My Colors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {myColors.length > 0 ? (
          myColors.map((palette) => (
            <div
              key={palette.id}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Edit Palette Name */}
              {editingId === palette.id ? (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                  />
                  <button
                    onClick={() => saveEdit(palette.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{palette.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(palette.id, palette.name)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePalette(palette.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Display Palette Colors */}
              <div className="flex gap-3 flex-wrap">
                {palette.colors.map((color, i) => (
                  <div key={i} className="relative h-24 w-24 rounded-md shadow-md" style={{ backgroundColor: color }}>
                    {/* Edit Color Button (Top-Left) */}
                    {editingColorIndex?.paletteId === palette.id &&
                    editingColorIndex?.colorIndex === i ? (
                      <div className="absolute top-1 left-1 flex gap-1">
                        <input
                          type="color"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-6 h-6 rounded-md cursor-pointer"
                        />
                        <button
                          onClick={saveEditedColor}
                          className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition-all duration-300"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditingColor(palette.id, i, color)}
                        className="absolute top-1 left-1 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all duration-300"
                        aria-label={`Edit color ${color}`}
                      >
                        <Edit size={16} className="text-gray-700" />
                      </button>
                    )}

                    {/* Copy Color Button (Top-Right) */}
                    <button
                      onClick={() => copyToClipboard(color)}
                      className="absolute top-1 right-1 bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all duration-300"
                      aria-label={`Copy color ${color} to clipboard`}
                    >
                      <Copy size={16} className="text-gray-700" />
                    </button>

                    {/* Color Code Display (Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs py-1 text-center rounded-b-md backdrop-blur-sm">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No custom palettes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyColors;