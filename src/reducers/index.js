import { combineReducers } from 'redux';

const addBalance = (state = [] , action) => {
  switch (action.type) {
    case 'ADD_BALANCE':
      return [
        ...state,
        action.balance
      ];
    default:
      return state;
  }
};

const count = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_COUNT':
      return state + 1;
    default:
      return state;
  }
};

const addRepayment = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_REPAYMENT':
      return action.repayment;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  count,
  balanceList: addBalance,
  repayment: addRepayment
});

export default rootReducer;
