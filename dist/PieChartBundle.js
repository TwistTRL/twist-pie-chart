"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PieChart = require("./PieChart");

var _PieChart2 = _interopRequireDefault(_PieChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChartBundle = function (_PureComponent) {
    _inherits(PieChartBundle, _PureComponent);

    function PieChartBundle() {
        _classCallCheck(this, PieChartBundle);

        return _possibleConstructorReturn(this, (PieChartBundle.__proto__ || Object.getPrototypeOf(PieChartBundle)).apply(this, arguments));
    }

    _createClass(PieChartBundle, [{
        key: "render",
        value: function render() {
            var data1 = [{ value: 1, type: "MEDS" }, { value: 1, type: "FLUSHES" }, { value: 20, type: "FEEDS" }, { value: 10, type: "FEEDS" }, { value: 1, type: "TPN" }, { value: 1, type: "Tgdfs" }, { value: 1, type: "gfdsg" }, { value: 1, type: "ggfr" }, { value: 1, type: "4ggf" }, { value: 1, type: "oggm" }, { value: 5, type: "flac" }, { value: 10, type: "ps4" }, { value: 10, type: "ps5" }, { value: 10, type: "xbox" }, { value: 10, type: "lol" }, { value: 1, type: "fswwf" }, { value: 10, type: "lolra" }, { value: 10, type: "lolfde" }, { value: 10, type: "loefefl" }, { value: 10, type: "ps4324" }, { value: 10, type: "ps5433" }, { value: 10, type: "xbo4334x" }, { value: 10, type: "lo434l" }, { value: 1, type: "fsw433wf" }, { value: 10, type: "lol434ra" }, { value: 10, type: "loltgfde" }, { value: 5, type: "loefgrgrefl" }];

            var data2 = [{ value: 1, type: "MEDS" }, { value: 1, type: "FLUSHES" }, { value: 20, type: "FEEDS" }, { value: 10, type: "FEEDS" }, { value: 1, type: "TPN" }];

            var data3 = [{ value: 10, type: "MEDS" }, { value: 1, type: "FLUSHES" }, { value: 7, type: "FEEDS" }, { value: 10, type: "FEEDS" }, { value: 10, type: "TPN" }];

            var dataTypeToColorDict = {
                MEDS: "#C2EEF8",
                FLUSHES: "#5DD2EF",
                TPN: "#84A5D5",
                FEEDS: "#A3DBDC",
                lol434ra: "#C13BDA",
                xbo4334x: "#613BFA"
            };

            var title = "Fluids";

            return _react2.default.createElement(
                "div",
                { className: "pie-charts-wrap" },
                _react2.default.createElement(_PieChart2.default, {
                    data: data2,
                    dataTypeToColorDict: dataTypeToColorDict,
                    title: "Calories"
                }),
                _react2.default.createElement(_PieChart2.default, {
                    data: data3,
                    dataTypeToColorDict: dataTypeToColorDict,
                    title: title
                })
            );
        }
    }]);

    return PieChartBundle;
}(_react.PureComponent);

exports.default = PieChartBundle;