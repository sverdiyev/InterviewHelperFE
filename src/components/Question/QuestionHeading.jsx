import styled from '@emotion/styled';
import { CardContent, Grid } from '@mui/material';
import React from 'react';
import QuestionMenu from './QuestinsMenu';

const StyledComplexity = styled('span')(({ complexity }) => {
  let bgColor;

  switch (complexity) {
    case 'easy':
      bgColor = 'green';
      break;
    case 'medium':
      bgColor = '#bb9c35';
      break;
    case 'hard':
      bgColor = '#e26c11';
      break;
    default:
      bgColor = 'grey';
  }
  return {
    color: 'white',
    width: '90px',
    textAlign: 'center',
    display: 'block',
    padding: '3px',
    borderRadius: '25px',
    fontSize: '0.8rem',
    backgroundColor: bgColor
  };
});

function QuestionHeading({ complexity, questionContent, id }) {
  return (
    <CardContent
      component={Grid}
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: '0', marginBottom: '1rem' }}>
      <h4 style={{ wordBreak: 'break-all', margin: 0, maxWidth: '80%', fontSize: '1.3rem' }}>
        {questionContent}
      </h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <StyledComplexity complexity={complexity.toLowerCase()}>
          {complexity.toLowerCase()}
        </StyledComplexity>
        <QuestionMenu id={id} />
      </div>
    </CardContent>
  );
}

export default QuestionHeading;
