import { useState } from "react";
import { Copy, Edit, Check } from "lucide-react";

const CustomPaletteCreator = ({ customPalette, setCustomPalette, saveCustomPalette }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [editingIndex, setEditingIndex] = useState(null); // Track which color is being edited

  // Add a color to the custom palette
  const addColorToPalette = (color) => {
    if (customPalette.length >= 5) {
      alert("You can only add up to 5 colors to a palette!");
      return;
    }
    setCustomPalette([...customPalette, color]);
  };

  // Remove a color from the custom palette
  const removeColorFromPalette = (index) => {
    const updatedPalette = customPalette.filter((_, i) => i !== index);
    setCustomPalette(updatedPalette);
  };

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

  // Enter edit mode for a color
  const startEditing = (index) => {
    setEditingIndex(index);
    setSelectedColor(customPalette[index]); // Set the selected color to the current color
  };

  // Save the edited color
  const saveEditedColor = (index) => {
    const updatedPalette = [...customPalette];
    updatedPalette[index] = selectedColor; // Update the color at the specified index
    setCustomPalette(updatedPalette);
    setEditingIndex(null); // Exit edit mode
  };

  return (
    <div className="rounded-lg shadow-xl w-full p-4 lg:p-0">
      <h2 className="text-2xl text-center lg:text-start font-semibold text-gray-100 mb-6">Create Your Palette</h2>
      
      {/* Color Picker and Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-all duration-300"
        >
          {showPicker ? "Hide Picker" : "Show Color Picker"}
        </button>

        {showPicker && (
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-12 h-12 border-2 border-teal-500 rounded-md cursor-pointer"
          />
        )}

        <button
          onClick={() => addColorToPalette(selectedColor)}
          className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all duration-300"
        >
          Add Color
        </button>

        <button
          onClick={() => {
            const paletteName = prompt("Enter a name for your palette:");
            if (paletteName) saveCustomPalette(paletteName);
          }}
          className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-300"
        >
          Save Palette
        </button>
      </div>

      {/* Display Custom Palette */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {customPalette.map((color, index) => (
          <div
            key={index}
            className="relative h-24 rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
            style={{ backgroundColor: color }}
          >
            {/* Remove Color Button */}
            <button
              onClick={() => removeColorFromPalette(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-all duration-300"
            >
              &times;
            </button>

            {/* Color Code Display */}
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs py-1 text-center rounded-b-md backdrop-blur-sm">
              {color}
            </div>

            {/* Edit Mode: Color Picker and Save Button */}
            {editingIndex === index ? (
              <div className="absolute top-1 left-1 flex gap-1">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-6 h-6 rounded-md cursor-pointer"
                />
                <button
                  onClick={() => saveEditedColor(index)}
                  className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition-all duration-300"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              /* Copy and Edit Buttons */
              <div className="absolute top-1 left-1 flex gap-1">
                <button
                  onClick={() => copyToClipboard(color)}
                  className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  aria-label={`Copy color ${color} to clipboard`}
                >
                  <Copy size={16} className="text-gray-700" />
                </button>
                <button
                  onClick={() => startEditing(index)}
                  className="bg-white/80 p-1 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  aria-label={`Edit color ${color}`}
                >
                  <Edit size={16} className="text-gray-700" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPaletteCreator;
