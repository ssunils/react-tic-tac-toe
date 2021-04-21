import React from 'react';
import Head from 'next/head'
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Box from './components/Box';

class Home extends React.Component {
  state = {
    generatedArray: []
  };
  constructor(props){
    super(props);
    this.state.generatedArray = [...this.initialVal];
  }
  initialVal = [
    null,null,null,
    null,null,null,
    null,null,null
  ]
  boxList = [];
  counter = 0;
  runEvent = (selection: { index: number}) => {
    this.state.generatedArray[selection.index] = this.counter % 2 ? 'X' : 'O';
    this.setState({generatedArray: this.state.generatedArray});
    this.checkWinner('X');
    this.checkWinner('O');
    this.counter++;
  };
  checkWinner = (player: string) => {
    const successPattern = [[0,3,6],[0,4,8],[1,4,8],[2,5,8],[0,1,2],[3,4,5],[6,7,8]];
    successPattern.forEach((pattern, i) => {
      let successVal = 0;
      pattern.forEach((val, j) => {
        if(this.state.generatedArray[val] === player) {
          successVal++;
        }
        if(successVal > 2) {
          alert(`Player ${player} is the winner`)
        }
      })
    })
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