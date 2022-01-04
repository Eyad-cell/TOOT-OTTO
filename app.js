// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// columns
const column0 = [ allCells[18], allCells[12], allCells[6], allCells[0], topCells[0]];
const column1 = [ allCells[19], allCells[13], allCells[7], allCells[1], topCells[1]];
const column2 = [allCells[20], allCells[14], allCells[8], allCells[2], topCells[2]];
const column3 = [allCells[21], allCells[15], allCells[9], allCells[3], topCells[3]];
const column4 = [allCells[22], allCells[16], allCells[10], allCells[4], topCells[4]];
const column5 = [ allCells[23], allCells[17], allCells[11], allCells[5], topCells[5]];
const columns = [column0, column1, column2, column3, column4, column5];


// rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5]];
const row1 = [allCells[6], allCells[7], allCells[8], allCells[9], allCells[10], allCells[11]];
const row2 = [allCells[12], allCells[13], allCells[14], allCells[15], allCells[16], allCells[17]];
const row3 = [allCells[18], allCells[19], allCells[20], allCells[21], allCells[22], allCells[23]];

const rows = [row0, row1, row2, row3, topRow];


// variables
let gameIsLive = false;
let Player2IsNext = false;
let Choose_O= true;


  const element = document.getElementById('game-board')  
  element.addEventListener("click", () => {
  
    alert("Choose TOOT or OTTO first!");
  });
  document.getElementById("playerOneTurn").style.display = "none"
  document.getElementById("playerTwoTurn").style.display = "none"

// Functions

const TOOT = document.getElementById('TOOT')
const OTTO = document.getElementById('OTTO')

function TOOT_btn () {
gameIsLive=true;
OTTO.disabled=true;
TOOT.disabled = true;
document.getElementById("playerOneTurn").style.display = "inline"
window.alert = function() {};
Player2IsNext=false;
}

function OTTO_btn () {
gameIsLive=true;
OTTO.disabled = true;
TOOT.disabled = true;
document.getElementById("playerTwoTurn").style.display = "inline"
window.alert = function() {};
Player2IsNext=true;
}

var P1_T_counters = 5;
function P1_onClick_T() {      
    document.getElementById("P1_T_counters").innerHTML = P1_T_counters;
     if (P1_T_counters == -1) {
  document.getElementById("T_btn").disabled = true;return;
}     P1_T_counters -= 1;
}
var P1_O_counters = 5;
function P1_onClick_O() {      
    document.getElementById("P1_O_counters").innerHTML = P1_O_counters;
     if (P1_O_counters == -1) {
  document.getElementById("O_btn").disabled = true;return;
}     
P1_O_counters -= 1;
}
  var P2_T_counters = 5;
  function P2_onClick_T() {
    document.getElementById("P2_T_counters").innerHTML = P2_T_counters;
    if (P2_T_counters == -1) {
    document.getElementById("T_btn").disabled = true;return; }         
       
    P2_T_counters -= 1; 
  }
  var P2_O_counters = 5;
  function P2_onClick_O() {      
      document.getElementById("P2_O_counters").innerHTML = P2_O_counters;
       if (P2_O_counters == -1) {
    document.getElementById("O_btn").disabled = true;return;
}     P2_O_counters -= 1;
  }

  var x = document.getElementById("T_btn");
  x.addEventListener("click", T_Function);
  function T_Function() {
    Choose_O = false;
  }
  var y = document.getElementById("O_btn");
  y.addEventListener("click", O_Function);
  function O_Function() {
    Choose_O = true;
  }
function P1_Turn() {

      if (Player2IsNext == true || !OTTO.disabled) {
        document.getElementById("playerOneTurn").style.display = "inline"
      } 
      else {
        document.getElementById("playerOneTurn").style.display = "none"
      }
    }
  function P2_Turn() {

    if (Player2IsNext == false || !OTTO.disabled) {
      document.getElementById("playerTwoTurn").style.display = "inline"
    } 
    else {
      document.getElementById("playerTwoTurn").style.display = "none"
    }
  }


const getClassListArray = (cell) => {
  const classList = cell.classList;

  return [...classList];
};

const getCellLocation = (cell) => {
  const classList = getClassListArray(cell);

  const rowClass = classList.find(className => className.includes('row'));
  const colClass = classList.find(className => className.includes('col'));
  const rowIndex = rowClass[4];
  const colIndex = colClass[4];
  const rowNumber = parseInt(rowIndex, 10);
  const colNumber = parseInt(colIndex, 10);

  return [rowNumber, colNumber];
};

const getFirstOpenCellForColumn = (colIndex) => {
  const column = columns[colIndex];
  const columnWithoutTop = column.slice(0, 6);
  for (const cell of columnWithoutTop) {
    const classList = getClassListArray(cell);
    if (!classList.includes('O') && !classList.includes('T')) {
      return cell;
    }
  }
  return null;
};

const clearCharFromTop = (colIndex) => {
  const topCell = topCells[colIndex];
  topCell.classList.remove('O');
  topCell.classList.remove('T');
};

const getCharOfCell = (cell) => {
  const classList = getClassListArray(cell);
  if (classList.includes('O')) return 'O';
  if (classList.includes('T')) return 'T';
  return null;
};
let testArray 
const checkWinningCells = (cells) => {
   testArray = cells.join();
  if ((testArray.includes('O,T,T,O') && Player2IsNext)||(testArray.includes('T,O,O,T')&&!Player2IsNext)) 

  {
   
    gameIsLive = false;
    document.getElementById("playerOneTurn").style.display = "none"
    document.getElementById("playerTwoTurn").style.display = "none"
  
  /*for (const cell of cells) {
    cell.classList.add('win');
  }*/
statusSpan.textContent = `${Player2IsNext ? 'OTTO' : 'TOOT'} has won!` 

  return true;}
  else return false;
};

const checkStatusOfGame = (cell) => {
  const Char = getCharOfCell(cell);
  if (!Char) return;
  const [rowIndex, colIndex] = getCellLocation(cell);

  // Check horizontally------------------------------------------------------------------------------
  let winningCells = [];
  //let winnerChar=[cell]
  winningCells[colIndex]=getCharOfCell(cell)
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;
  let lazyBugFix = 0
  while (colToCheck>=0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      if(lazyBugFix==3){lazyBugFix=0;break;}

      winningCells[colToCheck]=(getCharOfCell(cellToCheck));
      colToCheck--;
      lazyBugFix++;
  

    } else {
      lazyBugFix=0;
      break;
    }
  }
  colToCheck = colIndex + 1;
  while (colToCheck<=5) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      if(lazyBugFix==3) {lazyBugFix=0;break;}

      winningCells[colToCheck]=(getCharOfCell(cellToCheck));
      colToCheck++;
      lazyBugFix++;
  

    } else {
      break;
    } 
  }
  let isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;


  // Check vertically---------------------------------------------------------------------------
  let winningCellsver=[]
  winningCellsver[rowIndex]=getCharOfCell(cell);
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;
  while (rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsver[rowToCheck]=(getCharOfCell(cellToCheck));
      rowToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  while (rowToCheck <= 3) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsver[rowToCheck]=(getCharOfCell(cellToCheck));
      rowToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCellsver);
  if (isWinningCombo) return;


  // Check diagonally /---------------------------------------------------------------------------
  winningCellsdiaright = [];
  winningCellsdiaright[rowIndex]=getCharOfCell(cell);
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck <= 3) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsdiaright[rowToCheck]=getCharOfCell(cellToCheck);
      rowToCheck++;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 5 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsdiaright[rowToCheck]=getCharOfCell(cellToCheck);
      rowToCheck--;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCellsdiaright);
  if (isWinningCombo) return;

  
  // Check diagonally \---------------------------------------------------------------------------
  winningCellsdialeft = [];
  winningCellsdialeft[rowIndex]=getCharOfCell(cell)
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;
  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsdialeft[rowToCheck]=getCharOfCell(cellToCheck);
      rowToCheck--;
      colToCheck--;
    } else {
      break;
    }
  }
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex + 1;
  while (colToCheck <= 5 && rowToCheck <= 3) {
    const cellToCheck = rows[rowToCheck][colToCheck];
    if (getCharOfCell(cellToCheck) !== null) {
      winningCellsdialeft[rowToCheck]=getCharOfCell(cellToCheck);
      rowToCheck++;
      colToCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCellsdialeft);
  if (isWinningCombo) return;

  // Check to see if we have a tie----------------------------------------------------------------
  const rowsWithoutTop = rows.slice(0, 4);
  for (const row of rowsWithoutTop) {
    for (const cell of row) {
      const classList = getClassListArray(cell);
      if (!classList.includes('O') && !classList.includes('T')) {
        return;
      }
    }
  }

  gameIsLive = false;
  statusSpan.textContent = "Game is a tie!";
};



// Event Handlers-----------------------------------------------------------------------------------
const handleCellMouseOver = (e) => {
  if (!gameIsLive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const topCell = topCells[colIndex];
  topCell.classList.add(Choose_O ? 'O' : 'T');
};

const handleCellMouseOut = (e) => {
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);
  clearCharFromTop(colIndex);
};

const handleCellClick = (e) => {
  if (!gameIsLive) {
    document.getElementById("playerOneTurn").style.display = "none"
    document.getElementById("playerTwoTurn").style.display = "none"
   

    return;}
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const openCell = getFirstOpenCellForColumn(colIndex);

  if (!openCell) return;
  if((Player2IsNext&&!Choose_O&&P2_T_counters==-1)||(Player2IsNext&&Choose_O&&P2_O_counters==-1)) return;
  if((!Player2IsNext&&!Choose_O&&P1_T_counters==-1)||(!Player2IsNext&&Choose_O&&P1_O_counters==-1)) return;
  openCell.classList.add(Choose_O ? 'O' : 'T');
  Player2IsNext? (Choose_O ? P2_onClick_O():P2_onClick_T()):(Choose_O? P1_onClick_O():P1_onClick_T())
  checkStatusOfGame(openCell);

  Player2IsNext = !Player2IsNext;
  console.log(Player2IsNext ? 'OTTO Player' : 'TOOT Player')
 
  clearCharFromTop(colIndex);
  if (gameIsLive) {
    const topCell = topCells[colIndex];
    topCell.classList.add(Choose_O ? 'O' : 'T');
  }
};




// Adding Event Listeners------------------------------------------------------------------------
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener('mouseover', handleCellMouseOver);
    cell.addEventListener('mouseout', handleCellMouseOut);
    cell.addEventListener('click', handleCellClick);
  }
}

resetButton.addEventListener('click', () => {
  for (const row of rows) {
    for (const cell of row) {
      cell.classList.remove('T');
      cell.classList.remove('O');
      cell.classList.remove('win');
    }
  }
  document.getElementById("playerOneTurn").style.display = "none"
  document.getElementById("playerTwoTurn").style.display = "none"

gameIsLive = false;
  OTTO.disabled=false;
  TOOT.disabled = false;
  Player2IsNext = true;
  statusSpan.textContent = '';
   P2_T_counters = 6;
  P2_O_counters = 6;
  P1_T_counters = 6;
  P1_O_counters = 6;
  P2_onClick_T();
  P2_onClick_O();
  P1_onClick_T();
  P1_onClick_O();
  
});
