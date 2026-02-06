import "https://esm.sh/adorable-css@1.6.2"
import { html, render } from "https://esm.sh/lit-html@3.3.2"
import normal from "https://esm.sh/@stdlib/random-base-normal@0.2.1"
import Graph from "https://esm.sh/graphology@0.26.0"
import Sigma from "https://esm.sh/sigma@3.0.2"
import FA2Layout from "https://esm.sh/graphology-layout-forceatlas2@0.10.1/worker"
import forceAtlas2 from "https://esm.sh/graphology-layout-forceatlas2@0.10.1"

console.log("hi", normal(0, 1))
const arr = (n) => [...Array(n).keys()]

const template = html`
    <div id="app" class="vbox h(100%) p(10) bg(#021)">
        <div id="graph" class="h(100%) b(1/#cfd) r(5)"></div>
    </div>
`

render(template, document.body)

const graph = new Graph()

arr(100).forEach((i) => {
    const x0 = normal(0, 1)
    const y0 = normal(0, 1)
    graph.addNode(`n${i}`, {
        x0,
        y0,
        x: x0,
        y: y0,
        size: 3,
        color: "#8ac",
        //color: `oklab(0.3, ${x*0.003}, ${y*0.003})`,
        label: `Node ${i}`,
    })
})

const dist =
(a, b) =>
    Math.hypot(a.x-b.x, a.y-b.y)

graph.forEachNode((a, ao) => {
    graph.forEachNode((b, bo) => {
        const p = 0.1/(dist(ao, bo)**2)
        if (a < b && Math.random() < p) {
            graph.addEdge(a, b, {
                size: 1,
                color: "#22334422",
                label: p.toFixed(2),
                //forceLabel: true,
            })
        }
    })
})

const container = document.querySelector("#graph")

const sigma = new Sigma(graph, container, {
    allowInvalidContainer: true,
    //renderEdgeLabels: true,
})

const layout = new FA2Layout(graph, {
    iterations: 1,
    settings: {
        slowDown: Infinity,
    },
})
/*
const layout = new FA2Layout(graph, {
    settings: forceAtlas2.inferSettings(graph),
}*/
layout.start()