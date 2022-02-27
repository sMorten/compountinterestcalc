class Cinterestclass {
	constructor(mode){
		this.mode = '';
		this.changeMode(mode);
	}

	//Function to change system modes
	changeMode(mode){
		if((mode==='fixed')||(mode==='date')){
			this.mode = mode;
		} else {
			console.error("Interest system mode must be either 'fixed' or 'date'");
		}
	}


}

