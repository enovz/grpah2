
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

import parseGraph from './parseGraph'
import DataPoint from './DataPoint'

//Chart
function Chart(chartId, graph = []) {

    this._chartId = chartId;
    this._chartData = parseGraph(graph.slice());
    this._view = {};
    this._dataPoints = [];

    //events
    //window.onresize = this.render.bind(this);
}

//refactor

/*Chart.prototype.render = function () {

    //get view
    this._view = this.getView(this._chartId);

    //refresh
    this.refresh(this._view);
}*/
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
Chart.prototype.render = function () {

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

    //test
    //get view
    this._view = this.getView(this._chartId);

    //this.drawLabels(this._chartData, view, settings.texts);
    this._dataPoints = this.drawDataPoints(this._chartData, this._view, settings.arcs);


}
Chart.prototype.drawDataPoints = function (chartData, view, settings) {

    let dataPoints = [];

    for (let i = 0; i < chartData.length; i++) {

        let elementsGroup = chartData[i];
        let row = ((i + 1) * 100);

        for (let j = 0; j < elementsGroup.length; j++) {

            let col = ((j + 1) * 100);

            let dataPoint = new DataPoint(view.context, col, row, settings.radius);
            dataPoints.push(dataPoint);
        }
    }

    return dataPoints;

}
Chart.prototype.init = function () {

    //render view
    this.render();

    //events
    window.onresize = this.render.bind(this);
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
/**
 * $('#myCanvas').click(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
     
    for (var i = 0; i < circles.length; i++) {
        if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
            alert ('clicked number ' + (i + 1));
        }
    }
});
 */