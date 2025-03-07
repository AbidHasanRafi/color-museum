import { Copy } from "lucide-react";

const ColorCard = ({ color, onCopy, onRemove }) => {
  return (
    <div
      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg shadow-lg relative overflow-hidden transform transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: color }}
    >
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-all duration-200"
        >
          &times;
        </button>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs py-1 text-center rounded-t-lg">
        {color}
      </div>
      <button
        onClick={onCopy}
        className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
        aria-label={`Copy color ${color} to clipboard`}
      >
        <Copy size={18} className="text-gray-700" />
      </button>
    </div>
  );
};

export default ColorCard;
