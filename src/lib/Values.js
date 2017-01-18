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
export function ViewElements(graphId) {

    //view elements
    this.canvas = document.getElementById(graphId);
    this.context = this.canvas.getContext('2d');
    this.container = this.canvas.parentNode;

    //aspectRatio
    let width = this.container.offsetWidth;
    let height = this.container.offsetHeight;
    this.ratio = (this.width / this.height);

    //canvas fill parent
    this.canvas.width = width;
    this.canvas.height = height;

}