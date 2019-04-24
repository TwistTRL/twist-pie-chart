import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
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
        }

        this.state = {
            data: [
                { value: 1, type: "MEDS" },
                { value: 1, type: "FLUSHES" },
                { value: 20, type: "FEEDS" },
                { value: 10, type: "FEEDS" },
                { value: 1, type: "TPN" }
            ]
        }
    }

    handleSubmit = (e) => {
        if (e) e.preventDefault();
        const data = this.data.value;
        var jsonStr = data.replace(/(\w+:)|(\w+ :)/g, function (s) {
            return '"' + s.substring(0, s.length - 1) + '":';
        });

        let json = JSON.parse(jsonStr)
        this.setState({
            ...this.state,
            data: json
        })
    }

    updateTableState(newState) {
        this.setState({
            ...this.state,
            ...newState
        })
    }

    selectedMeasurement() {

    }

    render() {
        return (
            <>
                <div>Pass in data in the form: {' [{ value: 1, type: "MEDS" }, {value: 1, type: "FLUSHES" }, {value: 20, type: "FEEDS" }, {value: 10, type: "FEEDS" }, {value: 1, type: "TPN" }] '}</div>
                <form onSubmit={this.handleSubmit}>
                    <input style={{
                        height: "50px",
                        width: "50%",
                        fontSize: "14pt"
                    }} placeholder="data" type="text" ref={(element) => { this.data = element }} />
                    <button>UPDATE TABLE</button>
                </form>
                <PieChart data={this.state.data} dataTypeToColorDict={this.dataTypeToColorDict} title={"Calories"} />
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

