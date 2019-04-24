import React, { PureComponent } from "react";
import PieChart from "./PieChart"

class PieChartBundle extends PureComponent {
    render() {
        var data1 = [
            { value: 1, type: "MEDS" },
            { value: 1, type: "FLUSHES" },
            { value: 20, type: "FEEDS" },
            { value: 10, type: "FEEDS" },
            { value: 1, type: "TPN" },
            { value: 1, type: "Tgdfs" },
            { value: 1, type: "gfdsg" },
            { value: 1, type: "ggfr" },
            { value: 1, type: "4ggf" },
            { value: 1, type: "oggm" },
            { value: 5, type: "flac" },
            { value: 10, type: "ps4" },
            { value: 10, type: "ps5" },
            { value: 10, type: "xbox" },
            { value: 10, type: "lol" },
            { value: 1, type: "fswwf" },
            { value: 10, type: "lolra" },
            { value: 10, type: "lolfde" },
            { value: 10, type: "loefefl" },
            { value: 10, type: "ps4324" },
            { value: 10, type: "ps5433" },
            { value: 10, type: "xbo4334x" },
            { value: 10, type: "lo434l" },
            { value: 1, type: "fsw433wf" },
            { value: 10, type: "lol434ra" },
            { value: 10, type: "loltgfde" },
            { value: 5, type: "loefgrgrefl" }]

        var data2 = [
            { value: 1, type: "MEDS" },
            { value: 1, type: "FLUSHES" },
            { value: 20, type: "FEEDS" },
            { value: 10, type: "FEEDS" },
            { value: 1, type: "TPN" }
        ]

        var data3 = [
            { value: 10, type: "MEDS" },
            { value: 1, type: "FLUSHES" },
            { value: 7, type: "FEEDS" },
            { value: 10, type: "FEEDS" },
            { value: 10, type: "TPN" }
        ]

        var dataTypeToColorDict = {
            MEDS: "#C2EEF8",
            FLUSHES: "#5DD2EF",
            TPN: "#84A5D5",
            FEEDS: "#A3DBDC",
            lol434ra: "#C13BDA",
            xbo4334x: "#613BFA"
        }

        var title = "Fluids"

        return (
            <div className="pie-charts-wrap">
                <PieChart
                    data={data2}
                    dataTypeToColorDict={dataTypeToColorDict}
                    title={"Calories"}
                />
                <PieChart
                    data={data3}
                    dataTypeToColorDict={dataTypeToColorDict}
                    title={title}
                />
            </div>
        )
    }
}

export default PieChartBundle