import React from 'react';
import RollingDice from '@/components/rolling';

const MyDiceApp = () => {
  const initialDiceValues = [4, 3, 1, 2, 5];
const cr='#B59053'

  return <RollingDice initialDiceValues={initialDiceValues}
  outlineColor={cr}
  />;
};

export default MyDiceApp;
