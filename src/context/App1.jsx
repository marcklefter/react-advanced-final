import React, {
  useCallback,
  useContext,
  useState
} from 'react';

import styles from './App.module.css';

// ...

const theme1 = 'lightgray';
const theme2 = '#9A97F3';

// ...

const AppContext = React.createContext();

// ...

function AppProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [theme, setTheme] = useState(theme1);

  const {
    login, 
    setLogin,
    theme,
    setTheme
  } = appState;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// ...

function Login() {
  console.log('Render:Login');

  const {
    login,
    setLogin,

    theme
  } = useContext(AppContext);

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => setLogin(!login)} style={{ backgroundColor: theme }}>
        {login ? 'Logout' : 'Login'}
      </button>
    </>
  )
}

function ThemeSelector() {
  console.log('Render:ThemeSelector');

  const {
    theme,
    setTheme
  } = useContext(AppContext);

  return (
    <>
      <h1>Theme Selector</h1>
      <button onClick={() => setTheme(theme1)} style={{ backgroundColor: theme }}>Set Theme 1</button>
      <button onClick={() => setTheme(theme2)} style={{ backgroundColor: theme }}>Set Theme 2</button>
    </>
  )
}

// ...

export function App() {
  return (
    <AppProvider>
      <div className={styles.app}>
        <div className={styles.section}>
          <Login />
        </div>
        <div className={styles.section}>
          <ThemeSelector />
        </div>
      </div>
    </AppProvider>
  )
}