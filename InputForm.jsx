import { useState } from "react";

const COLORS = [
  { name: 'Czerwony', value: '#fff200' },       
  { name: 'Pomarańczowy', value: '#fe8800' },   
  { name: 'Żółty', value: '#00ff04' },          
  { name: 'Zielony', value: '#0004ff' },        
  { name: 'Niebieski', value: '#ae00ff' },      
];

function InputForm({ onAddTask, selectedColor, onColorChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue);
      setInputValue(''); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Dodaj nowe zadanie..."
          className="input input-bordered w-full h-16 text-2xl text-white placeholder-gray-300 bg-gray-700 py-4"
        />
        <button type="submit" className="btn btn-primary text-2xl py-4 px-8">
          Dodaj
        </button>
      </form>
      
      <div className="flex justify-center gap-2 mb-4">
        <span className="text-2xl font-bold self-center mr-2 text-white">Kolor:</span>
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.value)}
            title={color.name}
            style={{ backgroundColor: color.value }}
            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedColor === color.value
                ? 'border-gray-800 scale-110'
                : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default InputForm;
