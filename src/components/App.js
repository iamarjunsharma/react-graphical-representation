import React from 'react';
import Balance from '../containers/Balance';
import Repayment from '../containers/Repayment';
import '../styles/style.css';

const App = () => (
  <div className="container">
    <Balance />
    <Repayment />
  </div>
);

export default App;
