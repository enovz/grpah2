
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
import drawDataPoints from './drawDataPoints'
import drawLabels from './drawLabels'

//Chart
function Chart(chartId, graph = []) {

    this._chartId = chartId;
    this._chartData = parseGraph(graph);
    this._view = {};
    this._dataPoints = [];

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
Chart.prototype.render = function () {

    let settings = {
        texts: {
            size: 20,
            unit: "px",
            style: "Arial",
            color: "green",
            getFont: function () {
                return "" + settings.texts.size + settings.texts.unit + " " + settings.texts.style;
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

    //get view
    this._view = this.getView(this._chartId);

    this._labels = drawLabels(this._chartData, this._view.context, settings.texts);
    this._dataPoints = drawDataPoints(this._chartData, this._view.context, settings.arcs.radius);

}
Chart.prototype.elementClick = function (event) {

    let clickedX = event.pageX - this._view.canvas.offsetLeft;
    let clickedY = event.pageY - this._view.canvas.offsetTop;

    for (var i = 0; i < this._dataPoints.length; i++) {

        let position = this._dataPoints[i].position;

        if (clickedX < position.right && clickedX > position.left && clickedY < position.bottom && clickedY > position.top) {

            //got clicked element
            console.log(this._dataPoints[i]);
        }
    }
}
Chart.prototype.init = function () {

    //render view
    this.render();

    //events
    window.onresize = this.render.bind(this);
    this._view.canvas.addEventListener('click', this.elementClick.bind(this), false);

}


export default Chart;



