import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PieChart from "./lib";

class App extends Component {
  constructor(props) {
    super(props);

    this.dataTypeToColorDict = {
      MEDS: "#C2EEF8",
      FLUSHES: "#5DD2EF",
      TPN: "#84A5D5",
      FEEDS: "#A3DBDC",
      lol434ra: "#C13BDA",
      xbo4334x: "#613BFA"
    };

    this.state = {
      data: [
        { value: 1, type: "MEDS" },
        { value: 1, type: "FLUSHES" },
        { value: 20, type: "FEEDS" },
        { value: 10, type: "FEEDS" },
        { value: 1, type: "TPN" }
      ]
    };

    this.meds = ["MEDS", "FLUSHES", "FEEDS", "TPN"];

    this.handleRemoveBtnCLick = this.handleRemoveBtnCLick.bind(this);
  }

  componentDidMount() {
    // let self = this;
    // setInterval(function() {
    //   self.simulateDataChange();
    // }, 1000);
  }

  handleRemoveBtnCLick() {
    let data = this.state.data;
    data = data.slice(0, -1);
    this.setState({
      data: data
    });
  }

  handleSubmit = e => {
    if (e) e.preventDefault();
    const data = this.data.value;
    var jsonStr = data.replace(/(\w+:)|(\w+ :)/g, function(s) {
      return '"' + s.substring(0, s.length - 1) + '":';
    });

    let json = JSON.parse(jsonStr);
    let newData = [...this.state.data];
    newData.push(json);

    this.setState({
      data: newData
    });
  };

  simulateDataChange() {
    let addOrRemove = Math.floor(Math.random() * 100) + 0;
    let medIndex = Math.floor(Math.random() * 4) + 0;

    if (addOrRemove % 11 === 0) {
      let data = this.state.data;
      data = data.slice(0, -1);
      this.setState({
        data: data
      });
    } else {
      let json = {
        value: Math.floor(Math.random() * 100) + 1,
        type: this.meds[medIndex]
      };
      let newData = this.state.data;
      newData.push(json);
      this.setState({
        data: [...this.state.data, json]
      });
    }
  }

  render() {
    let { data, width } = this.state;
    return (
      <>
        <div>Pass in data in the form: {' { value: 1, type: "MEDS" } '}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{
              height: "50px",
              width: "50%",
              fontSize: "14pt"
            }}
            placeholder="data"
            type="text"
            ref={element => {
              this.data = element;
            }}
          />
          <button>ADD DATA</button>
        </form>
        <button onClick={this.handleRemoveBtnCLick}>REMOVE DATA</button>
        <PieChart
          data={data}
          width={500}
          dataTypeToColorDict={this.dataTypeToColorDict}
          title="Calories"
          titleUnit="kCal/kg/day"
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
