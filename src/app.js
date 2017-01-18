
/*import GraphModule from './lib/GraphModule'
import Chart from './lib/Chart'*/

//const graphModule = new GraphModule("graph-container");

/**request from service */

/**end request */


/*const chartModule = new Chart("chart", graph);
chartModule.init();*/


import GraphModule from './lib/GraphModule'

let graph = [
    [
        ["A1", ["B1", "B2"]],
        ["A2", ["B1"]],
        ["A3", ["B2"]]
    ],
    [
        ["B1", ["C1", "C2", "C3", "C4"]],
        ["B2", ["C1", "C3"]]
    ],
    [
        ["C1"],
        ["C2"],
        ["C3"],
        ["C4"]
    ]
];

if (!window.app) {

    let app = {};
    app.graphModule = new GraphModule("chart", graph);
    app.graphModule.init();
}
else {

    app.graphModule = new GraphModule("chart", graph);
    app.graphModule.init();
}