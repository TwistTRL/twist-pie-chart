"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./PieChart.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = function (_PureComponent) {
  _inherits(PieChart, _PureComponent);

  function PieChart(props) {
    _classCallCheck(this, PieChart);

    var _this = _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, props));

    _this.handleMouseMove = function (e) {
      var pos = _this.findPos(_this.pieChartCanvas);
      var x = e.pageX - pos.x;
      var y = e.pageY - pos.y;
      var p = _this.pieChartPickingCtx.getImageData(x, y, 1, 1).data;
      var currentColorIndex = p[2] / _this.pieChartPickingColorOffSet - 1;
      var originalXOffset = 75;
      var originalYOffset = 15;

      // redraw the chart to "offset" the slice that is being hovered over
      // this.pieChartCtx.clearRect(0, 0, this.pieChartCanvasW, this.pieChartCanvasH);
      var pieChartColors = [];
      _this.aggData.forEach(function (d) {
        pieChartColors.push(_this.props.dataTypeToColorDict[d["type"]]);
      });
      _this.drawPieChart(_this.pieChartCtx, pieChartColors, pieChartColors[currentColorIndex]);

      if (p[2] !== 0 && p[3] === 255) {
        _this.setState({
          toolTipLeft: e.clientX - originalXOffset,
          toolTipTop: e.clientY + originalYOffset,
          canvasToolTipVisibility: "visible",
          currentHovering: _extends({}, _this.aggData[currentColorIndex], {
            color: pieChartColors[currentColorIndex]
          })
        });
      } else {
        _this.setState(_extends({}, _this.state, {
          canvasToolTipVisibility: "hidden"
        }));
      }

      if (_this.state.currentHovering !== _this.aggData[currentColorIndex]) {
        // draw the bars
        // this.drawBreakDownBars();
      }
    };

    _this.handleMouseOut = function () {
      _this.setState(_extends({}, _this.state, {
        canvasToolTipVisibility: "hidden"
      }));
    };

    _this.data = _this.props.data;
    _this.title = _this.props.title;
    _this.typeToColorDict = _this.props.dataTypeToColorDict;
    _this.pieChartCtx = null;
    _this.pieChartPickingCtx = null;

    _this.pieChartCanvasW = _this.props.width;
    _this.pieChartCanvasH = 400;
    _this.pieChartToolTipW = 120;
    _this.pieChartToolTipH = 190;
    _this.pieChartToolTipOffsetY = 60;

    _this.state = {
      canvasToolTipVisibility: "hidden",
      toolTipLeft: _this.pieChartCanvasW - _this.pieChartToolTipW,
      toolTipTop: _this.pieChartCanvasH - _this.pieChartToolTipH + _this.pieChartToolTipOffsetY
    };

    // pie chart data setup
    _this.colorToDataTypeDict = {};
    _this.pieChartColors = [];
    _this.pieChartPickingColors = [];
    _this.pieChartPickingColorOffSet = 7;

    for (var i = 1; i <= _this.data.length; i++) {
      _this.pieChartPickingColors.push(_this.digToRgbStr(i));
    }
    return _this;
  }

  _createClass(PieChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

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
      var pieChartColors = [];
      this.aggData.forEach(function (d) {
        pieChartColors.push(_this2.props.dataTypeToColorDict[d["type"]]);
      });
      this.drawPieChart(this.pieChartCtx, pieChartColors);
      this.drawPieChart(this.pieChartPickingCtx, this.pieChartPickingColors, " ", true);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      this.data = this.props.data;
      this.title = this.props.title;
      this.typeToColorDict = this.props.dataTypeToColorDict;
      this.aggData = this.aggTheData(this.data);
      this.pieChartPickingColors = [];
      for (var i = 1; i <= this.aggData.length; i++) {
        this.pieChartPickingColors.push(this.digToRgbStr(i));
      }
      var pieChartColors = [];
      this.aggData.forEach(function (d) {
        pieChartColors.push(_this3.props.dataTypeToColorDict[d["type"]]);
      });
      if (this.state.canvasToolTipVisibility === "hidden") {
        this.drawPieChart(this.pieChartCtx, pieChartColors);
        this.drawPieChart(this.pieChartPickingCtx, this.pieChartPickingColors, " ", true);
      }
    }
  }, {
    key: "aggTheData",
    value: function aggTheData(rawData) {
      var _this4 = this;

      var aggData = [];
      var aggDataTypeTable = {};
      this.dataSum = 0;
      this.pieChartColors = [];

      rawData.forEach(function (d) {
        _this4.dataSum += d.value;
        if (!aggDataTypeTable[d.type]) {
          aggDataTypeTable[d.type] = { value: d.value };
        } else {
          aggDataTypeTable[d.type] = {
            value: aggDataTypeTable[d.type]["value"] += d.value
          };
        }
      });

      Object.keys(aggDataTypeTable).forEach(function (key, index) {
        var type = aggDataTypeTable[key];
        _this4.pieChartColors.push(_this4.typeToColorDict[key]);
        type["percent"] = type["value"] / _this4.dataSum;
        type["rad"] = type["percent"] * 2 * Math.PI;
        type["type"] = key;
        _this4.colorToDataTypeDict[_this4.pieChartColors[index]] = type;
        aggData[index] = type;
      });

      aggData.sort(function (a, b) {
        return a.rad - b.rad;
      });

      return aggData;
    }

    // pass in data too

  }, {
    key: "drawPieChart",
    value: function drawPieChart(ctx, colors) {
      var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var isPickingCanvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var offset = 10;
      var beginAngle = 0;
      var endAngle = 0;
      var r, x, y, offsetX, offsetY, medianAngleRad, cosMedianAngle, sinMedianAngle;
      var cx = this.pieChartCanvasW / 2;
      var cy = this.pieChartCanvasH / 2 + 30;
      var label = "ERROR";
      var fillColor = "";
      var maxUsedOuterLabelAngleDeg = 0;
      var outerLabelAngleDeg;

      if (ctx) {
        ctx.clearRect(0, 0, this.pieChartCanvasW, this.pieChartCanvasH);

        for (var i = 0; i < this.aggData.length; i++) {
          r = isPickingCanvas ? this.pieChartCanvasW / 4 + 10 : this.pieChartCanvasW / 4;
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
          outerLabelAngleDeg = this.roundDegToMultiOfTen(this.toDegree(medianAngleRad));
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
          ctx.font = selected !== fillColor ? "bold 10pt MuseoSans" : "900 10pt MuseoSans";
          ctx.fillStyle = isPickingCanvas ? fillColor : "#1f589d";

          if (this.aggData[i].percent > 0.15) {
            if (!isPickingCanvas) {
              // draw the inner label
              ctx.fillText(label, x, y);
            }
          } else {
            var outerLabelCosMedianAngle = Math.cos(this.toRadians(outerLabelAngleDeg));
            var outerLabelSinMedianAngle = Math.sin(this.toRadians(outerLabelAngleDeg));
            // modify the radius for the picking canvas so that label rect is drawn at the same position
            // as the visible canvas
            var outerLabelR = isPickingCanvas ? r -= 10 : r;
            var outerLabelX = cx + outerLabelR * 0.8 * outerLabelCosMedianAngle + outerLabelR / 2 * outerLabelCosMedianAngle;
            var outerLabelY = cy + outerLabelR * 0.9 * outerLabelSinMedianAngle + outerLabelR / 2 * outerLabelSinMedianAngle;

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
              ctx.lineTo(x + r / 5 * cosMedianAngle, y + r / 5 * sinMedianAngle);

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
                ctx.rect(outerLabelX - fontW, outerLabelY - fontH - 2, fontW, rectHeight);
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
  }, {
    key: "roundDegToMultiOfTen",
    value: function roundDegToMultiOfTen(deg) {
      if (deg < 10) {
        return 10;
      } else if (deg >= 350) {
        return 360;
      } else {
        return Number(String(deg).slice(0, -1) + 0);
      }
    }
  }, {
    key: "toDegree",
    value: function toDegree(angle) {
      return angle * (180 / Math.PI);
    }
  }, {
    key: "toRadians",
    value: function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: "findPos",
    value: function findPos(obj) {
      var curleft = 0,
          curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
      }
      return undefined;
    }

    // takes in 0-255 and turn it into rgb

  }, {
    key: "digToRgbStr",
    value: function digToRgbStr(num) {
      return "rgb(0,0," + num * this.pieChartPickingColorOffSet + ")";
    }
  }, {
    key: "randomRgba",
    value: function randomRgba() {
      var o = Math.round,
          r = Math.random,
          s = 255;
      return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + r().toFixed(1) + ")";
    }
  }, {
    key: "drawBreakDownBars",
    value: function drawBreakDownBars() {
      var colors = {
        peach: this.randomRgba(),
        peach1: this.randomRgba(),
        orange: this.randomRgba(),
        cyan: this.randomRgba(),
        red: this.randomRgba()
      };
      var rSet = new Set([0, 1]);
      var oSet = new Set([2, 3, 4, 5, 6]);
      var ub = 0;
      var lb = 10;
      var ctx = this.tooltipCanvas.getContext("2d");

      for (var i = 0; i < 10; i++) {
        var fillStyle = void 0;
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
  }, {
    key: "drawTooltip",
    value: function drawTooltip() {
      var colors = {
        peach: this.randomRgba(),
        peach1: this.randomRgba(),
        orange: this.randomRgba(),
        cyan: this.randomRgba(),
        red: this.randomRgba()
      };
      var rSet = new Set([0, 1]);
      var oSet = new Set([2, 3, 4, 5, 6]);
      var ub = 0;
      var lb = 10;
      var ctx = this.tooltipCanvas.getContext("2d");

      for (var i = 0; i < 10; i++) {
        var fillStyle = void 0;
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
  }, {
    key: "render",
    value: function render() {
      var titleUnit = this.props.titleUnit;
      var currentHovering = this.state.currentHovering;

      var styles = {
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

      return _react2.default.createElement(
        "div",
        {
          className: "pie-chart-container",
          style: { width: styles.chartContainer.width }
        },
        _react2.default.createElement(
          "div",
          {
            className: "pie-chart-title",
            style: { fontSize: styles.pieChartTitle.fontSize }
          },
          _react2.default.createElement(
            "span",
            null,
            this.title + " " + this.dataSum,
            " "
          ),
          _react2.default.createElement(
            "span",
            { className: "pie-chart-title-measurements" },
            titleUnit
          )
        ),
        _react2.default.createElement("canvas", {
          style: styles.pickingCanvas,
          className: "pie-chart-picking-canvas",
          ref: "pieChartPickingCanvas",
          width: this.pieChartCanvasW,
          height: this.pieChartCanvasH
        }),
        _react2.default.createElement("canvas", {
          className: "pie-chart-canvas",
          ref: "canvas",
          width: this.pieChartCanvasW,
          height: this.pieChartCanvasH,
          onMouseMove: this.handleMouseMove,
          onMouseOut: this.handleMouseOut
        }),
        currentHovering ? _react2.default.createElement(
          "div",
          {
            className: "pie-chart-tooltip-container",
            style: styles.tooltipContainer
          },
          _react2.default.createElement(
            "div",
            {
              className: "pie-chart-tooltip-title-container",
              style: {
                backgroundColor: currentHovering["color"] ? currentHovering["color"] : "white"
              }
            },
            _react2.default.createElement(
              "span",
              { className: "pie-chart-tooltip-title" },
              currentHovering["type"] ? currentHovering["type"] : ""
            )
          ),
          _react2.default.createElement(
            "span",
            { className: "pie-chart-tooltip-percent" },
            currentHovering["value"] ? currentHovering["value"] : ""
          ),
          _react2.default.createElement(
            "span",
            { className: "pie-chart-tooltip-details" },
            titleUnit
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "span",
            { className: "pie-chart-tooltip-percent" },
            currentHovering["percent"] ? Math.round(currentHovering["percent"].toFixed(2) * 100) + "%" : ""
          ),
          _react2.default.createElement(
            "span",
            { className: "pie-chart-tooltip-details" },
            "of total"
          )
        ) : null
      );
    }
  }]);

  return PieChart;
}(_react.PureComponent);

exports.default = PieChart;