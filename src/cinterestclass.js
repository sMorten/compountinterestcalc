function smcNumberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
class CInterestClass {
	constructor(mode,graphPrincipleColour,graphInterestColour){

		this.settings = {
			'chart': {
				'principle_colour': graphPrincipleColour,
				'interest_colour': graphInterestColour
			}
		};

		this.mode = '';
		this.fields = {
			'date': {
				'clickListener':'#smc-date',
				'fields': ['.smc-date-control','.smc-date-result']
			},
			'fixed': {
				'clickListener':'#smc-fixed',
				'fields': ['.smc-fixed-control','.smc-fixed-result']
			}
		};
		this.chart_canvas = 'myChart';
		this.cal_results = {
			contributions: '',
			compounded_returns: '',
			fixed_investment_value: '',
			date_interval_amount:'',
			date_interval: '',
			date_goal:'',
			date_date:'',

		};
		this.chart_data = '';

		this.changeMode(mode);
		var classThis = this;
		this.chart = new Chart(document.getElementById(this.chart_canvas).getContext('2d'), {
			type: 'line',
            data: classThis.getChartData(),
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
		
		document.querySelector('#investment_timespan').addEventListener('change', function () {
	        document.querySelector('#investment_timespan_text').innerHTML = this.value + ' years';
	        
    	});
	}

	//Function to change system modes
	changeMode(mode){
		if((mode==='fixed')||(mode==='date')){
			this.mode = mode;
			this.setMode(mode);
		} else {
			console.error("Interest system mode must be either 'fixed' or 'date'");
		}
	}

	//Update calculator for the appropriate mode
	setMode(mode){
	
		if((mode==='fixed')||(mode==='date')){
			
			if(mode==='fixed'){
				document.querySelector(this.fields.fixed.clickListener).classList.add("smc-active");
				document.querySelector(this.fields.date.clickListener).classList.remove("smc-active");
				this.fields.fixed.fields.forEach((el)=>{
					var inputs = document.querySelectorAll(el);
					inputs.forEach((el2)=> {
						el2.classList.remove("smc-hidden");
					})
				});
				this.fields.date.fields.forEach((el)=>{
					var inputs = document.querySelectorAll(el);
					inputs.forEach((el2)=> {
						el2.classList.add("smc-hidden");
					})
				});

			} else if(mode==='date'){
				document.querySelector(this.fields.date.clickListener).classList.add("smc-active");
				document.querySelector(this.fields.fixed.clickListener).classList.remove("smc-active");
				this.fields.date.fields.forEach((el)=>{
					var inputs = document.querySelectorAll(el);
					inputs.forEach((el2)=> {
						el2.classList.remove("smc-hidden");
					})
				});
				this.fields.fixed.fields.forEach((el)=>{
					var inputs = document.querySelectorAll(el);
					inputs.forEach((el2)=> {
						el2.classList.add("smc-hidden");
					})
				});

			} else {
				console.error("Interest System - Invalid Mode");
			}

		} else {
			console.error("Interest system mode must be either 'fixed' or 'date'");
		}
	}

	//Update data values and values
	updateValue(element, action) {
       
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

        this.updateChart();
    }



	//Build Chart Data
	getChartData(){
		//try{
			//Set Fields
			var P = parseFloat(document.getElementById('initial_deposit').dataset.value), // Principal
	            r = parseFloat(document.querySelector('#estimated_return').dataset.value / 100), // Annual Interest Rate
	            c = parseFloat(document.querySelector('#contribution_amount').dataset.value), // Contribution Amount
	            //n = parseInt(document.querySelector('[name="compound_period"]:checked').value), // Compound Period
	            //n2 = parseInt(document.querySelector('[name="contribution_period"]:checked').value), // Contribution Period
	            t = parseInt(document.querySelector('#investment_timespan').value), // Investment Time Span
	            currentYear = (new Date()).getFullYear(),
	            n = parseInt(document.querySelector("#compound_frequency").value),
	            n2 = parseInt(document.querySelector("#contribution_frequency").value),
	            total_principal = 0,
	            total_interest = 0;


	        var //initial_deposit = document.getElementById('initial_deposit'),
		        contribution_amount = document.querySelector('#contribution_amount'),
		        investment_goal = document.querySelector('#investment_goal'),
		        investment_timespan = document.querySelector('#investment_timespan'),
		        investment_timespan_text = document.querySelector('#investment_timespan_text'),
		        estimated_return = document.querySelector('#estimated_return'),
		        future_balance = document.querySelector('#future_balance'),
		        contribution_frquency = document.querySelector("#contribution_frequency"),
		        compound_frquency = document.querySelector("#compound_frequency"),
		        your_contributions = document.querySelector("#cinterest_result_contributions"),
		        your_compound_returns = document.querySelector("#cinterest_result_compounded_return"),
		        your_value= document.querySelector("#cinterest_result_value"),
		        target_date = document.querySelector("#smc_target_date"),
		        need_invest = document.querySelector('#smc-date-interval-amount'),
		        need_interval = document.querySelector("#smc-date-interval"),
		        need_goal = document.querySelector("#smc-date-goal"),
		        need_date = document.querySelector("#smc-date-date");

			if(this.mode==="fixed"){

				//Build chart data around fixed mode
				var labels = [];
		        for (var year = currentYear; year < currentYear + t; year++) {
		            labels.push(year);
		        }

		        var principal_dataset = {
		            label: 'Total Principal',
		            backgroundColor: this.settings.chart.principle_colour,
		            data: []
		        };

		        var interest_dataset = {
		            label: "Total Interest",
		            backgroundColor: this.settings.chart.interest_colour,
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

		            future_balance.innerHTML = '$' + smcNumberWithCommas(balance);
		            principal_dataset.data.push(principal);
		            interest_dataset.data.push(interest);
		            total_principal = principal;
		            total_interest = interest;


		        }

		        your_contributions.innerHTML = ("$" + smcNumberWithCommas(total_principal));
		        your_compound_returns.innerHTML = ("$" + smcNumberWithCommas(total_interest));
		        your_value.innerHTML = ("$" + smcNumberWithCommas(parseFloat(total_principal)+parseFloat(total_interest)));

		        return {
		            labels: labels,
		            datasets: [principal_dataset, interest_dataset]
		        }

			} else if(this.mode=="date"){

				//Build chart data around date mode
				var temp_date=target_date.value.split('-');
				var target_day=temp_date[2];
				var target_month=temp_date[1];
				var target_year=temp_date[0];

				var labels = [];
		        for (var year = currentYear; year <= target_year; year++) {
		            labels.push(year);
		        }

		         var principal_dataset = {
		            label: 'Total Principal',
		            backgroundColor: this.settings.chart.principle_colour,
		            data: []
		        };

		        var interest_dataset = {
		            label: "Total Interest",
		            backgroundColor: this.settings.chart.interest_colour,
		            data: []
		        };
		     

		        var y2 = n2; // Need to update to contribution periods bewtween now and target date

		        // Caculate monthly payments
		        var payments = ((r/n2)*(investment_goal-P*Math.pow((1+(r/n2)),(y2))))/(1);

		        t = target_year - currentYear;

		        //Calculate the value each year up to target date

		       if(r){
		       		console.log(investment_goal.value);
			        var pmt_match = investment_goal.value / (((Math.pow(1+r,t*n)-1)/1)*(1+r));
			        console.log(pmt_match);

			        //Need to adjust payments to payment periods not compounding period.
			        //reference http://www.tvmcalcs.com/index.php/tvm/formulas/annuity_due_formulas
			        var balance = 0;
			        for (var i = 1; i <= t; i++) {
			        	var N = i*n;


			        }

			        //NEED TO BUILD THIS OUT - ACTION
			    }


				return {
					labels: labels,
					datasets: [principal_dataset, interest_dataset]
				}

			} else {
				console.error("System mode not defined");
			}



		/*} catch(err){
			console.error(err.message);
		}*/
	}


	//Build Chart
	updateChart(){
		try{
			var data = this.getChartData();
			this.chart.data.labels = data.labels;
        	this.chart.data.datasets[0].data = data.datasets[0].data;
        	this.chart.data.datasets[1].data = data.datasets[1].data;
        	this.chart.update();
		} catch(err){
			console.error(err.message);
		}
	}


	//Register Listeners
	registerListeners(listenersArr){
		try{
			var classThis = this;
			listenersArr.forEach((el)=>{
				document.querySelector(el).addEventListener('change', function(){
					classThis.updateValue(this);
				})
			});

			var buttons = document.querySelectorAll('[data-counter]');
		    for (var i = 0; i < buttons.length; i++) {
		        var button = buttons[i];

		        button.addEventListener('click', function () {
		            var field = document.querySelector('[name="' + this.dataset.field + '"]'),
		                action = this.dataset.counter;

		            if (field) {
		                classThis.updateValue(field, action);
		            }
		        });
		    }
		} catch(err){
			console.error(err);
		}
	}


}

