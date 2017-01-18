/**Masive refactoring needed */

/**Values */
import { GraphData, ViewElements } from './values'


/**Entities */
//Graph
export function Graph(graphId, graphData = []) {

    this.ID = graphId;
    this.data = new GraphData(graphData);
}
Graph.prototype.getRelations = function (elementName) {

    let graph = this.data.graphElements;

    let methods = {

        findByName: function findByName(input) {

            for (let i = 0; i < graph.length; i++) {

                let graphGroup = graph[i];

                let result = graphGroup.filter(element => {
                    return element.name === input;
                })

                if (result.length !== 0) {
                    return result[0];
                }
            }

        },
        parseInput: function parseInput(input) {

            let result = [];
            let firstElement = methods.findByName(input);
            result.push(firstElement);

            return result;
        },
        traverseToEnd: function traverseToEnd(firstParent) {
            //getChildren
            function getChildren(parent) {

                let result = [];

                if (parent.hasChildren) {

                    parent.children.forEach(child => {
                        result.push(methods.findByName(child));
                    });

                    return result;
                }
                else {
                    return null;
                }
            }
            //linkToChildren
            function linkChildrenTo(parent) {

                let relations = [];

                if (parent.hasChildren) {

                    parent.children.forEach(child => {
                        let relation = {
                            start: parent.name,
                            end: child
                        }

                        relations.push(relation);
                    });

                    return relations;
                }
                else {
                    return null;
                }
            }
            //traverse children
            function traverseChildren(parents, relations = []) {

                if (parents.length === 0) {

                    return relations;
                }
                else {

                    let element = parents[0];

                    if (element.hasChildren) {

                        let newRelations = relations.slice();
                        newRelations = newRelations.concat(linkChildrenTo(element));

                        let children = getChildren(element);
                        let newParents = [];

                        newParents = parents.concat(children);
                        newParents.splice(0, 1);

                        return traverseChildren(newParents, newRelations);
                    }
                    else {
                        let newParents = parents.slice();
                        newParents.splice(0, 1);

                        return traverseChildren(newParents, relations);
                    }

                }

            }

            return traverseChildren(firstParent);
        },
        traverseToStart: function traverseToStart(firstChild) {
            //getParents
            function getParents(child) {

                let results = [];

                for (let i = 0; i < graph.length; i++) {

                    let graphGroup = graph[i];

                    graphGroup.forEach(element => {
                        if (element.children.indexOf(child.name) !== -1) {
                            results.push(element);
                        }
                    });
                }

                return results;
            }
            //linkToParents
            function link(child, parents) {

                let relations = [];

                parents.forEach(parent => {
                    let relation = {
                        start: parent.name,
                        end: child.name
                    }

                    relations.push(relation);
                });

                return relations;
            }
            //traverseParents
            function traverseParents(children, relations = []) {

                if (children.length === 0) {

                    return relations;
                }
                else {

                    let element = children[0];
                    let parents = getParents(element);

                    if (parents.length !== 0) {

                        let newRelations = relations.slice();
                        newRelations = newRelations.concat(link(element, parents));

                        let newChildren = [];

                        newChildren = children.concat(parents);
                        newChildren.splice(0, 1);

                        return traverseParents(newChildren, newRelations);
                    }
                    else {
                        let newChildren = children.slice();
                        newChildren.splice(0, 1);

                        return traverseParents(newChildren, relations);
                    }

                }
            }

            return traverseParents(firstChild);
        }

    }

    let relations = [];
    let array = methods.parseInput(elementName);

    relations = relations.concat(methods.traverseToEnd(array));
    relations = relations.concat(methods.traverseToStart(array));

    return relations;
}


//Graph View
export function GraphView(graphId, graphElements, graphAxis) {

    this._graphId = graphId;
    this._labels = graphAxis;

    this.dataPoints = this.getDataPoints(graphElements);
    this.elements = new ViewElements(graphId);

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
        let row = ((i + 1) * 100); // y = 100


        for (let j = 0; j < graphGroup.length; j++) {

            let col = ((j + 1) * 100); //x = 100

            let dataPoint = new DataPoint(graphGroup[j].name, col, row, 25); //radius = 25
            dataPoints.push(dataPoint);
        }
    }

    return dataPoints;
}
GraphView.prototype.drawLabels = function () {

    this.elements.context.font = '20px Arial'; //settings.getFont();
    this.elements.context.fillStyle = 'green'; //settings.color;
    let offset = (Math.PI * 2);

    //collumns
    for (let i = 0; i < this._labels.collumns; i++) {

        let col = (100 * (i + 1)) - offset;

        this.elements.context.fillText((i + 1), col, 50);
    }
    //rows
    for (let j = 0; j < this._labels.rows; j++) {

        let row = (100 * (j + 1)) + offset;

        //transform numbers to letters
        let letter = String.fromCharCode((j + 65));
        this.elements.context.fillText(letter, 40, row);
    }

}
GraphView.prototype.drawDataPoints = function () {

    function drawCircle(ctx, x, y, radius) {

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#3498db";
        ctx.fill();
    }

    this.dataPoints.forEach(dataPoint => {
        drawCircle(this.elements.context, dataPoint.shape.x, dataPoint.shape.y, dataPoint.shape.radius)
    });
}
GraphView.prototype.drawDataPointRelations = function () {

}
GraphView.prototype.render = function (activeElement = null, relations = []) {

    if (activeElement === null && relations.length === 0) {

        this.drawLabels();
        this.drawDataPoints();
    }
    if (activeElement !== null && relations.length !== 0) {

        console.log(activeElement);
        console.log(relations);

        //drawDataPointRelations(activeElement, reations);
        //drawGraphDataPoints
        //drawGraphLabels
    }
}
