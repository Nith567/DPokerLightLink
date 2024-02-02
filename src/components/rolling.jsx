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
    // Roll the dice with a specific set of values when the component mounts
    rollAll(initialDiceValues);
  }, [initialDiceValues]);

  return (
    <ReactDice
      numDice={5}
      ref={reactDice}
      rollDone={rollDone}
      disableIndividual={true}
    />
  );
};

export default RollingDice;
