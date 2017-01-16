
/**Chart
 * 1. takes container and data:
 *      1.2. container is parent
 *      1.3. data is chart data
 * 
 * 2. properties:
 *      2.1. container
 *      2.2. data
 *      2.3. width / height
 * 
 * 3. behaviour:
 *      3.1. 
 */

import DataPoint from './DataPoint'

//Chart
function Chart(chartId, data = []) {

    this._chartId = chartId;
    this._chartData = data;
    //events
    window.onresize = this.render.bind(this);
}

Chart.prototype.render = function () {

    //get view
    this._view = this.getView(this._chartId);

    //refresh
    this.refresh(this._view);
}
Chart.prototype.getView = function (chartId) {

    //view elements
    let canvas = document.getElementById(chartId);
    let context = canvas.getContext('2d');
    let container = canvas.parentNode;

    //aspectRatio
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let ratio = (width / height);

    //canvas fill parent
    canvas.width = width;
    canvas.height = height;

    return {
        canvas: canvas,
        context: context,
        container: container,
        aspectRatio: ratio
    }
}
Chart.prototype.refresh = function (view) {


    let settings = {
        texts: {
            size: 20,
            unit: "px",
            style: "Arial",
            color: "green",
            getFont: function () {
                return "" + defaultSettings.texts.size + defaultSettings.texts.unit + " " + defaultSettings.texts.style;
            },
            x: 50,
            y: 50
        },
        arcs: {
            x: 80,
            y: 80,
            radius: 20,
            startAngle: 0,
            endAngle: Math.PI * 2,
            counterClockwiseValue: true
        }
    };
    
    //this.drawLabels
    this.drawDataPoints(this._chartData, view, settings.arcs);


}
Chart.prototype.drawDataPoints = function(dataPoints, view, settings){

    let datapoints = [];

    let dataPoint = new DataPoint(view, settings);
   
}
Chart.prototype.init = function () {

    this.render();
}


export default Chart;

/*let defaultSettings = {
    graph: graphData,
    canvasName: canvasName,
    texts: {
        size: 80,
        unit: "px",
        style: "Arial",
        color: "green",
        getFont: function () {
            return "" + defaultSettings.texts.size + defaultSettings.texts.unit + " " + defaultSettings.texts.style;
        },
        x: 50,
        y: 50
    },
    arcs: {
        centerX: 25,
        centerY: 25,
        radius: 25,
        startAngle: 0,
        endAngle: Math.PI * 2,
        counterClockwiseValue: true
    }
};*/