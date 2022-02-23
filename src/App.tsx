// React
import React, { useState, useEffect } from 'react';

// Icons
import { CgClose, CgRadioCheck } from 'react-icons/cg';

// Type Interface
import { Status } from './interface/types';

// SCSS
import './style/App.scss';

function App() {
  const defaultGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [noughtsArr, setNoughtsArr] = useState<number[]>([]);
  const [crossesArr, setCrossesArr] = useState<number[]>([]);
  const [noughtTurn, setNoughtTurn] = useState(false);
  const [winResult, setWinResult] = useState<number[][]>([]);
  const [winner, setWinner] = useState('');
  const winArrays = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Check if any of a win array is a subset of Noughts or Crosses array
  // to determine who win
  const isSubset = (xoArr: number[], winArr: number[]) =>
    winArr.every((number) => xoArr.includes(number));

  // Check the game result depending on changes of nought an cross array
  useEffect(() => {
    // Handle Draw
    const combinedArr = [...crossesArr, ...noughtsArr];
    if (!winner && combinedArr.length === 9) {
      setWinner('Draw');
    }
    // Check who is eligible to win
    const noughtResult: number[][] = winArrays.filter((winArray) => isSubset(noughtsArr, winArray));

    const crossResult = winArrays.filter((winArray) => isSubset(crossesArr, winArray));

    // Setting Winner
    if (noughtResult.length > 0) {
      setWinner('Noughts');
      const result = [...noughtResult];
      setWinResult(result);
    } else if (crossResult.length > 0) {
      setWinner('Crosses');
      const result = [...crossResult];
      setWinResult(result);
    }
  }, [noughtsArr, crossesArr]);

  // Check grid is X, O or empty by given box number
  const getStatus = (boxNumber: number) => {
    const isNought = noughtsArr.includes(boxNumber);
    const isCross = crossesArr.includes(boxNumber);
    const isEmpty = !isNought && !isCross;
    const status = () => {
      let thisStatus = '';
      if (isNought) thisStatus = 'Nought';
      if (isCross) thisStatus = 'Cross';
      if (isEmpty) thisStatus = 'Empty';
      return thisStatus;
    };
    return {
      isNought,
      isCross,
      isEmpty,
      status,
    };
  };

  // Actions triggered by clicking a grid
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const boxClicked = Number((e.target as HTMLButtonElement).value);

    // Handle repeat clicking
    if (!getStatus(boxClicked).isEmpty) return;

    // Insert clicked box number to Array
    if (noughtTurn) setNoughtsArr((prevArr) => [...prevArr, boxClicked]);
    else setCrossesArr((prevArr) => [...prevArr, boxClicked]);

    // Toggle Turn
    setNoughtTurn(!noughtTurn);
  };

  // Reset Button
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNoughtsArr([]);
    setCrossesArr([]);
    setNoughtTurn(false);
    setWinner('');
    setWinResult([]);
  };

  // To display correct icon (X or O) by grid status
  const withIcon = (status: Status) => {
    let icon: JSX.Element = null;
    if (status.isNought) {
      icon = <CgRadioCheck className="icon" />;
    } else if (status.isCross) {
      icon = <CgClose className="icon" />;
    }
    return icon;
  };

  // To display game result in text
  const showResult = () => {
    if (!winner) return {};
    if (winner === 'Draw') return 'Draw Game!';
    return `Winner is ${winner}!`;
  };

  // To display a win result in red color
  const getWinBoxStyle = (boxNumber: number) => {
    const [[arr]] = [winResult];
    let isMatch = false;
    if (arr) {
      isMatch = arr.includes(boxNumber);
    }
    return isMatch ? 'tomato' : 'dimgrey';
  };

  return (
    <div>
      <h1>Noughts &#38; Crosses</h1>
      <div className="result">
        {winner ? (
          <h2 className="red">{showResult()}</h2>
        ) : (
          <h2>
            Turn:
            <span className="red">{noughtTurn ? ' O ' : ' X '}</span>
          </h2>
        )}
      </div>
      <div className="grid-container">
        {defaultGrid.map((boxNumber) => (
          <button
            type="button"
            key={boxNumber}
            aria-label={getStatus(boxNumber).status()}
            value={boxNumber}
            style={{ color: getWinBoxStyle(boxNumber) }}
            data-testid={boxNumber}
            onClick={handleClick}
            disabled={!!winner}
          >
            {withIcon(getStatus(boxNumber))}
          </button>
        ))}
      </div>
      <div className="again">
        {winner && (
          <button type="button" onClick={(e) => handleReset(e)}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
