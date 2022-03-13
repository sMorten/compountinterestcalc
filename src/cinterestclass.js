class CInterestClass {
	constructor(mode){
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
				this.fields.fixed.forEach((el)=>{
					var inputs = document.querySelectorAll(el);
					inputs.forEach((el2)=> {
						console.log(el2);
					})
				});
				

			} else if(mode==='date'){


			} else {
				console.error("Interest System - Invalid Mode");
			}

		} else {
			console.error("Interest system mode must be either 'fixed' or 'date'");
		}
	}


}
(function(){
	let cInterestManager = new CInterestClass("fixed");
	console.log("Interest Manager Initiated");
	console.log(cInterestManager.fields);
	cInterestManager.fields.forEach((el)=>{
		document.querySelector(el.clickListener).addEventListener("click", ()=>{
			cInterestManager.changeMode(el);
		})
	});


})();
