

function parseGraph(graph) {

    function Element(name, children = []) {
        this.name = name;
        this.children = children.slice();
        this.hasChildren = this.hasChildren();
    }
    Element.prototype.hasChildren = function () {

        return this.children.length !== 0 ? true : false;
    }

    let parsedGraph = [];

    let elementName = 0;
    let children = 1;

    for(let i = 0; i < graph.length; i++){

        let graphGroup = graph[i];
        let parsedGroup = [];

        for(let j = 0; j < graphGroup.length; j++){

            let newElement = new Element(graphGroup[j][elementName], graphGroup[j][children]);
            parsedGroup.push(newElement);
        }

        parsedGraph.push(parsedGroup);
    }

    return parsedGraph;
}

export default parseGraph;