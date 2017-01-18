
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

    let clickedX = event.pageX - this.view.elements.canvas.offsetLeft;
    let clickedY = event.pageY - this.view.elements.canvas.offsetTop;

    for (var i = 0; i < this.view.dataPoints.length; i++) {

        //change position into surface !!!!!!!!!
        let surface = this.view.dataPoints[i].surface;

        if (clickedX < surface.right && clickedX > surface.left && clickedY < surface.bottom && clickedY > surface.top) {

            //got clicked element and got relations
            let activeElement = this.view.dataPoints[i].name;
            let relations = this.graph.getRelations(activeElement);
            //draw relations
            this.view.render(activeElement, relations);
        }
    }
}
GraphModule.prototype.handleEvents = function () {
    
    //bind events
    this.view.elements.canvas.addEventListener('click', this.handleInput.bind(this), false);

}
GraphModule.prototype.init = function () {

    this.view.render();
    this.handleEvents();
}
GraphModule.prototype.stop = function () {

    //close view
    //release eventHandlers
}

export default GraphModule