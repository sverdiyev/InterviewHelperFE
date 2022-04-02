import React from 'react';
import ArrowUp from '@mui/icons-material/ArrowDropUp';
import ArrowDown from '@mui/icons-material/ArrowDropDown';
import { Button, Grid } from '@mui/material';

function Actions({ Vote }) {
  return (
    <>
      <span>{Vote > 0 ? '+' + Vote : Vote}</span>
      <Grid container direction="column">
        <Button size="small">
          <ArrowUp fontSize="large" sx={{ color: '#549f60' }} />
        </Button>
        <Button size="small">
          <ArrowDown fontSize="large" sx={{ color: '#d78418' }} />
        </Button>
      </Grid>
    </>
  );
}

export default Actions;