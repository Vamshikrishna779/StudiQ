import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './features/auth/AuthContext';
import AppRouter from './router/AppRouter';


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
