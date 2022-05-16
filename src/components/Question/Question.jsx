import React from 'react';
import QuestionActions from './QuestionActions.jsx';
import QuestionBody from './QuestionBody.jsx';
import QuestionHeading from './QuestionHeading.jsx';

import { Card, CardActions, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  textAlign: 'left',
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem'
});
const StyledCardActions = styled(CardActions)({
  padding: 0,
  gap: '5px',
  '.MuiButton-root': { paddingTop: 0, paddingBottom: 0 }
});

function Question({ complexity, questionContent, note, vote, tags, id }) {
  return (
    <StyledCard variant="outlined" component={Grid} container direction="column">
      <QuestionHeading complexity={complexity} questionContent={questionContent} id={id} />
      <Grid container justifyContent="space-between" alignContent="space-between">
        <QuestionBody note={note || 'No Description Added'} tags={tags} />
        <StyledCardActions>
          <QuestionActions vote={vote} />
        </StyledCardActions>
      </Grid>
    </StyledCard>
  );
}

export default Question;
