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
		this.chart_canvas = '#myChart';
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
        console.log(element + " : "+action);;
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
	buildChartData(){
		try{
			
		} catch(err){
			console.error(err.message);
		}
	}


	//Calculate values
	calculateValues(){
		try{

		} catch(err){
			console.error(err.message);
		}
	}


	//Build Chart
	buildChart(){
		try{
			let chartData = buildChartData();

			
		} catch(err){
			console.error(err.message);
		}
	}

	//rebuild
	updateChart(){
		try{
			
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

