import React, { Component } from 'react';
import './Dictation.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Data from './sentences.json';
import AnswerSheet from './PaperSheet';

class Dictation extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      result : false
    };

    this.sentences = Data.sentences;
    this.playNextSentence = this.playNextSentence.bind(this);
    this.playCurrentSentence = this.playCurrentSentence.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
  }

  getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  getNextSentence() {
    this.currentSentence = this.sentences[this.getRandomIndex(0, 100)];
    return this.currentSentence;
  }
 
  updateAnswer(){
    return (function(event){
      this.setState({answer : event.target.value});
    }).bind(this);
  }

  checkAnswer() {
    let msg = (this.state.answer === this.getCurrentSentence()) ?
      'Matched!' : 'Not matched!';
    this.setState({ result : msg , currentSentence : this.getCurrentSentence() });
  }

  getCurrentSentence() {
    return this.currentSentence;
  }

  playNextSentence() {
    this.play(this.getNextSentence());
  }

  play(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.rate = 0.8;
    window.speechSynthesis.speak(msg);
  }

  playCurrentSentence() {
    this.play(this.getCurrentSentence());
  }

  render() {
    console.log(Data);
    return (
      <div className="App">
        <header>
          <h1>Write from Dictation</h1>
        </header>

        <Button
          variant="outlined" size="small" color="primary"
          onClick={this.playNextSentence}>
          Play sentence
        </Button>

        <Button variant="outlined" size="small" color="primary"
          onClick={this.playCurrentSentence}>
          Repeat
        </Button>

        <br />
        <TextField
          id="outlined-full-width"
          label="Type your answer"
          style={{ margin: 8 }}
          placeholder="..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.answer}
              onChange={this.updateAnswer()}
        />

        <br />
        <Button variant="outlined" size="small" color="primary"
          onClick={this.checkAnswer}>
          Check Answer
        </Button>

        <br />
          <AnswerSheet
            text={this.state.currentSentence}
            result={this.state.result}>
          </AnswerSheet>
          
      </div>
    );
  }
}

export default Dictation;