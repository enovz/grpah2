

function GraphModule(containerId, graphData = []) {

    //properties
    this._containerId = containerId;
    this._graph = graphData;
    this.width = 0;
    this.height = 0;
    this._container = typeof (this._containerId) === 'string' ? document.getElementById(this._containerId) : this._containerId;

    //check container
    if (!this._container && window.console) {
        console.log('div with id ' + this._containerId + ' not found');
    }

    //setup container
    this._container.innerHTML = "";

    let height = this._container.clientHeight > 0 ? this._container.clientHeight : 0;
    let width = this._container.clientWidht > 0 ? this._container.clientWidht : 0;

    this.width = width;
    this.height = height;

    //setup canvas
    this.canvas = this.createCanvas(width, height);

    //events
    window.onresize = this.updateSize.bind(this);
}

GraphModule.prototype.isCanvasSupported = function () {

    return !!(document.createElement('canvas').getContext);
}
GraphModule.prototype.createCanvas = function (width, height) {

    if (this.isCanvasSupported()) {

        let canvas = document.createElement('canvas');
        canvas.setAttribute('class', 'graph');

        this.setCanvasSize(canvas, width, height);

        return canvas;
    }

}
GraphModule.prototype.setCanvasSize = function (canvas, width, height) {

    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = 1;
    let devicePixelBackingStoreRatio = true ? (devicePixelRatio / backingStoreRatio) : 1;

    let context = canvas.getContext('2d');

    backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;


    this.devicePixelBackingStoreRatio = devicePixelRatio / backingStoreRatio;

    canvas.width = width * devicePixelBackingStoreRatio;
    canvas.height = height * devicePixelBackingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);

    }
    else {
        canvas.width = width;
        canvas.height = height;
    }

}
GraphModule.prototype.updateSize = function () {

    let width = 0;
    let height = 0;

    this.width = width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;
    this.height = height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

    if (this.canvas.width !== width * this.devicePixelBackingStoreRatio || this.canvas.height !== height * this.devicePixelBackingStoreRatio) {
        this.setCanvasSize(this.canvas, width, height);

    }

}
GraphModule.prototype.init = function () {

}


export default GraphModule;