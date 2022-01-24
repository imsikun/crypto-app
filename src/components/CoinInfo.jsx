import { useState, useEffect } from 'react';
import { CryptoState } from '../context/CryptoContext';
import { HistoricalChart } from '../utils/api';
import axios from 'axios';
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  //to fetch the data
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data);
    // console.log(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const useStyles = makeStyles(() => ({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* charts */}
        {!historicalData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
            }}
          />
        )}
        {/* buttons */}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
