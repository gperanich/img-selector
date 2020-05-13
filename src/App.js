import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    categories: ['city', 'dog', 'airplane'],
    board: [],
    select: '',
    message: '',
    boardValid: null
  }
  componentDidMount = () => {
    this.initBoard();
  }
  getRandomCategory(avoidCategory) {
    let categories = [...this.state.categories];

    if (avoidCategory) {
      categories.splice(categories.indexOf(avoidCategory), 1);
    }

    const random = Math.floor(Math.random() * categories.length);
    return categories[random];
  }
  initBoard = () => {
    // init board objects w/ random image src, category
    let board = Array(9);
    for (let i = 0; i < board.length; i++) {
      const category = this.getRandomCategory();
      const imgSrc = `https://loremflickr.com/200/200/${category}?random=${i}`;
      board[i] = { imgSrc, category }
    }

    // pick random category to check for
    const select = this.getRandomCategory(this.state.select);

    this.setState({ board, select })
  }
  handleImgClick = (index, category) => {
    let board = [...this.state.board];

    // remove selected category from possibilities and pick a random category
    const newCategory = this.getRandomCategory(category)

    // set new img src
    const newImgSrc = `https://loremflickr.com/200/200/${newCategory}?random=${Math.random() * board.length}`;

    // update board 
    board[index].category = newCategory;
    board[index].imgSrc = newImgSrc;

    this.setState({ board })
  }
  verifyBoard = () => {
    let boardValid = true;

    for (let i = 0; i < this.state.board.length; i++) {
      // if category at i === select, invalidate board
      if (this.state.board[i].category === this.state.select) {
        boardValid = false;
        break;
      }
    }

    // set message and init board
    if (boardValid) {
      this.setState({
        message: "Test passed, you may proceed",
        boardValid
      })
    } else {
      this.setState({
        message: "Test failed, you may not proceed. Please try again",
        boardValid
      })
    }

    this.initBoard();
  }
  render() {
    return (
      <div >
        <div className="head-container">
          <h1>Select the pictures that have a <span className="select-item">{this.state.select}</span></h1>
          <button className="submit-btn" onClick={() => this.verifyBoard()}>Submit</button>
          <p>{this.state.message}</p>
        </div>

        <div className="grid">
          {this.state.board.map((child, i) => {
            return (
              <div className="cell" key={i}>
                <Image
                  imgSrc={this.state.board[i].imgSrc}
                  category={this.state.board[i].category}
                  index={i}
                  handleClick={this.handleImgClick}
                />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

function Image(props) {
  const { imgSrc, category, index } = props;
  return (
    <div>
      <img src={imgSrc} alt={category} title={category} onClick={() => props.handleClick(index, category)} />
    </div>
  )
}

export default App;
