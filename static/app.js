function getMetadata(msample) {

    d3.json("samples.json").then((data) => {

        var metadataData = data.metadata;

        var metaSample = metadataData.filter(meta => meta.id == msample);

        var metadata = d3.select("#sample-metadata").html("");

        Object.entries(metaSample[0]).forEach(([key, value]) => {
            metadata.append("h5").text(`${key}: ${value}`);
        });
    });
}

function plotCharts(psample) {

    d3.json("samples.json").then((data) => {

        var sampleData = data.samples;

        var sampleSample = sampleData.filter(samples => samples.id == psample)[0];

        var sampleValues = sampleSample.sample_values;

        var idValues = sampleSample.otu_ids;

        var hoverText = sampleSample.otu_labels;

        var barValues = sampleValues.slice(0, 10).reverse();

        var idLabels = idValues.slice(0, 10).reverse();

        var barLabels = [];
        idLabels.forEach((barLabel) => {
            barLabels.push("OTU " + barLabel);
        });

        var barText = hoverText.slice(0, 10).reverse();

        var barPlot = {
            type: "bar",
            y: barLabels,
            x: barValues,
            text: barText,
            orientation: 'h'
        };

        var barLayout = {
            height: 500,
            width: 1000,
            xaxis: {
                title: "Sample Values"
            },
        }
        
        var barChart = [barPlot];

        Plotly.newPlot('bar', barChart, barLayout);

        var bubblePlot = {
            x: idValues,
            y: sampleValues,
            text: hoverText,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues
            }
        };

        var bubbleChart = [bubblePlot];

        var bubbleLayout = {
            showlegend: false,
            height: 500,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot('bubble', bubbleChart, bubbleLayout);
    });
}

function init() {

    d3.json("samples.json").then((data) => {

        var nameData = data.names;

        var dropdownMenu = d3.select("#selDataset");

        nameData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        getMetadata(nameData[0]);

        plotCharts(nameData[0]);

    });
}

function optionChanged(sample) {

    getMetadata(sample); 

    plotCharts(sample);
}

init();