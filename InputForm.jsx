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
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('');

  const EMOJIS = ['😃','📚','✅','🛒','💼'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue, description.trim(), emoji.trim());
      setInputValue(''); 
      setDescription('');
      setEmoji('');
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
      
      {/* opis i emotikon */}
      <div className="mb-4">
        <textarea
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opis (opcjonalnie)"
          className="input input-bordered w-full text-lg text-white placeholder-gray-300 bg-gray-700 py-2"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <span className="text-2xl font-bold text-white">Ikona:</span>
        <div className="flex gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`text-2xl p-2 rounded ${emoji === e ? 'bg-gray-600' : ''}`}
              type="button"
            >
              {e}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={emoji}
          onChange={(e) => {
            const sanitized = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
            setEmoji(sanitized);
          }}
          placeholder="lub wpisz słowa"
          className="input input-bordered w-full md:w-auto text-xl text-white placeholder-gray-300 bg-gray-700 py-2"
        />
      </div>

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

