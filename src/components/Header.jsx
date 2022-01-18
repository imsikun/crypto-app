import {
  AppBar,
  Container,
  Select,
  Toolbar,
  Typography,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';
// import CryptoContext from '../context/CryptoContext';
// import { useContext } from 'react';
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'Pointer',
  },
  menuItemColor: {
    color: '#fff',
  },
}));

function Header() {
  const classes = useStyles();

  const history = useNavigate();

  const { currency, setCurrency } = CryptoState();

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              variant='h5'
              onClick={() => history('/')}
            >
              Crypto Hunter
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={handleCurrency}
            >
              <MenuItem value={'INR'}>INR</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
