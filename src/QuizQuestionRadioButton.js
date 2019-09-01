import React, { Component } from 'react'

class QuizQuestionRadioButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.button_text)
  }
  render() {
    return (
      <div className="radio-option" onClick={this.handleClick.bind(this)}>
        <div className={this.props.isChecked ? "radio-circle checked" : "radio-circle unchecked"} data-value={this.props.button_text.answer_options}></div>
        <label className="radio-label"><span className="radio-main-answer">{this.props.question_data.answer_text[this.props.button_text]}</span>{this.props.question_data.answer_description[this.props.button_text]}</label>
      </div>
    )
  }
}

export default QuizQuestionRadioButton