import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CryptoState } from '../../context/CryptoContext';
import { TrendingCoins } from '../../utils/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

function Carousel() {
  const [trending, setTrending] = useState([]);

  const classes = useStyles();

  //to get the currency
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoing = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchTrendingCoing();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol} &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14,203,129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && ' + '} {coin?.price_change_percentage_24h}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, marginTop: 10 }}>
          {symbol} {coin?.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      ></AliceCarousel>
    </div>
  );
}

export default Carousel;
