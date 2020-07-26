class Chart {
    constructor(powerSL, k) {
        this.powerSL = powerSL;
        this.k = k;
        this.prepareData()
    }

    prepareData() {
        const x = [...Array(21).keys()].map((x) => x * 500);
        const y = x.map((height) => Atmosphere.powerAt(height, this.powerSL, this.k));
        const trace = {
            x: x,
            y: y,
            type: 'scatter'
        };
        const layout = {
            title: 'Engine performance',
            font: {size: 18},
            yaxis: {
                range: [0, this.powerSL],
                title: {
                    text: 'Engine Power [kW]',
                    font: {
                        size: 16
                    }
                }
            }
        };
        if ($('#chart3').html() === '') {
            Plotly.plot('chart3', [trace], layout, {scrollZoom: false, responsive: true});
        } else {
            Plotly.newPlot('chart3', [trace], layout, {scrollZoom: false});
        }
    }
}


class Atmosphere {
    static densityAtSL() {
        return 1.2255
    }

    static densityAt(height) {
        // International Standard Atmosphere
        return this.densityAtSL() * Math.pow(1 - height / 44300, 4.256)
    }

    static sigma(height) {
        return this.densityAt(height) / this.densityAtSL()
    }

    static powerAt(height, powerSL, k) {
        return powerSL * (this.sigma(height) - k) / (1 - k)
    }
}

$('.valueSpan').html($('#k-coefficient').val());

$('#engine-form').on('input change', (event) => {
    $('.valueSpan').html($('#k-coefficient').val());
    const $powerSL = $('#n_0').val();
    const $k = $('#k-coefficient').val();
    const chart = new Chart($powerSL, $k);
});