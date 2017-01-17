
/**drawGraphLabels is currently reversed need to reverse letters and numbers */

function drawGraphLabels(chart, context, settings) {

    let axis = getGraphAxis(chart);
    plotChartAxis(axis, context, settings);

}
function getGraphAxis(chart) {

    let rowsAxis = chart.length;

    let collumnsAxis = 0;

    chart.forEach(collumn => {
        if (collumn.length > collumnsAxis) {
            collumnsAxis = collumn.length;
        }
    })

    return {
        rows: (rowsAxis),
        collumns: (collumnsAxis)
    }
}
function plotChartAxis(axis, context, settings) {

    context.font = settings.getFont();
    context.fillStyle = settings.color;
    let offset = (Math.PI * 2);

    //collumns
    for (let i = 0; i < axis.collumns; i++) {

        let col = (100 * (i + 1)) - offset;

        context.fillText((i+1), col, 50);
    }
    //rows
    for (let j = 0; j < axis.rows; j++) {

        let row = (100 * (j + 1)) + offset;

        //transform numbers to letters
        let letter = String.fromCharCode((j + 65));
        context.fillText(letter, 40, row);
    }

}

export default drawGraphLabels;