import React from 'react';
import App from './App';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()})


test("it should init the board", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  instance.initBoard();
  expect(wrapper.state('board').length).toBe(9)
})

test("board should be valid with no Valid Sets showing", ()=> {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  instance.initBoard()
  wrapper.setState({select: 'test'})
  instance.verifyBoard();
  expect(wrapper.state('boardValid')).toBe(true)
})

test("board should be invalid with Valid Sets showing", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  instance.initBoard()
  instance.verifyBoard();
  expect(wrapper.state('boardValid')).toBe(false)
})

test("img category should be updated", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  instance.initBoard();
  const board = wrapper.state('board')
  const currSelect = wrapper.state('select');
  // find index item is currSelect
  let index;
  for (let i = 0; i < board.length; i++) {
    if (board[i].category === currSelect) {
      index = i;
      break;
    }
  }

  instance.handleImgClick(index, currSelect)

  expect(wrapper.state('board')[0].category).not.toBe(currSelect)
})
