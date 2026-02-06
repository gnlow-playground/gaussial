import { html, render } from "https://esm.sh/lit-html@3.3.2"
import { sample } from "https://esm.sh/@stdlib/stats-base-dists-normal@0.3.0"
import Graph from "https://esm.sh/graphology@0.26.0"
import Sigma from "https://esm.sh/sigma@3.0.2"

const arr = (n: number) => [...Array(n).keys()]

const template = html`
    <div id="app">
        <canvas 
            id="sigma-canvas" 
            width="1920" 
            height="1080"
            style="width: 100%; height: 100%;"
        ></canvas>
    </div>
`

render(template, document.body)

const graph = new Graph()

arr(100).map((i) => {
    graph.addNode(`n${i}`, {
        x: sample(0, 100),
        y: sample(0, 100),
        size: 5,
        color: "#f00",
    })
})

const container = document.getElementById("sigma-canvas") as HTMLCanvasElement

new Sigma(graph, container, {
    renderEdgeLabels: true,
})