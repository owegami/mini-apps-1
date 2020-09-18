
const playGame = (id) => {

  placeXO(id);

}


const getXO = (num) => {
  // console.log('made it getXO', counter.count);
  if (num % 2 === 0) {
    return 'O';
  } else {
    return 'X';
  }
}

const placeXO = (id, move) => {
  let XCount = document.getElementsByClassName('x');
  let OCount = document.getElementsByClassName('o');

  console.log(XCount.length);

  if (XCount.length > OCount.length ) {
    document.getElementById(id).innerHTML = 'O';
    document.getElementById(id).classList.add('o');
  } else if (XCount.length === OCount.length) {
    document.getElementById(id).innerHTML = 'X';
    document.getElementById(id).classList.add('x');
  }

  if (XCount.length >= 3) {
    checkWin();
  }

}

const checkWin = () => {
  let results = assembleBoard();
  let won = results.pop();
  if (won) {
    document.getElementById('willwin').id = 'winner';
  }
  let board = results.pop();
  console.log(board);

  for (let i = 0; i < board.length; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] != '.') {
      console.log(board[0][i], board[1][i], board[2][i]);
      won = true;
    } else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][i] != '.') {
      won = true;
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][i] != '.') {
        won = true;
    }

    if (won) {
      document.getElementById('willwin').id = 'winner';
    } else if (board[0].indexOf('.') === -1 && board[1].indexOf('.') === -1 && board[2].indexOf('.') === -1) {
      document.getElementById('won').innerHTML = 'Game Over';
      document.getElementById('willwin').id = 'winner';
    }
  }
}

const assembleBoard = () => {
  let won = false;
  let board = [];
  let row = [];
  for (let i = 1; i < 10; i++) {
    let cell = document.getElementById('cell' + i);
    // console.log(cell.className);
    if (cell.className.indexOf('x') != -1) {
      row.push('x');
    } else if (cell.className.indexOf('o') != -1) {
      row.push('o');
    } else {
      row.push('.');
    }
    if (i === 3 || i === 6 || i === 9) {
      if (row.join('') === 'xxx' || row.join('') === 'ooo') {
        console.log('Won!', row);
        won = true;
      }
      board.push(row);
      row = [];
    }
  }
  console.log('returning');
  let results = [];
  results.push(board, won);
  return results;
}