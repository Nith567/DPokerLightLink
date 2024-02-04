'use client'
import React, { useRef, useEffect } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';

const RollingDice = ({ initialDiceValues }) => {
  const reactDice = useRef(null);

  const rollDone = (totalValue, values) => {
    console.log('individual die values array:', values);
    console.log('total dice value:', totalValue);
  };

  const rollAll = (diceValues) => {
    reactDice.current?.rollAll(diceValues);
  };

  useEffect(() => {

    rollAll(initialDiceValues);
  }, [initialDiceValues]);

  return (
    <ReactDice
      numDice={5}
      ref={reactDice}
      rollDone={rollDone}
      disableIndividual={true}
      outlineColor={'#B59053'}
    />
  );
};

export default RollingDice;
