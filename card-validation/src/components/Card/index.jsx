import React from 'react';
import './index.scss';

export default function Card({ values, side }) {
  const { name, cardnumber, expireMM, expireYY, securitycode } = values;

  return (
    <div className="field card">
      {side === 'front' ? (
        <div className="card__front">
          <div className="card__number">
            {cardnumber ? cardnumber : '0000 0000 0000 0000'}
          </div>
          <div className="card__expiry-date">
            {expireMM ? expireMM : '01'}/{expireYY ? expireYY : '01'}
          </div>
          <div className="card__owner">
            {name ? name.toUpperCase() : 'CARDHOLDERS NAME'}
          </div>
          <img className="card__logo" src="/visa-logo.png" alt="visa logo" />
        </div>
      ) : (
        <div className="card__back">
          <div className="card__strip"></div>
          <div className="card__container">
            <div className="card__signature"></div>
            <div className="card__ccv">{securitycode ? securitycode : '###'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
