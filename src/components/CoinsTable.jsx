import axios from 'axios';
import { useState, useEffect } from 'react';
import { CoinList } from '../utils/api';
import { CryptoState } from '../context/CryptoContext';
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
    },
  },
}));

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  let history = useNavigate();

  const classes = useStyles();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const handleSearchCoins = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center' }}>
          <Typography
            variant='h4'
            style={{ margin: 18, fontFamily: 'Montserrat' }}
          >
            CryptoCurrency Price By Market Cap
          </Typography>
          <TextField
            label='Search For a Crypto Currency'
            variant='outlined'
            style={{ width: '100%', marginBottom: 20 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: 'gold' }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                  <TableRow>
                    {['Coin', 'Price', '24h Change', 'Market Cap'].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: 'black',
                            fontWeight: '700',
                            fontFamily: 'Montserrat',
                          }}
                          key={head}
                          align={head === 'Coin' ? '' : 'right'}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearchCoins()
                    //for pagination
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    //for displyaing the data
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => history(`/coins/${row.id}`)}
                          key={row.id}
                          className={classes.row}
                        >
                          <TableCell
                            component={'th'}
                            scope='row'
                            style={{ display: 'flex', gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height='50'
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <span
                                style={{
                                  textTransform: 'uppercase',
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: 'darkgrey' }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align='right'>
                            {symbol} {row.current_price.toFixed(2)}
                          </TableCell>
                          <TableCell
                            align='right'
                            style={{
                              color: profit > 0 ? 'rgb(14,203,129' : 'red',
                              fontWeight: 500,
                            }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align='right'>
                            {symbol} {row.market_cap.toString().slice(0, -6)}Mn
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            classes={{ ul: classes.pagination }}
            count={(handleSearchCoins()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CoinsTable;
