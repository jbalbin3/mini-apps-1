import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';

class Square extends React.Component {
  handleClick() {
    // drop piece on column
    this.props.drop(this.props.x)
  }

  render() {
    var square = 'square';
    if(this.props.board[this.props.x][this.props.y] !== undefined) {
      if(this.props.board[this.props.x][this.props.y] === 'X') {
        square += ' X';
      } else {
        square += ' O';
      }
    }
    return (
      <div className={square} onClick={()=> this.handleClick()}>
        <p>O</p>
      </div>
      // <button className="square">
      //   {this.props.value}           // <button className='square'>{this.props.value}</button>
      // </button>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // each array is a column with 1st being the bottom
      board: [
        [], // 0
        [], // 1
        [], // .
        [], // .
        [],
        [],
        [], // 6
      ],
      player: 'X',
      winner: false
    }
    this.winner = null;
    this.dropPiece = this.dropPiece.bind(this);
  }

  dropPiece(col) {
    var tempBoard = this.state.board.slice();
    if(tempBoard[col].length === 6) {
      // return that user can't place piece
      console.log('column is full!!!');
    } else {
      var nextPlayer = (this.state.player === 'X') ? 'O' : 'X';
      tempBoard[col].push(this.state.player);
      // console.log(tempBoard);
      this.setState({board: tempBoard, player: nextPlayer});
      // check if 4 in a row
      this.winner = this.checkWinner(tempBoard);
      // if(winner) {
      //   console.log(`the winner is ${winner}!!!`);
      // }
    }
  }

  checkWinner(board) {
    // check column wins

    for(let i=0;i < 7; i++) {
      var countX = 0;
      var countO = 0;
      for(let j=0;j < board[i].length; j++) {
        if(board[i][j] === 'X') {
          countX++;
          countO = 0;

        }
        if(board[i][j] === 'O') {
          countO++;
          countX = 0;

        }
        if(countX === 4) {
          return 'X';
        }
        if(countO === 4) {
          return 'Y';
        }
      }
    }



    // check row wins

    var countX = 0;
    var countO = 0;
    for(let j=0;j < 6; j++) {
      for(let i=0;i < 7; i++) {
        console.log(`checking (${i},${j})`);
        if(!board[i].length) {
          console.log('no length at ', i ,countX, countO)
          countX = 0;
          countO = 0;
          continue;
          }
        if(board[i][j] === 'X') {
          countX++;
          countO = 0;
          console.log('x ', countX, countO)

        }
        if(board[i][j] === 'O') {
          countO++;
          countX = 0;
          console.log('o ', countX, countO)
        }
        if(countX === 4) {
          return 'X';
        }
        if(countO === 4) {
          return 'Y';
        }
      }
    }


    // check diagonal wins - not working
  //   var countX = 0;
  //   var countO = 0;
  //   for(let i=0;i < 7; i++) {
  //     for(let j=0;j < board[i].length; j++) {
  //       if(board[i+j][i+j] === 'X') {
  //         countX++;
  //         countO = 0;
  //       }
  //       if(board[i+j][i+j] === 'O') {
  //         countO++;
  //         countX = 0;
  //       }
  //       if(countX === 4) {
  //         return 'X';
  //       }
  //       if(countO === 4) {
  //         return 'Y';
  //       }
  //     }
  //   }

    return null;
  }

  render() {
    const playArea = [];
    for (let y=5; y >= 0; y--) {
      var row = [];
      for (let x=0; x < 7; x++) {
        row.push(<Square x={x} y={y} key={x} drop={this.dropPiece} board={this.state.board}/>)
      }
      playArea.push(<div className='row' key={y}>{row}</div>)
    }
    if(!this.winner) {
      return (
        <div>
          <div>Player {this.state.player}'s turn</div>
          <div>Click on a column to drop a piece</div>
          <div>{playArea}</div>
        </div>
      )
    } else {
      return (
      <div>
      <div id='win'>The winner is {this.winner}!!!!!</div>
      <div>Player {this.state.player}'s turn</div>
      <div>Click on a column to drop a piece</div>
      <div>{playArea}</div>
    </div>
      )
    }

  }
}

ReactDOM.render(<Game />, document.getElementById('app'));