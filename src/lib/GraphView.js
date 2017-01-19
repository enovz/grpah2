
import { Settings } from './Values'

export function GraphView(graph) {

    //view elements
    this._canvas = document.getElementById(graph.ID);
    this._context = this._canvas.getContext('2d');
    this._container = this._canvas.parentNode;

    //settings for scaling canvas drawings
    this.setCanvasSize(this._container);
    this._settings = new Settings(this._canvas, graph.data.graphAxis);

    //labels and dataPoints
    this._labels = graph.data.graphAxis;
    this.dataPoints = this.getDataPoints(graph.data.graphElements);

}
GraphView.prototype.setCanvasSize = function (container) {

    //aspectRatio
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    //canvas fill parent
    this._canvas.width = width;
    this._canvas.height = height;
}
GraphView.prototype.getDataPoints = function (graphData) {

    //DataPoint
    function DataPoint(name, x, y, radius) {

        this.name = name;
        this.shape = {
            x: x,
            y: y,
            radius: radius
        }
        this.surface = {
            left: x - radius,
            right: x + radius,
            top: y - radius,
            bottom: y + radius
        }
    }

    let dataPoints = [];

    for (let i = 0; i < graphData.length; i++) {

        let graphGroup = graphData[i];
        let row = ((i + 1) * this._settings.dataPoints.y)//100); // y = 100


        for (let j = 0; j < graphGroup.length; j++) {

            let col = ((j + 1) * this._settings.dataPoints.x); //100); //x = 100

            let dataPoint = new DataPoint(graphGroup[j].name, col, row, this._settings.dataPoints.radius);//25); //radius = 25
            dataPoints.push(dataPoint);
        }
    }

    return dataPoints;
}
GraphView.prototype.drawLabels = function () {

    this._context.font = this._settings.labels.getFont(); //'20px Arial'; //settings.getFont();
    this._context.fillStyle = this._settings.labels.color; //'green'; //settings.color;
    let offset = (Math.PI * 2);

    //collumns
    for (let i = 0; i < this._labels.collumns; i++) {

        //let col = (100 * (i + 1)) - offset;
        let col = (this._settings.dataPoints.x * (i + 1)) - offset;

        this._context.fillText((i + 1), col, this._settings.labels.y);
    }
    //rows
    for (let j = 0; j < this._labels.rows; j++) {

        //let row = (100 * (j + 1)) + offset;
        let row = (this._settings.dataPoints.y * (j + 1)) + offset;

        //transform numbers to letters
        let letter = String.fromCharCode((j + 65));
        this._context.fillText(letter, this._settings.labels.x, row);
    }

}
GraphView.prototype.getActiveDataPoint = function (x, y) {

    let clickedX = x - this._canvas.offsetLeft;
    let clickedY = y - this._canvas.offsetTop;

    for (var i = 0; i < this.dataPoints.length; i++) {

        let surface = this.dataPoints[i].surface;

        if (clickedX < surface.right && clickedX > surface.left && clickedY < surface.bottom && clickedY > surface.top) {

            //got clicked element
            let activeElement = this.dataPoints[i].name;
            return activeElement;
        }
    }

    return null;
}
GraphView.prototype.drawDataPoints = function () {

    function drawCircle(ctx, shape) {

        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#3498db";
        ctx.fill();
    }

    this.dataPoints.forEach(dataPoint => {

        drawCircle(this._context, dataPoint.shape);
    });
}
GraphView.prototype.drawDataPointRelations = function (relations) {

    //clear canvas
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    let dataPoints = this.dataPoints;
    let context = this._context;

    relations.forEach(relation => {
        //drawLine(relation, dataPoints, context);
        drawRelation(relation, dataPoints, context);
    });

    function drawRelation(realation, dataPoints, context) {

        //find start point
        let start = dataPoints.filter(dataPoint => {
            return dataPoint.name === realation.start
        })[0];

        //find end point
        let end = dataPoints.filter(dataPoint => {
            return dataPoint.name === realation.end;
        })[0];

        drawCircleOutline(start.shape, context);
        drawLine(start.shape, end.shape, context);
        drawCircleOutline(end.shape, context);
    }
    function drawLine(start, end, context) {

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);

        //style
        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.stroke();

    }
    function drawCircleOutline(point, ctx) {

        context.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, true);

        //style
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        //return to center of circle
        ctx.moveTo(point.x, point.y);
    }

}
GraphView.prototype.render = function (relations = []) {

    if (relations.length === 0) {

        this.drawLabels();
        this.drawDataPoints();
    }
    if (relations.length !== 0) {

        this.drawDataPointRelations(relations);
        this.drawLabels();
        this.drawDataPoints()

    }
}