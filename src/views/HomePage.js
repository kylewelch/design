import React, { Component } from 'react'
import Quiz from 'Quiz.js'
import Intro from 'Intro.js'
import 'views/HomePage.css'

let introData = require('utils/intro_data.json')

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_screen: 1,
      skillValues: [null, null, null, null, null, null, null, null, null],
      skillNames: ['UI', 'UX', 'Research', 'Motion', 'Leadership', 'Illustration', 'Writing', 'Code', 'Future'], 
      arrangedValues: [],
      arrangedNames: [],
      researchValues: [null, null, null, null, null],
      techValues: [null, null, null]
    }
  }
  updateSectionValue(updatedValue, section, position) {
    if (position === 3) {
      let currentValues = this.state.researchValues.slice()
      currentValues[section] = updatedValue
      this.setState({researchValues: currentValues})
    } else {
      let currentValues = this.state.techValues.slice()
      currentValues[section] = updatedValue
      this.setState({techValues: currentValues})
    }
  }
  updateValue(updatedValue, thisIteration) {
    const skillValues = this.state.skillValues.slice()
    const skillNames = this.state.skillNames.slice()
    skillValues[thisIteration] = updatedValue
    this.setState({skillValues: skillValues})
    
    
    let skillArray = []
    function Skill(name, level) {
      this.name = name;
      this.level = level;
    }
    for (let i = 0; i < this.state.skillValues.length; i++) {
      let NewSkill = new Skill(skillNames[i], skillValues[i])
      skillArray.push(NewSkill)
    }
    let Sorted = skillArray.sort((a, b) => (a.level > b.level) ? 1 : -1);
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
    let newLevels = Arranged.map(a => a.level);
    let newNames = Arranged.map(a => a.name);
    this.setState({arrangedValues: newLevels, arrangedNames: newNames})
  }
  
  showNextScreen() {
    this.setState((state) => {
      return {current_screen: state.current_screen + 1}
    })
  }
  render() {
    const isQuizStart = ((this.state.current_screen) === 3)
    
    return (
      <div>
        {isQuizStart ? 
          <Quiz 
            updateQuizSectionValue={this.updateSectionValue.bind(this)}
            updateQuizValue={this.updateValue.bind(this)} 
            skill_values={this.state.arrangedValues} 
            skill_names={this.state.arrangedNames}
            unsorted_values={this.state.skillValues}
            research_values={this.state.researchValues}
            tech_values={this.state.techValues}
          /> :
          <Intro 
            intro_content={introData.intro_pages[this.state.current_screen - 1]} 
            showNextScreenHandler={this.showNextScreen.bind(this)} />}
      </div>
    )
  }
}