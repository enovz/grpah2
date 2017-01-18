
//DataPoint in Chart

function DataPoint(name, ctx, x, y, radius) {

    this.name = name;
    this.position = {
        left: x - radius,
        top: y - radius,
        right: x + radius,
        bottom: y + radius
    }

    this.drawCircle(ctx, x, y, radius);
}
DataPoint.prototype.drawCircle = function (ctx, x, y, radius) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#3498db";
    ctx.fill();
}

function drawDataPoints(chartData, context, radius) {

    let dataPoints = [];

    for (let i = 0; i < chartData.length; i++) {

        let chartGroup = chartData[i];
        let row = ((i + 1) * 100);

        for (let j = 0; j < chartGroup.length; j++) {

            let col = ((j + 1) * 100);

            let dataPoint = new DataPoint(chartGroup[j].name, context, col, row, radius);
            dataPoints.push(dataPoint);
        }
    }

    return dataPoints;

}

export default drawDataPoints;