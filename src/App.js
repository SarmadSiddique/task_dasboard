/* eslint-disable no-unused-vars */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import './components/style/main.css'
import './components/style/main.scss'
import Routing from './components/routes/routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'react-bootstrap';
import UserLayout from './components/layout/layout';
function App() {
  const location = useLocation()
  const theme = useSelector((state) => state.themeDart.theme)
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => {
    window.scroll(0, 0)
  }, [location])
  return (
    <>
      <ThemeProvider theme={{ mode: theme }}>
        <UserLayout>
          <Routing />
        </UserLayout>
      </ThemeProvider >
    </>
  );
}

export default App;
