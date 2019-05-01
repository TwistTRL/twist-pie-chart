## Required parameters
```javascript
<PieChart
    data={data}
    width={500}
    dataTypeToColorDict={this.dataTypeToColorDict}
    title={"Calories"} />
PieChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    dataTypeToColorDict: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}
```