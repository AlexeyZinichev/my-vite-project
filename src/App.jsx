// src/App.jsx
import React from 'react';
import ShopItemFunc from './components/ShopItemFunc';
import ShopItemClass from './components/ShopItemClass';
import Calendar from './components/Calendar/Calendar';
import './App.css'; // Убедись, что импорт есть (обычно он уже есть)

const item = {
  brand: 'Tiger of Sweden',
  title: 'Leonard coat',
  description: 'Minimalistic coat in cotton-blend',
  descriptionFull: "Men's minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.",
  price: 399,
  currency: '£'
};

const now = new Date(2017, 2, 8); // Март 2017 года

function App() {
  return (
    <div className="container">
      <div className="background-element"></div>
      <div className="highlight-window">
        <div className="highlight-overlay"></div>
      </div>

      {/* Контейнер с новым классом */}
      <div className="flex-row">
        {/* Карточка товара */}
        <div className="window">
          <ShopItemFunc item={item} />
        </div>

        {/* Календарь */}
        <div className="window">
          <Calendar date={now} />
        </div>
      </div>
    </div>
  );
}

export default App;
