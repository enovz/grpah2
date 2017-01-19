
import { Graph, GraphView } from './Entities'
import { Settings } from './Values'

function GraphModule(Id, data = []) {

    this.graph = new Graph(Id, data);
    //this.view = new GraphView(Id, this.graph.data.graphElements, this.graph.data.graphAxis);
    this.view = new GraphView(this.graph);
}
GraphModule.prototype.handleInput = function (event) {

    let dataPointName = this.view.getActiveDataPoint(event.pageX, event.pageY);
    if (dataPointName !== null) {
        let relations = this.graph.getRelations(dataPointName);
        this.view.render(relations);
    }
}
GraphModule.prototype.handleResize = function () {

    this.view = new GraphView(this.graph);
    this.view.render();
}
GraphModule.prototype.bindEvents = function () {

    //bind events
    this.view.elements.canvas.addEventListener('click', this.handleInput.bind(this), false);

    //test
    window.onresize = this.handleResize.bind(this);
}
GraphModule.prototype.unbindEvents = function () {

    //unbind events
    this.view.elements.canvas.removeEventListener('click', this.handleInput.bind(this), false);
}
GraphModule.prototype.init = function () {

    this.view.render();
    this.bindEvents();
}
GraphModule.prototype.stop = function () {

    //close view
    this.unbindEvents();
}

export default GraphModule