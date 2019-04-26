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

        _initialiseProps.call(_this);

        _this.data = _this.props.data;
        _this.title = _this.props.title;
        _this.typeToColorDict = _this.props.dataTypeToColorDict;
        _this.pieChartCtx = null;
        _this.pieChartPickingCtx = null;

        _this.pieChartCanvasW = 350;
        _this.pieChartCanvasH = 400;
        _this.pieChartToolTipW = 150;
        _this.pieChartToolTipH = 190;
        _this.pieChartToolTipOffsetY = 60;

        _this.state = {
            canvasToolTipVisibility: "hidden",
            toolTipLeft: _this.pieChartCanvasW - _this.pieChartToolTipW,
            toolTipTop: _this.pieChartCanvasH - _this.pieChartToolTipH + _this.pieChartToolTipOffsetY

            // pie chart data setup
        };_this.colorToDataTypeDict = {};
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
            this.aggData.map(function (d) {
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
            this.aggData.map(function (d) {
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
            var dataSum = 0;
            this.pieChartColors = [];

            rawData.map(function (d) {
                dataSum += d.value;
                if (!aggDataTypeTable[d.type]) {
                    aggDataTypeTable[d.type] = { "value": d.value };
                } else {
                    aggDataTypeTable[d.type] = { "value": aggDataTypeTable[d.type]["value"] += d.value };
                }
            });

            Object.keys(aggDataTypeTable).map(function (key, index) {
                var type = aggDataTypeTable[key];
                _this4.pieChartColors.push(_this4.typeToColorDict[key]);
                type["percent"] = type["value"] / dataSum;
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


        // takes in 0-255 and turn it into rgb

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
        key: "render",
        value: function render() {
            var styles = {
                pickingCanvas: {
                    display: "none"
                },
                tooltipContainer: {
                    width: this.pieChartToolTipW,
                    height: this.pieChartToolTipH,
                    left: this.state.toolTipLeft,
                    top: this.state.toolTipTop,
                    visibility: this.state.canvasToolTipVisibility,
                    zIndex: 9999
                }
            };
            return _react2.default.createElement(
                "div",
                { className: "pie-chart-container" },
                _react2.default.createElement(
                    "div",
                    { className: "pie-chart-title" },
                    _react2.default.createElement(
                        "span",
                        null,
                        this.title + " " + this.dataSum,
                        " "
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "pie-chart-title-measurements" },
                        "mL/kg/day"
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
                _react2.default.createElement(
                    "div",
                    {
                        className: "pie-chart-tooltip-container",
                        style: styles.tooltipContainer },
                    _react2.default.createElement(
                        "span",
                        { className: "pie-chart-tooltip-title" },
                        this.state.currentHovering ? this.state.currentHovering["type"] : ""
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "span",
                        { className: "pie-chart-tooltip-percent" },
                        this.state.currentHovering ? Math.round(this.state.currentHovering["percent"].toFixed(2) * 100) + "% " : ""
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "pie-chart-tooltip-details" },
                        "of total"
                    ),
                    _react2.default.createElement("canvas", {
                        className: "pie-chart-tooltip-canvas",
                        ref: "tooltipCanvas"
                    })
                )
            );
        }
    }]);

    return PieChart;
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this5 = this;

    this.drawPieChart = function (ctx, colors) {
        var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var isPickingCanvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var offset = 10;
        var beginAngle = 0;
        var endAngle = 0;
        var r, x, y, offsetX, offsetY, medianAngleRad, cosMedianAngle, sinMedianAngle;
        var cx = _this5.pieChartCanvasW / 2;
        var cy = _this5.pieChartCanvasH / 2 + 30;
        var label = "ERROR";
        var fillColor = "";
        var maxUsedOuterLabelAngleDeg = 0;
        var outerLabelAngleDeg;

        if (ctx) {
            ctx.canvas.width = ctx.canvas.width;
            ctx.clearRect(0, 0, _this5.pieChartCanvasW, _this5.pieChartCanvasH);

            for (var i = 0; i < _this5.aggData.length; i++) {
                r = isPickingCanvas ? _this5.pieChartCanvasW / 4 + 10 : _this5.pieChartCanvasW / 4;
                label = _this5.aggData[i].type;
                beginAngle = endAngle;
                endAngle = endAngle + _this5.aggData[i].rad;
                medianAngleRad = (endAngle + beginAngle) / 2;
                cosMedianAngle = Math.cos(medianAngleRad);
                sinMedianAngle = Math.sin(medianAngleRad);
                x = cx + r * 0.60 * cosMedianAngle;
                y = cy + r * 0.60 * sinMedianAngle;
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
                outerLabelAngleDeg = _this5.roundDegToMultiOfTen(_this5.toDegree(medianAngleRad));
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
                ctx.fillStyle = isPickingCanvas ? fillColor : '#1f589d';

                if (_this5.aggData[i].percent > 0.15) {
                    if (!isPickingCanvas) {
                        // draw the inner label
                        ctx.fillText(label, x, y);
                    }
                } else {
                    var outerLabelCosMedianAngle = Math.cos(_this5.toRadians(outerLabelAngleDeg));
                    var outerLabelSinMedianAngle = Math.sin(_this5.toRadians(outerLabelAngleDeg));
                    // modify the radius for the picking canvas so that label rect is drawn at the same position
                    // as the visible canvas
                    var outerLabelR = isPickingCanvas ? r -= 10 : r;
                    var outerLabelX = cx + outerLabelR * 0.80 * outerLabelCosMedianAngle + outerLabelR / 2 * outerLabelCosMedianAngle;
                    var outerLabelY = cy + outerLabelR * 0.90 * outerLabelSinMedianAngle + outerLabelR / 2 * outerLabelSinMedianAngle;

                    if (!isPickingCanvas) {
                        if (_this5.aggData[i].percent > 0.15) {
                            // draw the inner label
                            ctx.fillText(label, x, y);
                        }

                        // draw the label line
                        x = cx + r * 0.90 * cosMedianAngle;
                        y = cy + r * 0.90 * sinMedianAngle;
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
    };

    this.roundRadUp = function (rad) {
        if (rad < 0.1) {
            return 0.1;
        } else if (rad >= 6.2) {
            return 0;
        } else {
            var newRad = rad += 0.1;
            return parseFloat(newRad.toFixed(1));
        }
    };

    this.roundDegToMultiOfTen = function (deg) {
        if (deg < 10) {
            return 10;
        } else if (deg >= 350) {
            return 360;
        } else {
            return Number(String(deg).slice(0, -1) + 0);
        }
    };

    this.toDegree = function (angle) {
        return angle * (180 / Math.PI);
    };

    this.toRadians = function (angle) {
        return angle * (Math.PI / 180);
    };

    this.findPos = function (obj) {
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
    };

    this.rgbToHex = function (r, g, b) {
        if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
        return (r << 16 | g << 8 | b).toString(16).toUpperCase();
    };

    this.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    this.digToRgbStr = function (num) {
        return "rgb(0,0," + num * _this5.pieChartPickingColorOffSet + ")";
    };

    this.randomRgba = function () {
        var o = Math.round,
            r = Math.random,
            s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    };

    this.handleMouseMove = function (e) {
        var pos = _this5.findPos(_this5.pieChartCanvas);
        var x = e.pageX - pos.x;
        var y = e.pageY - pos.y;
        var p = _this5.pieChartPickingCtx.getImageData(x, y, 1, 1).data;
        var currentColorIndex = p[2] / _this5.pieChartPickingColorOffSet - 1;
        var originalXOffset = 75;
        var originalYOffset = 15;

        // redraw the chart to "offset" the slice that is being hovered over
        // this.pieChartCtx.clearRect(0, 0, this.pieChartCanvasW, this.pieChartCanvasH);
        var pieChartColors = [];
        _this5.aggData.map(function (d) {
            pieChartColors.push(_this5.props.dataTypeToColorDict[d["type"]]);
        });
        _this5.drawPieChart(_this5.pieChartCtx, pieChartColors, pieChartColors[currentColorIndex]);

        console.log(p, currentColorIndex, _this5.pieChartPickingColors);

        if (p[2] !== 0 && p[3] === 255) {
            _this5.setState({
                toolTipLeft: e.clientX - originalXOffset,
                toolTipTop: e.clientY + originalYOffset,
                canvasToolTipVisibility: "visible",
                currentHovering: _this5.aggData[currentColorIndex]
            });
        } else {
            _this5.setState(_extends({}, _this5.state, {
                canvasToolTipVisibility: "hidden"
            }));
        }

        if (_this5.state.currentHovering !== _this5.aggData[currentColorIndex]) {
            // draw the bars
            _this5.drawBreakDownBars();
        }
    };

    this.handleMouseOut = function () {
        _this5.setState(_extends({}, _this5.state, {
            canvasToolTipVisibility: "hidden"
        }));
    };
};

exports.default = PieChart;