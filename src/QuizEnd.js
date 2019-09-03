import React, { Component } from 'react'


// Single block component


function Block(props) {
  return <div className={"skill-grid-col-block " + props.value}></div>
}


// Single column component


class Column extends React.Component {
  renderBlock(i) {
    return (
      <Block 
        value={(i < this.props.skillLevel) ? 'skill-added' : 'skill-blank'}
        index={i}
      />
    );
  }
  
  render() {
    let col = [];
    for (let i = 0; i < 5; ++i) {
      col.push(this.renderBlock(i));
    }

    return (
      <div className="skill-grid-col">
        <div class="skill-grid-col-label">
          <p class="skill-grid-col-label-text">{this.props.skillType}</p>
        </div>
        {col}
      </div>
    );
  }
}


// Skill grid component


class Grid extends Component {
  
  renderColumn(i) {
    return (
      <Column 
        skillType={this.props.skill_name[i]}
        skillLevel={this.props.skill_level[i]}
      />
    );
  }

  render() {
    let cols = [];
    for (let i = 0; i < 10; ++i) {
      cols.push(this.renderColumn(i));
    }

    return (
      <div class="skill-grid">{cols}</div>
    );
  }
}


// Results Page


class QuizEnd extends Component {
  
  handleResetClick() {
    this.props.resetClickHandler()
  }
  getSkillLevel() {
    this.props.PassSkillLevel()
  } 
  render() {
    return(
      <div>
        <h1 class="main-heading">It looks like you're a _!</h1>
        <Grid skill_level={this.props.skills} skill_name={this.props.names}/>
        <p>Here's a description and analysis of your skill set.</p>
        <a href='#' onClick={this.handleResetClick.bind(this)}>Retake the Assessment</a>
      </div>
    )
  }
}

export default QuizEnd