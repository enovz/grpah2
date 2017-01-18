
/**Graph
 * 
 * Domain problem:
 *      1. Represent a collection of data as an interactive graph
 * 
 * Model: 
 *      1. entities : 
 *              1. Graph => unique by id
 *              2. Graph Elements => unique by id 
 *      2. values: 
 *              1. relations => array of relations between graph elements
 *              2. view => object containing information for drawing functions
 * 
 * Graph:
 *      Properites:
 *          1. id => canvas id 
 *          2. graphData  => array of graphElements
 * 
 *      Behaviour:
 *          3. getRelations(graphElement) => return array of relations to graphElement
 * 
 * graphElement
*/

//REFACTOR

import parseGraph from './parseGraph'
import drawDataPoints from './drawDataPoints'
import drawLabels from './drawLabels'
import getRelations from './getRelations'

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

    //drawLabels does not have a return
    drawLabels(this._chartData, this._view.context, settings.texts);
    //drawDataPoints has a return of dataPoints
    this._dataPoints = drawDataPoints(this._chartData, this._view.context, settings.arcs.radius);

}
Chart.prototype.elementSelected = function (event) {

    let clickedX = event.pageX - this._view.canvas.offsetLeft;
    let clickedY = event.pageY - this._view.canvas.offsetTop;

    for (var i = 0; i < this._dataPoints.length; i++) {

        //change position into surface !!!!!!!!!
        let position = this._dataPoints[i].position;

        if (clickedX < position.right && clickedX > position.left && clickedY < position.bottom && clickedY > position.top) {

            //got clicked element and got relations
            let relations = getRelations(this._dataPoints[i].name, this._chartData);
            console.log(relations);
            //draw relations
        }
    }
}
Chart.prototype.init = function () {

    //render view
    this.render();

    //events
    window.onresize = this.render.bind(this);
    this._view.canvas.addEventListener('click', this.elementSelected.bind(this), false);

}

export default Chart;



