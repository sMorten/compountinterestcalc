(function () {
    var initial_deposit = document.getElementById('initial_deposit'),
        contribution_amount = document.querySelector('#contribution_amount'),
        investment_timespan = document.querySelector('#investment_timespan'),
        investment_timespan_text = document.querySelector('#investment_timespan_text'),
        estimated_return = document.querySelector('#estimated_return'),
        future_balance = document.querySelector('#future_balance'),
        contribution_frquency = document.querySelector("#contribution_frequency"),
        compound_frquency = document.querySelector("#compound_frequency"),
        your_contributions = document.querySelector("#cinterest_result_contributions"),
        your_compound_returns = document.querySelector("#cinterest_result_compounded_return"),
        your_value= document.querySelector("#cinterest_result_value");
        console.log("test22");
    function updateValue(element, action) {
        var min = parseFloat(element.getAttribute('min')),
            max = parseFloat(element.getAttribute('max')),
            step = parseFloat(element.getAttribute('step')) || 1,
            oldValue = element.dataset.value || element.defaultValue || 0,
            newValue = parseFloat(element.value.replace(/\$/, ''));

        if (isNaN(parseFloat(newValue))) {
            newValue = oldValue;
        } else {
            if (action == 'add') {
                newValue += step;
            } else if (action == 'sub') {
                newValue -= step;
            }

            newValue = newValue < min ? min : newValue > max ? max : newValue;
        }

        element.dataset.value = newValue;
        element.value = (element.dataset.prepend || '') + newValue + (element.dataset.append || '');

        updateChart();
    }

    function numberWithCommas(x) {
       return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getChartData() {
        var P = parseFloat(initial_deposit.dataset.value), // Principal
            r = parseFloat(estimated_return.dataset.value / 100), // Annual Interest Rate
            c = parseFloat(contribution_amount.dataset.value), // Contribution Amount
            //n = parseInt(document.querySelector('[name="compound_period"]:checked').value), // Compound Period
            //n2 = parseInt(document.querySelector('[name="contribution_period"]:checked').value), // Contribution Period
            t = parseInt(investment_timespan.value), // Investment Time Span
            currentYear = (new Date()).getFullYear(),
            n = parseInt(document.querySelector("#compound_frequency").value),
            n2 = parseInt(document.querySelector("#contribution_frequency").value),
            total_principal = 0,
            total_interest = 0;

         

        var labels = [];
        for (var year = currentYear; year < currentYear + t; year++) {
            labels.push(year);
        }

        var principal_dataset = {
            label: 'Total Principal',
            backgroundColor: 'rgb(0, 123, 255)',
            data: []
        };

        var interest_dataset = {
            label: "Total Interest",
            backgroundColor: '#1AAF5D',
            data: []
        };

        for (var i = 1; i <= t; i++) {
            var principal = P + ( c * n2 * i ),
                interest = 0,
                balance = principal;

            if (r) {
                var x = Math.pow(1 + r / n, n * i),
                    compound_interest = P * x,
                    contribution_interest = c * (x - 1) / (r / n2);
                interest = (compound_interest + contribution_interest - principal).toFixed(0)
                balance = (compound_interest + contribution_interest).toFixed(0);
            }

            future_balance.innerHTML = '$' + numberWithCommas(balance);
            principal_dataset.data.push(principal);
            interest_dataset.data.push(interest);
            total_principal = principal;
            total_interest = interest;


        }

        your_contributions.innerHTML = ("$" + numberWithCommas(total_principal));
        your_compound_returns.innerHTML = ("$" + numberWithCommas(total_interest));
        your_value.innerHTML = ("$" + numberWithCommas(parseFloat(total_principal)+parseFloat(total_interest)));

        return {
            labels: labels,
            datasets: [principal_dataset, interest_dataset]
        }
    }

    function updateChart() {
        var data = getChartData();

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.datasets[0].data;
        chart.data.datasets[1].data = data.datasets[1].data;
        console.log(data);
        chart.update();
    }

  
    initial_deposit.addEventListener('change', function () {
        updateValue(this);
    });
    
    contribution_amount.addEventListener('change', function () {
        updateValue(this);
    });

    estimated_return.addEventListener('change', function () {
        updateValue(this);
    });

    investment_timespan.addEventListener('change', function () {
        investment_timespan_text.innerHTML = this.value + ' years';
        updateChart();
    });

    investment_timespan.addEventListener('input', function () {
        investment_timespan_text.innerHTML = this.value + ' years';
    });
    contribution_frquency.addEventListener('change',function(){
        updateChart();
    });
    compound_frquency.addEventListener('change',function(){
        updateChart();
    });

    /*var radios = document.querySelectorAll('[name="contribution_period"], [name="compound_period"]');
    for (var j = 0; j < radios.length; j++) {
        radios[j].addEventListener('change', updateChart);
    }*/

    var buttons = document.querySelectorAll('[data-counter]');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        button.addEventListener('click', function () {
            var field = document.querySelector('[name="' + this.dataset.field + '"]'),
                action = this.dataset.counter;

            if (field) {
                updateValue(field, action);
            }
        });
    }

    var ctx = document.getElementById('myChart').getContext('2d'),
        chart = new Chart(ctx, {
            type: 'line',
            data: getChartData(),
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.yLabel;
                        }
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            callback: function (value) {
                                return '$' + value;
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Balance'
                        }
                    }]
                }
            }
        });

})();
