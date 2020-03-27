import React, { PureComponent } from "react";
import "./PieChart.css";

class PieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.title = this.props.title;
    this.typeToColorDict = this.props.dataTypeToColorDict;
    this.pieChartCtx = null;
    this.pieChartPickingCtx = null;

    this.pieChartCanvasW = this.props.width;
    this.pieChartCanvasH = 400;
    this.pieChartToolTipW = 120;
    this.pieChartToolTipH = 190;
    this.pieChartToolTipOffsetY = 60;

    this.state = {
      canvasToolTipVisibility: "hidden",
      toolTipLeft: this.pieChartCanvasW - this.pieChartToolTipW,
      toolTipTop:
        this.pieChartCanvasH -
        this.pieChartToolTipH +
        this.pieChartToolTipOffsetY
    };

    // pie chart data setup
    this.colorToDataTypeDict = {};
    this.pieChartColors = [];
    this.pieChartPickingColors = [];
    this.pieChartPickingColorOffSet = 7;

    for (var i = 1; i <= this.data.length; i++) {
      this.pieChartPickingColors.push(this.digToRgbStr(i));
    }
  }

  componentDidMount() {
    this.pieChartCanvas = this.refs.canvas;
    this.pieChartPickingCanvas = this.refs.pieChartPickingCanvas;
    this.tooltipCanvas = this.refs.tooltipCanvas;
    this.pieChartCtx = this.pieChartCanvas.getContext("2d");
    this.pieChartPickingCtx = this.pieChartPickingCanvas.getContext("2d");
    this.aggData = this.aggTheData(this.data);
    this.pieChartPickingColors = [];
    for (var i = 1; i <= this.aggData.length; i++) {
      this.pieChartPickingColors.push(this.digToRgbStr(i));
    }
    let pieChartColors = [];
    this.aggData.forEach(d => {
      pieChartColors.push(this.props.dataTypeToColorDict[d["type"]]);
    });
    this.drawPieChart(this.pieChartCtx, pieChartColors);
    this.drawPieChart(
      this.pieChartPickingCtx,
      this.pieChartPickingColors,
      " ",
      true
    );
  }

  componentDidUpdate() {
    this.data = this.props.data;
    this.title = this.props.title;
    this.typeToColorDict = this.props.dataTypeToColorDict;
    this.aggData = this.aggTheData(this.data);
    this.pieChartPickingColors = [];
    for (var i = 1; i <= this.aggData.length; i++) {
      this.pieChartPickingColors.push(this.digToRgbStr(i));
    }
    let pieChartColors = [];
    this.aggData.forEach(d => {
      pieChartColors.push(this.props.dataTypeToColorDict[d["type"]]);
    });
    if (this.state.canvasToolTipVisibility === "hidden") {
      this.drawPieChart(this.pieChartCtx, pieChartColors);
      this.drawPieChart(
        this.pieChartPickingCtx,
        this.pieChartPickingColors,
        " ",
        true
      );
    }
  }

  aggTheData(rawData) {
    let aggData = [];
    let aggDataTypeTable = {};
    this.dataSum = 0;
    this.pieChartColors = [];

    rawData.forEach(d => {
      this.dataSum += d.value;
      if (!aggDataTypeTable[d.type]) {
        aggDataTypeTable[d.type] = { value: d.value };
      } else {
        aggDataTypeTable[d.type] = {
          value: (aggDataTypeTable[d.type]["value"] += d.value)
        };
      }
    });

    Object.keys(aggDataTypeTable).forEach((key, index) => {
      let type = aggDataTypeTable[key];
      this.pieChartColors.push(this.typeToColorDict[key]);
      type["percent"] = type["value"] / this.dataSum;
      type["rad"] = type["percent"] * 2 * Math.PI;
      type["type"] = key;
      this.colorToDataTypeDict[this.pieChartColors[index]] = type;
      aggData[index] = type;
    });

    aggData.sort((a, b) => {
      return a.rad - b.rad;
    });

    return aggData;
  }

  // pass in data too
  drawPieChart(ctx, colors, selected = "", isPickingCanvas = false) {
    var offset = 10;
    var beginAngle = 0;
    var endAngle = 0;
    var r,
      x,
      y,
      offsetX,
      offsetY,
      medianAngleRad,
      cosMedianAngle,
      sinMedianAngle;
    var cx = this.pieChartCanvasW / 2;
    var cy = this.pieChartCanvasH / 2 + 30;
    var label = "ERROR";
    var fillColor = "";
    var maxUsedOuterLabelAngleDeg = 0;
    var outerLabelAngleDeg;

    if (ctx) {
      ctx.clearRect(0, 0, this.pieChartCanvasW, this.pieChartCanvasH);

      for (var i = 0; i < this.aggData.length; i++) {
        r = isPickingCanvas
          ? this.pieChartCanvasW / 4 + 10
          : this.pieChartCanvasW / 4;
        label = this.aggData[i].type;
        beginAngle = endAngle;
        endAngle = endAngle + this.aggData[i].rad;
        medianAngleRad = (endAngle + beginAngle) / 2;
        cosMedianAngle = Math.cos(medianAngleRad);
        sinMedianAngle = Math.sin(medianAngleRad);
        x = cx + r * 0.6 * cosMedianAngle;
        y = cy + r * 0.6 * sinMedianAngle;
        fillColor = colors[i];

        if (isPickingCanvas) {
          // picking canvas
          offsetX = 0;
          offsetY = 0;
        } else if (fillColor === selected) {
          // for hovering effect
          offsetX = cosMedianAngle * offset;
          offsetY = sinMedianAngle * offset;
        } else {
          offsetX = cosMedianAngle * 2;
          offsetY = sinMedianAngle * 2;
        }

        // for outer labeling
        outerLabelAngleDeg = this.roundDegToMultiOfTen(
          this.toDegree(medianAngleRad)
        );
        if (outerLabelAngleDeg <= maxUsedOuterLabelAngleDeg + 5) {
          maxUsedOuterLabelAngleDeg += 6;
          outerLabelAngleDeg = maxUsedOuterLabelAngleDeg;
        } else {
          maxUsedOuterLabelAngleDeg = outerLabelAngleDeg;
        }

        // draw the slice
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.moveTo(cx + offsetX, cy + offsetY);
        ctx.arc(cx + offsetX, cy + offsetY, r, beginAngle, endAngle);
        ctx.lineTo(cx + offsetX, cy + offsetY);
        ctx.strokeStyle = fillColor; //'rgba(0, 0, 0, 0.4)'
        ctx.fill();

        //label styling
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        // hovering effect
        ctx.font =
          selected !== fillColor ? "bold 10pt MuseoSans" : "900 10pt MuseoSans";
        ctx.fillStyle = isPickingCanvas ? fillColor : "#1f589d";

        if (this.aggData[i].percent > 0.15) {
          if (!isPickingCanvas) {
            // draw the inner label
            ctx.fillText(label, x, y);
          }
        } else {
          var outerLabelCosMedianAngle = Math.cos(
            this.toRadians(outerLabelAngleDeg)
          );
          var outerLabelSinMedianAngle = Math.sin(
            this.toRadians(outerLabelAngleDeg)
          );
          // modify the radius for the picking canvas so that label rect is drawn at the same position
          // as the visible canvas
          var outerLabelR = isPickingCanvas ? (r -= 10) : r;
          var outerLabelX =
            cx +
            outerLabelR * 0.8 * outerLabelCosMedianAngle +
            (outerLabelR / 2) * outerLabelCosMedianAngle;
          var outerLabelY =
            cy +
            outerLabelR * 0.9 * outerLabelSinMedianAngle +
            (outerLabelR / 2) * outerLabelSinMedianAngle;

          if (!isPickingCanvas) {
            if (this.aggData[i].percent > 0.15) {
              // draw the inner label
              ctx.fillText(label, x, y);
            }

            // draw the label line
            x = cx + r * 0.9 * cosMedianAngle;
            y = cy + r * 0.9 * sinMedianAngle;
            ctx.lineWidth = selected === fillColor[i] ? 2 : 1.3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
              x + (r / 5) * cosMedianAngle,
              y + (r / 5) * sinMedianAngle
            );

            // position label differently depending on the angle
            if (outerLabelAngleDeg >= 90 && outerLabelAngleDeg < 180) {
              // bottom left
              ctx.textAlign = "right";
              ctx.textBaseline = "top";
            } else if (outerLabelAngleDeg >= 180 && outerLabelAngleDeg < 270) {
              // top left
              ctx.textAlign = "right";
              ctx.textBaseline = "bottom";
            } else if (outerLabelAngleDeg >= 270) {
              // top right
              ctx.textAlign = "left";
              ctx.textBaseline = "bottom";
            } else {
              ctx.textAlign = "left";
              ctx.textBaseline = "top";
            }

            // draw angled line
            ctx.lineTo(outerLabelX, outerLabelY);
            ctx.stroke();
            // draw the outer label
            ctx.fillText(label, outerLabelX, outerLabelY);
          } else {
            // draw the label picking area
            // manually offsetting x and y to take the canvas text align into account
            var fontW = ctx.measureText(label).width;
            var fontH = parseInt(ctx.font.match(/\d+/), 11);
            var rectHeight = 12;

            if (outerLabelAngleDeg >= 90 && outerLabelAngleDeg < 180) {
              // bottom left
              ctx.rect(outerLabelX - fontW, outerLabelY, fontW, rectHeight);
            } else if (outerLabelAngleDeg >= 180 && outerLabelAngleDeg < 270) {
              // top left
              ctx.rect(
                outerLabelX - fontW,
                outerLabelY - fontH - 2,
                fontW,
                rectHeight
              );
            } else if (outerLabelAngleDeg >= 270) {
              // top right
              ctx.rect(outerLabelX, outerLabelY - fontH - 2, fontW, rectHeight);
            } else {
              // bottom right
              ctx.rect(outerLabelX, outerLabelY, fontW, rectHeight);
            }

            ctx.fillStyle = fillColor[i];
            ctx.fill();
          }
        }
      }
    }
  }

  roundDegToMultiOfTen(deg) {
    if (deg < 10) {
      return 10;
    } else if (deg >= 350) {
      return 360;
    } else {
      return Number(String(deg).slice(0, -1) + 0);
    }
  }

  toDegree(angle) {
    return angle * (180 / Math.PI);
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  findPos(obj) {
    var curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  // takes in 0-255 and turn it into rgb
  digToRgbStr(num) {
    return "rgb(0,0," + num * this.pieChartPickingColorOffSet + ")";
  }

  randomRgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  }

  drawBreakDownBars() {
    let colors = {
      peach: this.randomRgba(),
      peach1: this.randomRgba(),
      orange: this.randomRgba(),
      cyan: this.randomRgba(),
      red: this.randomRgba()
    };
    const rSet = new Set([0, 1]);
    const oSet = new Set([2, 3, 4, 5, 6]);
    let ub = 0;
    let lb = 10;
    const ctx = this.tooltipCanvas.getContext("2d");

    for (let i = 0; i < 10; i++) {
      let fillStyle;
      ctx.moveTo(0, ub);
      ctx.moveTo(0, lb);
      if (oSet.has(i)) {
        fillStyle = colors.orange;
      } else if (rSet.has(i)) {
        fillStyle = colors.red;
      } else {
        fillStyle = colors.cyan;
      }
      ctx.fillStyle = fillStyle;
      //x, y, w, h
      ctx.fillRect(20, lb, 20, 10);
      ctx.fillStyle = "black";
      ctx.fillText("TEST", 50, lb + 10);
      // move the drawing pointer down
      ub = lb;
      lb += 10;
    }
  }

  drawTooltip() {
    let colors = {
      peach: this.randomRgba(),
      peach1: this.randomRgba(),
      orange: this.randomRgba(),
      cyan: this.randomRgba(),
      red: this.randomRgba()
    };
    const rSet = new Set([0, 1]);
    const oSet = new Set([2, 3, 4, 5, 6]);
    let ub = 0;
    let lb = 10;
    const ctx = this.tooltipCanvas.getContext("2d");

    for (let i = 0; i < 10; i++) {
      let fillStyle;
      ctx.moveTo(0, ub);
      ctx.moveTo(0, lb);
      if (oSet.has(i)) {
        fillStyle = colors.orange;
      } else if (rSet.has(i)) {
        fillStyle = colors.red;
      } else {
        fillStyle = colors.cyan;
      }
      ctx.fillStyle = fillStyle;
      //x, y, w, h
      ctx.fillRect(20, lb, 20, 10);
      ctx.fillStyle = "black";
      ctx.fillText("TEST", 50, lb + 10);
      // move the drawing pointer down
      ub = lb;
      lb += 10;
    }
  }

  handleMouseMove = e => {
    var pos = this.findPos(this.pieChartCanvas);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var p = this.pieChartPickingCtx.getImageData(x, y, 1, 1).data;
    var currentColorIndex = p[2] / this.pieChartPickingColorOffSet - 1;
    var originalXOffset = 75;
    var originalYOffset = 15;

    // redraw the chart to "offset" the slice that is being hovered over
    // this.pieChartCtx.clearRect(0, 0, this.pieChartCanvasW, this.pieChartCanvasH);
    let pieChartColors = [];
    this.aggData.forEach(d => {
      pieChartColors.push(this.props.dataTypeToColorDict[d["type"]]);
    });
    this.drawPieChart(
      this.pieChartCtx,
      pieChartColors,
      pieChartColors[currentColorIndex]
    );

    if (p[2] !== 0 && p[3] === 255) {
      this.setState({
        toolTipLeft: e.clientX - originalXOffset,
        toolTipTop: e.clientY + originalYOffset,
        canvasToolTipVisibility: "visible",
        currentHovering: this.aggData[currentColorIndex]
      });
    } else {
      this.setState({
        ...this.state,
        canvasToolTipVisibility: "hidden"
      });
    }

    if (this.state.currentHovering !== this.aggData[currentColorIndex]) {
      // draw the bars
      // this.drawBreakDownBars();
    }
  };

  handleMouseOut = () => {
    this.setState({
      ...this.state,
      canvasToolTipVisibility: "hidden"
    });
  };

  render() {
    const { titleUnit } = this.props;
    const { currentHovering } = this.state;
    const styles = {
      chartContainer: {
        width: this.props.width
      },
      pieChartTitle: {
        fontSize: "25pt"
      },
      pickingCanvas: {
        display: "none"
      },
      tooltipContainer: {
        width: this.pieChartToolTipW,
        left: this.state.toolTipLeft,
        top: this.state.toolTipTop,
        visibility: this.state.canvasToolTipVisibility,
        zIndex: 9999
      }
    };
 
    return (
      <div
        className="pie-chart-container"
        style={{ width: styles.chartContainer.width }}
      >
        <div
          className="pie-chart-title"
          style={{ fontSize: styles.pieChartTitle.fontSize }}
        >
          <span>{this.title + " " + this.dataSum} </span>
          <span className="pie-chart-title-measurements">{titleUnit}</span>
        </div>
        <canvas
          style={styles.pickingCanvas}
          className="pie-chart-picking-canvas"
          ref="pieChartPickingCanvas"
          width={this.pieChartCanvasW}
          height={this.pieChartCanvasH}
        />
        <canvas
          className="pie-chart-canvas"
          ref="canvas"
          width={this.pieChartCanvasW}
          height={this.pieChartCanvasH}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="pie-chart-tooltip-container"
          style={styles.tooltipContainer}
        >
          <span className="pie-chart-tooltip-title">
            {currentHovering ? currentHovering["type"] : ""}
          </span>
          <br />
          <span className="pie-chart-tooltip-percent">
            {currentHovering ? currentHovering["value"]: ""}
          </span>
          <span className="pie-chart-tooltip-details">{titleUnit}</span>
          <br />
          <span className="pie-chart-tooltip-percent">
            {currentHovering
              ? Math.round(currentHovering["percent"].toFixed(2) * 100) + "%"
              : ""}
          </span>
          <span className="pie-chart-tooltip-details">of total</span>
          {/* <canvas className="pie-chart-tooltip-canvas" ref="tooltipCanvas" /> */}
        </div>
      </div>
    );
  }
}

export default PieChart;
