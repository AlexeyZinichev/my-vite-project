// import React from 'react'; // Необязательно, так как используется JSX с Vite
import { Component } from 'react';

class ShopItemClass extends Component {
  render() {
    const { item } = this.props;
    
    return (
      <div className="main-content">
        {/* Пропы отображаются строго по макету */}
        <h2>{item.brand}</h2>
        <h1>{item.title}</h1>
        <h3>{item.description}</h3>
        
        <div className="description">{item.descriptionFull}</div>

        {/* Мобильный блок для адаптива (по вашему чек-листу) */}
        <div className="highlight-window mobile">
          <div className="highlight-overlay"></div>
        </div>

        <div className="divider" />

        <div className="purchase-info">
          <div className="price">
            {`${item.currency}${item.price.toFixed(2)}`}
          </div>
          <button>Добавить в корзину</button>
        </div>
      </div>
    );
  }
}

export default ShopItemClass;
