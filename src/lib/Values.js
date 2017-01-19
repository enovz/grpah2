/**Values */

//Graph Data
export function GraphData(graph = []) {

    this.graphElements = getGraphElements(graph);
    this.graphAxis = getGraphAxis(graph);

}
function getGraphAxis(graph) {

    let rowsAxis = graph.length;

    let collumnsAxis = 0;

    graph.forEach(collumn => {
        if (collumn.length > collumnsAxis) {
            collumnsAxis = collumn.length;
        }
    })

    return {
        rows: (rowsAxis),
        collumns: (collumnsAxis)
    }
}
function getGraphElements(graph) {

    //Graph Element
    function GraphElement(name, children = []) {
        this.name = name;
        this.children = children.slice();
        this.hasChildren = this.hasChildren();
    }
    GraphElement.prototype.hasChildren = function () {

        return this.children.length !== 0 ? true : false;
    }

    //parsedGraph holds graph elements
    let parsedGraph = [];

    let elementName = 0;
    let children = 1;

    for (let i = 0; i < graph.length; i++) {

        let graphGroup = graph[i];
        let parsedGroup = [];

        for (let j = 0; j < graphGroup.length; j++) {

            let newElement = new GraphElement(graphGroup[j][elementName], graphGroup[j][children]);
            parsedGroup.push(newElement);
        }

        parsedGraph.push(parsedGroup);
    }

    return parsedGraph;

}

//Settings

export function Settings(canvas, axis) {

    this.dataPoints = dataPointsSettings(canvas, axis);
    this.labels = lablesSettings(this.dataPoints.x, this.dataPoints.y)

    //console.log(ratio);
    console.log(this.dataPoints);
    console.log(this.labels);
}
function dataPointsSettings(canvas, axis) {
    //aspectRatio
    let ratio = (canvas.width / canvas.height);

    //test
    let dataPointsY = 1;
    let dataPointsX = 1;
    let dataPointsRadius = 1;


    if (ratio > 1) {
        dataPointsY = Math.floor((canvas.height / axis.rows) / ratio);
        dataPointsX = Math.floor((canvas.width / axis.collumns) / ratio);

        if (dataPointsX > dataPointsY) {
            dataPointsRadius = Math.floor(dataPointsX / 4);
        }
        else {
            dataPointsRadius = Math.floor(dataPointsY / 4);
        }
    }
    if (ratio < 1) {
        dataPointsY = Math.floor((canvas.height / axis.rows) * ratio);
        dataPointsX = Math.floor((canvas.width / axis.collumns) * ratio)

        if (dataPointsX > dataPointsY) {
            dataPointsRadius = Math.floor(dataPointsX / 4);
        }
        else {
            dataPointsRadius = Math.floor(dataPointsY / 4);
        }
    }

    return {
        x: dataPointsX,
        y: dataPointsY,
        radius: dataPointsRadius,
    }
}
function lablesSettings(dataPointX, dataPointY) {

    //labels
    let labelsY = Math.floor(dataPointY / 2);
    let labelsX = Math.floor(dataPointX / 2);
    let labelRatio = 1;

    //test
    if (labelsX > labelsY) {
        labelRatio = labelsY / labelsX;
    }
    else {
        labelRatio = labelsX / labelsY;
    }

    return {
        size: Math.floor(20 * labelRatio), //test
        unit: "px",
        style: "Arial",
        color: "green",
        getFont: function () {
            return "" + this.size + this.unit + " " + this.style;
        },
        x: labelsX,
        y: labelsY
    }
}