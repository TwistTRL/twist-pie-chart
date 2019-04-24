import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PieChartBundle from "./lib";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                data: [
                    { time: 14324324, m1: 54, m2: 443 },
                    { time: 14394324, m1: 45, m2: 403 },
                    { time: 1439434324, m1: 45, m2: 403 },
                    { time: 1432435424, m1: 54, m2: 443 },
                    { time: 16394324, m1: 45, m2: 403 },
                    { time: 15394344, m1: 45, m2: 403 },
                    { time: 154355444, m1: 54, m2: 443 },
                    { time: 1639555424, m1: 45, m2: 403 },
                    { time: 153945454, m1: 45, m2: 403 }],
                keys: ["time", "m1", "m2"]
            },
            selectedCol1: null,
            selectedCol2: null
        }

        this.updateTableState = this.updateTableState.bind(this)
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
                <div>Pass in data in the form: {'{data: [{time: 156565656, m1: 54, m2: 443}, {time: 1654654546, m1: 54, m2: 443 }, {time: 16546546546, m1: 54, m2: 443 },  {time: 1654663146, m1: 54, m2: 443 },  {time: 1656546546, m1: 54, m2: 443 }, {time: 16534546, m1: 54, m2: 443 }, {time: 1656346546, m1: 54, m2: 443 }], keys: ["time", "m1", "m2"]} '}</div>
                <form onSubmit={this.handleSubmit}>
                    <input style={{
                        height: "50px",
                        width: "50%",
                        fontSize: "14pt"
                    }} placeholder="data" type="text" ref={(element) => { this.data = element }} />
                    <button>UPDATE TABLE</button>
                </form>
                <PieChartBundle
                />
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

