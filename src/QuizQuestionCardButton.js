import React, { Component } from 'react'
import image from './assets/images/placeholder-image.svg'

class QuizQuestionCardButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.button_text)
  }
  render() {
    return (
        <button className="answer-card" onClick={this.handleClick.bind(this)}>
          <img src={image} alt="placeholder icon" />
        <p className="answer-card-text">{this.props.question_data.answer_text[this.props.button_text]}</p>
        </button>
    )
  }
}

export default QuizQuestionCardButton