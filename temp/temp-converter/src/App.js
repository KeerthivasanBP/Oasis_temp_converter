import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; // Import CSS styles

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function TempZones(props) {
  if (props.celsius > 36.5) {
    return <h5 className="hot">It's getting Hot in here!</h5>;
  } else if (props.celsius >= 32.5 && props.celsius <= 36.5) {
    return <h5 className="normal">This is the normal temperature of the human body!</h5>;
  } else if (props.celsius <= 15) {
    return <h5 className="cold">Brr...Freezing!</h5>;
  }
  return null;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label><h3>Enter Temperature in {scaleNames[scale]}: </h3></label>
            <input className="form-control container text-center" id="focusedInputed" type="text" value={value} onChange={this.handleChange} />
          </div>
        </form>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { value: '', scale: 'c', backgroundColor: '#2e2e2e' }; // Initial background color
  }

  handleCelsiusChange(value) {
    this.setState({ scale: 'c', value });
    this.updateBackgroundColor(parseFloat(value));
  }

  handleFahrenheitChange(value) {
    this.setState({ scale: 'f', value });
    this.updateBackgroundColor(parseFloat(value));
  }

  // Function to update the background color based on temperature
  updateBackgroundColor(temperature) {
    let color;
    if (temperature >= 100) {
      color = '#ff3300'; // Red for hot temperatures
    } else if (temperature >= 36.5 && temperature <= 37.5) {
      color = '#3399ff'; // Blue for normal temperatures
    } else if (temperature <= 15) {
      color = '#66ccff'; // Light blue for freezing temperatures
    } else {
      color = '#2e2e2e'; // Default background color
    }
    this.setState({ backgroundColor: color });
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

    // Dynamically set the body background color
    document.body.style.backgroundColor = this.state.backgroundColor;

    return (
      <div className="text-center container-fluid">
        <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" value={fahrenheit} onChange={this.handleFahrenheitChange} />
        <TempZones celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

export default Calculator;
