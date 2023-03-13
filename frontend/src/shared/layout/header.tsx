import { Button, Grid, IconButton, Box, Typography } from '@mui/material';
import logo from './image/KERUX.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type HeaderProps = {
  headerTitle: string;
  buttonAction: () => void;
};

const Header = ({ headerTitle, buttonAction }: HeaderProps) => {
  return (
    <Box
    sx={{
      position: 'absolute',
      width: 'calc(100% - 64px)',
      height: '135px',
      left: '64px',
      top: '0px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
      overflowX: 'hidden',
    }}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '6px 4px',
              position: 'absolute',
              left: '3.43%',
              right: '93.5%',
              top: '50.32%',
              bottom: '19.87%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 3px 5px -2px rgba(0, 0, 0, 0.2), 0px 2px 3px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
              borderRadius: '4px',
              cursor: 'pointer',
              width: 'fit-content',
              margin: '0 auto',
            }}
            onClick={buttonAction}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 'small', margin: '0 8px' }} />
          </Box>

          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '45px',
            left: '109px',
            top: '68px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <Typography variant="h1" color="primary.light">{headerTitle}</Typography>
          </Box>

        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{
            position: 'absolute',
            width: '179.95px',
            height: '32.67px',
            left: 'auto',
            right: '110px',
            top: '45px',
            maxWidth: '100%',
            margin: '0 auto',
            '& img': {
              maxWidth: '100%',
              height: 'auto',
            },
          }}>
            <img src={logo} alt="logo" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
