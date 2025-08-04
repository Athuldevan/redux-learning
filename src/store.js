import { createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
//  ✅in redux we create state = inital state
function reducer(state = initialState, action) {
  switch (action.type) {
    // ✅ in redux or mostly reducer we write action type like this
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state; // ✅ in default case we throw a new Error but in redux we simply return the state
  }
}

// creating a  Store
const store = createStore(reducer); // ✅we are creating a store for redux

// store.dispatch({ type: "account/deposit", payload: 5000 }); //✅ Dispatching an action to the reducer
// store.dispatch({ type: "account/withdraw", payload: 1 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 2999, purpose: "To Buy a Car" },
// });
// console.log(store.getState()); //✅ GEtting the current state
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// creatig action creators instead qf wring action object every time


function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan(amount) {
  return { type: "account/payLoan"};
}

store.dispatch(deposit(500));
store.dispatch(withdraw(1));
store.dispatch(requestLoan(100, "To Buy a car"));
store.dispatch(payLoan())
console.log(store.getState());
