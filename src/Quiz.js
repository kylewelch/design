import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'

let quizData = require('./utils/quiz_data.json')

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {quiz_position: 1}
  }
  updateAnswerSectionValue(newValue, section, position) {
    this.props.updateQuizSectionValue(newValue, section, position)
  }
  updateAnswerValue(newValue) {
    let thisIteration = this.state.quiz_position - 1
    this.props.updateQuizValue(newValue, thisIteration)
  }
  showNextQuestion() {
    this.setState((state) => {
      return {quiz_position: state.quiz_position + 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  showPreviousQuestion() {
    this.setState((state) => {
      return {quiz_position: state.quiz_position - 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  handleResetClick() {
    this.setState({quiz_position: 1})
  }
  
  render() {
    const isQuizEnd = ((this.state.quiz_position -1) === quizData.quiz_questions.length)
    
    return (
      <div ref={this.ref}>
      {isQuizEnd ? 
        <QuizEnd 
          resetClickHandler={this.handleResetClick.bind(this)} 
          skills={this.props.skill_values} 
          names={this.props.skill_names}
        /> : 
        <QuizQuestion
          quiz_position={this.state.quiz_position}
          quiz_question={quizData.quiz_questions[this.state.quiz_position - 1]}
          value={0} 
          currentSkillValue={this.props.unsorted_values[this.state.quiz_position - 1]}
          updateSectionValue={this.updateAnswerSectionValue.bind(this)}
          updateValue={this.updateAnswerValue.bind(this)}
          showNextQuestionHandler={this.showNextQuestion.bind(this)}
          showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
          section_values={(this.state.quiz_position === 3) ? this.props.research_values : this.props.tech_values} /> }
      </div>
    )
  }
}

export default Quiz