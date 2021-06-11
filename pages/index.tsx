import React from 'react';
import Head from 'next/head'
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Box from './components/Box';
import ShowResult from './components/ShowResult';

class Home extends React.Component {
  player1 = 'O';
  player2 = 'X';
  state = {
    generatedArray: [],
    player: this.player1,
    showResult: false,
    matchDraw: false
  };
  constructor(props) {
    super(props);
    this.state.generatedArray = [...this.initialVal];
  }
  initialVal = [
    null, null, null,
    null, null, null,
    null, null, null
  ]
  boxList = [];
  stepCounter = 0;
  resetGame = () => {
    this.setState({
      generatedArray:  [...this.initialVal],
      player: this.player1,
      showResult: false,
      matchDraw: false
    });
    this.stepCounter = 0;
  }
  runEvent = (selection: { index: number }) => {
    this.state.generatedArray[selection.index] = this.stepCounter % 2 ? this.player2 : this.player1;
    this.checkWinner(this.state.player);
    this.setState({
      generatedArray: this.state.generatedArray,
      player: this.state.player === this.player1 ? this.player2 : this.player1
    });
    this.stepCounter++;
  };
  checkWinner = (player: string) => {
    const successPattern = [[0, 3, 6], [0, 4, 8], [1, 4, 8], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    successPattern.forEach((pattern, i) => {
      let successVal = 0;
      pattern.forEach((val, j) => {
        if (this.state.generatedArray[val] === player) {
          successVal++;
        }
        if (successVal > 2) {
          this.setState({
            showResult: true,
            matchDraw: false
          });
        }
        if (this.stepCounter === 8 && successVal < 3) {
          this.setState({
            showResult: true,
            matchDraw: true
          });
        }
      })
      console.log(successVal);
    });
  }
  render() {
    this.boxList = [];
    this.state.generatedArray.forEach(
      (element: Array<number>, i: number) => {
        this.boxList = [...this.boxList,
        <Box
          changeFunc={this.runEvent}
          value={this.state.generatedArray[i]}
          index={i}
          matchComplete={this.state.showResult}
          key={i}></Box>]
      })
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Tic! Tac! Toe!
        </h1>
          {
            this.state.showResult ?
              <ShowResult
                winner={this.state.player}
                matchDraw={this.state.matchDraw}
                resetFunc={this.resetGame}></ShowResult> : ''
          }
          <p>Current Player:
          <span className={`
          ${styles.playerBox} 
          ${this.state.player === this.player1 ? styles.playerBox0 : styles.playerBoxX}`}>
              {this.state.player}
            </span>
          </p>
          <div className={styles.grid}>
            {this.boxList}
          </div>
        </main>

        <footer>
          Developed by <strong>{'  '}Sunil Soundarapandian</strong>
        </footer>
      </div>
    )
  }
}
export default Home;