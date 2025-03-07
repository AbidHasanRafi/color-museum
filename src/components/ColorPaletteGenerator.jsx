import { useState, useEffect } from "react";
import PaletteGallery from "./PaletteGallery";
import CustomPaletteCreator from "./CustomPaletteCreator";
import MyColors from "./MyColors";

const ColorPaletteGenerator = () => {
  const [palettes, setPalettes] = useState([]); // Fetched palettes from JSON
  const [customPalette, setCustomPalette] = useState([]); // Custom palette created by the user
  const [myColors, setMyColors] = useState([]); // Custom palettes saved by the user

  // Fetch the palettes JSON file from the public directory
  useEffect(() => {
    fetch("/palettes.json")
      .then((response) => response.json())
      .then((data) => setPalettes(data))
      .catch((error) => console.error("Error loading palettes:", error));
  }, []);

  // Save the custom palette to "My Colors"
  const saveCustomPalette = (paletteName) => {
    if (customPalette.length === 0) {
      alert("Please add colors to your palette before saving!");
      return;
    }
    const newPalette = { id: Date.now(), name: paletteName, colors: customPalette };
    setMyColors([...myColors, newPalette]); // Add the new palette to "My Colors"
    setCustomPalette([]); // Reset the custom palette
  };

  // Delete a palette from "My Colors"
  const deletePalette = (id) => {
    setMyColors(myColors.filter((palette) => palette.id !== id));
  };

  // Edit a palette in "My Colors"
  const editPalette = (id, updatedPalette) => {
    setMyColors(
      myColors.map((palette) =>
        palette.id === id ? { ...palette, ...updatedPalette } : palette
      )
    );
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* Container with max-width and responsive padding */}
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-8 text-center">
          Color Museum
        </h1>

        {/* Custom Palette Creator */}
        <CustomPaletteCreator
          customPalette={customPalette}
          setCustomPalette={setCustomPalette}
          saveCustomPalette={saveCustomPalette}
        />

        {/* My Colors Section */}
        <MyColors
          myColors={myColors}
          deletePalette={deletePalette}
          editPalette={editPalette}
        />

        {/* Palette Gallery */}
        <PaletteGallery palettes={palettes} />
      </div>
      
    </div>
  );
};

export default ColorPaletteGenerator;
