import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

const initialState = {
  fullName: "",
  nationalId: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "customer/fullName":
      return {
        ...state,
        fullName: action.payload,
      };

    case "customer/nationalID":
      return {
        ...state,
        nationalId: action.payload,
      };

    default:
      throw new Error("Something went wrong ");
  }
}

function Customer() {
  const [{ fullName, nationalId }, dispatchAction] = useReducer(
    reducer,
    initialState
  );

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, 832005));
    console.log(fullName, nationalId);
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) =>
              dispatchAction({
                type: "customer/fullName",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) =>
              dispatchAction({
                type: "customer/nationalID",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
