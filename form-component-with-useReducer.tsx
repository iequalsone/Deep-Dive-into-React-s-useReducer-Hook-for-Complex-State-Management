import React, { useReducer, ChangeEvent } from "react";

// Define the types for state and actions
interface FormState {
  name: string;
  email: string;
  password: string;
}

type FormAction =
  | { type: "setName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "reset" };

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
};

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={state.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={state.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setEmail", payload: e.target.value })
          }
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={state.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setPassword", payload: e.target.value })
          }
        />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </form>
  );
};

export default Form;
