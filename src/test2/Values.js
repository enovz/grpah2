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

//View Elements
//test with axis
export function ViewElements(graphId) {

    //view elements
    this.canvas = document.getElementById(graphId);
    this.context = this.canvas.getContext('2d');

    let container = this.canvas.parentNode;

    //aspectRatio
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    this.ratio = (this.width / this.height);

    //canvas fill parent
    this.canvas.width = width;
    this.canvas.height = height;

}

//Settings
export function Settings(graphId, axis) {

    /*1. define start point from center of canvas
      2. define start point for labels
      3. define start point for dataPoints
      */


    //view elements
    let canvas = document.getElementById(graphId);
    let container = canvas.parentNode;

    //aspectRatio
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    //dataPoints is inner
    let dataPointsY = Math.floor(height / axis.rows) / 2;
    let dataPointsX = Math.floor(width / axis.collumns) / 2;
    let dataPointsRadius = Math.floor(dataPointsX / 4);

    //labels is outter
    let labelsY = Math.floor(dataPointsY / 2);
    let labelsX = Math.floor(dataPointsX / 2);
    let labelRatio = 1;

    //test
    if (labelsX > labelsY) {
        labelRatio = labelsY / labelsX;
    }
    else {
        labelRatio = labelsX / labelsY;
    }

    this.labels = {
        size: 20 * labelRatio, //test
        unit: "px",
        style: "Arial",
        color: "green",
        getFont: function () {
            return "" + this.size + this.unit + " " + this.style;
        },
        x: labelsX,
        y: labelsY
    }
    this.dataPoints = {
        x: dataPointsX,
        y: dataPointsY,
        radius: dataPointsRadius,
    }
}