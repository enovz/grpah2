
import { Graph, GraphView } from './Entities'

function GraphModule(Id, data = []) {

    //check is defoult or user settings
    let defultSettings = {
        labels: {
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
        dataPoints: {
            x: 80,
            y: 80,
            radius: 20,
            startAngle: 0,
            endAngle: Math.PI * 2,
            counterClockwiseValue: true
        }
    };

    this.graph = new Graph(Id, data);
    this.view = new GraphView(Id, this.graph.data.graphElements, this.graph.data.graphAxis);

}
GraphModule.prototype.handleInput = function (event) {

    let dataPointName = this.view.getActiveDataPoint(event.pageX, event.pageY);
    if (dataPointName !== null) {
        let relations = this.graph.getRelations(dataPointName);
        this.view.render(relations);
    }
}
GraphModule.prototype.bindEvents = function () {

    //bind events
    this.view.elements.canvas.addEventListener('click', this.handleInput.bind(this), false);

}
GraphModule.prototype.unbindEvents = function(){

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