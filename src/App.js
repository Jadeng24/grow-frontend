import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      personType: 'Representative',
      stateSelected: '',
      people: [],
      personToDisplay: {}
    }
    this.changeSelectedState = this.changeSelectedState.bind(this);
    this.getResultsForState = this.getResultsForState.bind(this);
    this.handleRepType = this.handleRepType.bind(this);
    this.openPersonDetails = this.openPersonDetails.bind(this);
    this.closePersonDetails = this.closePersonDetails.bind(this);
  }

  changeSelectedState(val) {
    this.setState({
      stateSelected: val
    }, () => {
      this.getResultsForState();
    });
  }

  handleRepType(e) {
    this.setState({
      personType: e.target.value
    }, _ => console.log(this.state.personType));
  }
  getResultsForState() {
    console.log(`state selected: ${this.state.stateSelected}`);
    let url = '';
    if (this.state.personType === 'Senators') {
      url = `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${this.state.stateSelected}&output=json`
    } else {
      url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${this.state.stateSelected}&output=json`
    }
    axios.get(url).then(res => {
      this.setState({
        people: res.data.results
      }, _ => {
        console.log(this.state.people)
      });
    });
  }

  openPersonDetails(person) {
    this.setState({
      personToDisplay: person
    });
  }

  closePersonDetails() {
    this.setState({
      personToDisplay: {}
    });
  }
  render() {
    const peopleResults = this.state.people.map((person, i) => {
      return (
        <div className="person" key={i} onClick={() => { this.openPersonDetails(person) }}>
          <p>{person.name}</p>
          <span className="person">{person.party}</span>
        </div>
      )
    });
    return (
      <div className="App">
        <header className='centerContent'>
          Find Representatives
        </header>

        <div className="inputsHolder">

          <h1> Select Leader Type</h1>
          <div className="radioBtns">
            <h2>* Select Person Type</h2>
            <label>
              <input type="radio" value="Senator"
                checked={this.state.personType === 'Senator'}
                onChange={this.handleRepType} />Senator
              </label>
            <label>
              <input type="radio" value="Representative"
                checked={this.state.personType === 'Representative'}
                onChange={this.handleRepType} />Representative
              </label>
          </div>
          <div><h2> *Select State </h2>
          <select id="selectedState" onChange={(e) => this.changeSelectedState(document.getElementById("selectedState").value)}>
            <option value="" disabled> State</option>
            <option value="AL">Alabama  </option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
            </select>
          </div>
        </div>

        
        <div className="resultsHolder">
        {peopleResults}
        </div>
        <div className={this.state.personToDisplay.name ? 'personDetails' : 'hiddenDetails'}>
          <div className={this.state.personToDisplay.name ? 'closeDetailBtn' : 'hiddenDetails'}
            onClick={() => { this.closePersonDetails() }}>Close Details</div>
          <p>{this.state.personToDisplay.name}</p>
          <p>{this.state.personToDisplay.party}</p>
          <p>{this.state.personToDisplay.state}</p>
          <p>{this.state.personToDisplay.phone}</p>
          <p>{this.state.personToDisplay.office}</p>
        </div>
      </div>
    );
  }
}

export default App;
