import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import Notfound from './pages/Notfound';
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins/:id' element={<CoinPage />} />
        <Route path='/notfound' element={<Notfound />} />
        <Route path='/*' element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
