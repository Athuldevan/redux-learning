import { createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
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
      return state;
  }
}

console.log("Creating Redux");
// creating a  Store
const store = createStore(reducer); //we are creating a store for redux
store.dispatch({ type: "account/deposit", payload: 5000 });
store.dispatch({ type: "account/withdraw", payload: 1 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 2999, purpose: "To Buy a Car" },
});
console.log(store.getState());
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
