import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//We can use a functional component here because renderSquare only consists of a render method
function Square (props){
return ( // each button is a square on the board
<button className="square" onClick={props.onClick}> 
{props.value}
</button> 
    );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // these properties change, so they are in state
      squares: Array(9).fill(null), //an array to hold each square's value, starting with each being null
      xIsNext: true, // boolean to hold the current player (X or O)
    };
}

 handleClick(i) {
    const squares = this.state.squares.slice(); //clone the squares array so no mutation of original
    if(whoWins(squares) || squares[i]){ // if someone wins or player clicks on occupied square, bust out
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';  //otherwise, it's the next players turn
    this.setState({squares: squares,  //update the values in new squares array
                  xIsNext: !this.state.xIsNext}); //flip the boolean (change players)
    //console.log((i + " " + squares[i]); <-- shows what square was clicked and who clicked it (X or O)
  }

  renderSquare(i) {
    return ( 
      <Square 
          value={this.state.squares[i]}  
          onClick={() => {this.handleClick(i)}}
      />
  );
  }

  render() {
    const winner = whoWins(this.state.squares);
    let status;
    if (winner){
    status = 'Winner: ' + winner; 
    } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') ;
    }

    return (

      <div>
        <p style={{fontSize:24, color:'#F53855',marginTop:0,marginBottom:10}}>tic tac toe</p>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Helper function to determine if the game has been won
function whoWins(squares){  // pass the squares array to compare 
  const lines = [  // these are the possible lines to win - 2D array containing 8 arrays, each being a potential win
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6], 
  ];
  //iterate through all the combinations, and add the board’s squares indexes in constants ‘a’, ‘b’ and ‘c’.
    for(let i=0; i < lines.length; i++) { // run a loop 8 times to compare   
    const [a,b,c] = lines[i];
  // compare the current combination of the iteration with the board’s clicked squares combinations, and if there is a match, it returns the current combination, otherwise it returns null.
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){  
      //If the value of a, b, c are the same, return the value of a (either X or O).
      return squares[a]; // return the winner
    }
  }
  //console.log(squares);
  return null; 
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
