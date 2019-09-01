import React, { Component } from 'react'



// Store the skills in an array and default the levels to zero


function Skill(name, level, question) {
  this.name = name;
  this.level = level;
  this.question = question;
}

let UI = new Skill('UI', 0, 'Select the mockup that comes closest to your current UI Design skills:');
let UX = new Skill('UX', 4, 'How much experience do you have with UX Design?');
let Research = new Skill('Research', 1, 'How many times have you done the following types of UX Research?');
let Motion = new Skill('Motion', 3, 'On a scale of 0 to 5, how would you rate your Motion Design skills?');
let Leadership = new Skill('Leadership', 2, 'For each of the following, rate how much experience you have and how much you enjoy it:');
let Illustration = new Skill('Illustration', 2, 'Select the image that comes closest to your current Illustration skills:');
let Writing = new Skill('Writing', 1, 'What\'s your experience with Copywriting?');
let Dev = new Skill('Dev', 0, 'How much experience do you have with Front-end Code?');
let Future = new Skill('Future', 1, 'Have you ever designed for any of the following technologies?');

let Skills = [UI, UX, Research, Motion, Leadership, Illustration, Writing, Dev, Future];
let SkillsCopy = [UI, UX, Research, Motion, Leadership, Illustration, Writing, Dev, Future];


/* Sort the skills into a bell curve */


let Sorted = SkillsCopy.sort((a, b) => (a.level > b.level) ? 1 : -1);
  
let firstHalf = [];
let secondHalf = [];

function SortSkills() {
  
  for (let i = 0; i < Sorted.length; i += 2) {
      firstHalf.push(Sorted[i]);
  }
  
    for (let i = 1; i < Sorted.length; i += 2) {
      secondHalf.push(Sorted[i]);
  }
}

SortSkills();

let Arranged = firstHalf.concat(secondHalf.sort((a, b) => (a.level < b.level) ? 1 : -1));
let Levels = Arranged.map(a => a.level);
let SkillNames = Arranged.map(a => a.name);
let Questions = Skills.map(a => a.question);
const maxLevel = 5;

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
    for (let i = 0; i < maxLevel; ++i) {
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