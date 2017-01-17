
//DataPoint in Chart
/*function DataPoint(view, settings) {

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
}*/
function DataPoint(ctx, col, row, radius) {

    this._position = {
        left: col - radius,
        top: row - radius,
        right: col + radius,
        bottom: row + radius
    }

    this.drawCircle(ctx, col, row, radius);
}
DataPoint.prototype.drawCircle = function (ctx, col, row, radius) {

    ctx.beginPath();
    ctx.arc(col, row, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#3498db";
    ctx.fill();
}

export default DataPoint;