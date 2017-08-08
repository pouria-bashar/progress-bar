import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './components/ProgressBar';
import styles from './App.css';
import axios from 'axios';

const BARS_URL = 'http://frontend-exercise.apps.staging.digital.gov.au/bars';

class App extends Component {

  state = {
    buttons: [],
    bars: [],
    selectedIndex: 0,
  }

  componentDidMount() {
    axios.get(BARS_URL).then(response => {
      const { data: { buttons, bars } } = response;
      this.setState({ buttons, bars });
    })
  }

  _handleClick(e) {
    const value = parseInt(e.target.value);
    const bars = this.state.bars.map((bar, index) => {
      if (index === this.state.selectedIndex) {
        const newValue = this.state.bars[index] + value;
        return newValue < 0 ? 0 : newValue;
      }
      return bar;
    });

    this.setState({ bars });
  }

  _handleBarChange(e) {
    this.setState({ selectedIndex: parseInt(e.target.value) });
  }

  render() {
    const { buttons, bars } = this.state;

    return (
      <div className={styles.app}>
        <section>
          <div className={styles.bars}>
            {
              bars.map((item, index) => (
                <ProgressBar
                  key={index}
                  percentage={bars[index]}
                />
              ))
            }
          </div>
          <div className={styles.controlls}>
            <select onChange={this._handleBarChange.bind(this)}>
              {
                bars.map((bar, index) => (
                  <option
                    key={index}
                    value={index}
                    >{`Progress Bar ${index + 1}`}
                  </option>
                ))
              }
            </select>
            {
              buttons.map((item, index) => (
                <button
                  key={index}
                  value={item}
                  onClick={this._handleClick.bind(this)}
                >{item}
                </button>
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

export default App;
