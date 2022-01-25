import React from "react";
import './index.scss';

export default function Card() {
  return (
    <div className="card">
      <div className="card__number">0000 0000 0000 0000</div>
      <div className="card__expiry-date">01/01</div>
      <div className="card__owner">CARDHOLDERS NAME</div>
      <img className="card__logo" src="/visa-logo.png" alt="visa logo"/>
    </div>
  )
}