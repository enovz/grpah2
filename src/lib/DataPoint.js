
//DataPoint in Chart
function DataPoint(view, settings, data = null) {

    this._data = data;
    this._position = {
        left: settings.x - settings.radius,
        top: settings.y - settings.radius,
        right: settings.x + settings.radius,
        bottom: settings.y + settings.radius
    }

    this.drawCircle(view.context, view.aspectRatio, settings);
}
DataPoint.prototype.drawCircle = function (ctx, ratio, settings) {

    ctx.beginPath();
    ctx.arc(settings.x * ratio, settings.y * ratio, settings.radius * ratio, settings.startAngle, settings.endAngle);
    ctx.fillStyle = "#3498db";
    ctx.fill();
}

export default DataPoint;