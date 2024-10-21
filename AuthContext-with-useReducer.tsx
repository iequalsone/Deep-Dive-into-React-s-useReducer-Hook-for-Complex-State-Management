import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the types for state and actions
interface AuthState {
  isAuthenticated: boolean;
  user: { name: string } | null;
}

type AuthAction =
  | { type: "login"; payload: { name: string } }
  | { type: "logout" };

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const initialState: AuthState = { isAuthenticated: false, user: null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { dispatch } = context;

  const handleLogin = () => {
    const user = { name: "John Doe" }; // mock user
    dispatch({ type: "login", payload: user });
  };

  return <button onClick={handleLogin}>Login</button>;
};

const Logout: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { dispatch } = context;

  return <button onClick={() => dispatch({ type: "logout" })}>Logout</button>;
};

const Profile: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  const { state } = context;

  return (
    <div>
      {state.isAuthenticated ? (
        <p>Welcome, {state.user?.name}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Profile />
    <Login />
    <Logout />
  </AuthProvider>
);

export default App;
