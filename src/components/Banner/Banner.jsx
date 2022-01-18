import { Container, makeStyles, Typography } from '@material-ui/core';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner2.jpg)',
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginbottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              textTransfom: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the info regarding your fav Crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
