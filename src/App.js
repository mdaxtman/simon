import React, { Component } from 'react';
import {connect} from "react-redux";
import { countUpAction, countDownAction} from "./actions";

import './App.css';
const colors = ["red", "blue", "green", "yellow"];

class Simon extends React.Component {
  
  constructor()
  {
    super()
    this.state = {}
  }

  pickRandomColor() {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
  }

  handleStart = () => {
    this.setState({
      hideButton: true,
      gameOver: null
    });

    const colorQueue = [];
    this.userQueue = [];
    colorQueue.push(this.pickRandomColor());

    this.setState({
      colorQueue
    }, this.playPattern);
  }

  startGameTimeout() {
    this.gameTimer = window.setTimeout(() => {
      // timed out.
      this.setState({
        gameOver: "Time ran out",
        hideButton: false
      })
    }, 5000);
  }

  playPattern = () => {
    const queue = this.state.colorQueue.slice();
    const timeout = () => window.setTimeout(() => {
      if (queue.length) {
        this.setState({highlightedColor: null});
        window.setTimeout(() => {
          this.setState({highlightedColor: queue.shift()});
        }, 100);
        timeout();
      } else {
        this.setState({highlightedColor: null});

        this.startGameTimeout();
      }
    }, 750);

    timeout();
  }

  handleCount = () => {
    this.props.dispatch(countUpAction());
  };
  
  handlerClick = (colorType) => () => {
    this.userQueue.push(colorType);
    window.clearTimeout(this.gameTimer);

    if (this.state.colorQueue[this.userQueue.length - 1] !== colorType) {
      // wrong answer
      this.userQueue = [];
      this.setState({hideButton: false, gameOver: "YOU LOOSE!!!!"})
      return;
    }
    
    if (this.userQueue.length === this.state.colorQueue.length) {
      const colorQueue = this.state.colorQueue.slice();
      colorQueue.push(this.pickRandomColor());
      this.setState({colorQueue}, this.playPattern);
      
      this.userQueue = [];

      return;
    }

    this.startGameTimeout();
  }

  render() {
    const gameOver = this.state.gameOver;
    
    const button = this.state.hideButton ? null :(
      <Button onStart={this.handleStart}>
        Click to play Simon!
      </Button>
    );
    
    return (
      <React.Fragment>
        {/* this is your dispatch function */}
        <button onClick={this.handleCount}>fdfdsfds</button>
        {this.props.counter}
        <div className="board">
          {colors.map((colorType, i) => {
            return (
              <div
              key={i}
              className={`tile ${colorType === this.state.highlightedColor ? "highlighted" : ""}`}
              style={{background: colorType}} 
              onClick ={this.handlerClick(colorType)}
              />
            );
          })}
          {button} 
          {gameOver} 
        </div>
      </React.Fragment>
    );
  }
}

class Button extends React.Component{
  
  handleClick = () => {
    this.props.onStart();
  }

  render () {
    return(
      <button
        style={{cursor: "pointer"}}
        onClick= {() => {
          this.handleClick()
        }}
      >
        {this.props.children}
      </button> 
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

const mappedPropsAndDispatches = connect(mapStateToProps);

export default mappedPropsAndDispatches(Simon);
/*
// function declartion
function myFunc (arg) {
  return "you called myFunc with " + arg;
}

// function expression
const myFunc = function (arg) {
  return "you called myFunc with " + arg;
};

// arrow function expression
const myFunc = (arg) => {
  return "you called myFunc with " + arg;
};

const myFunc = arg => {
  return "you called myFunc with " + arg;
};

const myFunc = (arg) => "you called myFunc with " + arg

const myFunc = arg => "you called myFunc with " + arg
*/



