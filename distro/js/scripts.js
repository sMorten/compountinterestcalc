function smcNumberWithCommas(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}class CInterestClass{constructor(e,t,a){this.settings={chart:{principle_colour:t,interest_colour:a}},this.mode="",this.fields={date:{clickListener:"#smc-date",fields:[".smc-date-control",".smc-date-result"]},fixed:{clickListener:"#smc-fixed",fields:[".smc-fixed-control",".smc-fixed-result"]}},this.chart_canvas="myChart",this.cal_results={contributions:"",compounded_returns:"",fixed_investment_value:"",date_interval_amount:"",date_interval:"",date_goal:"",date_date:""},this.initialized=!1,this.chart_data="",this.changeMode(e);this.chart=new Chart(document.getElementById(this.chart_canvas).getContext("2d"),{type:"line",data:this.getChartData(),options:{legend:{display:!1},tooltips:{mode:"index",intersect:!1,callbacks:{label:function(e,t){return t.datasets[e.datasetIndex].label+": $"+e.yLabel}}},responsive:!0,scales:{xAxes:[{stacked:!0,scaleLabel:{display:!0,labelString:"Year"}}],yAxes:[{stacked:!0,ticks:{callback:function(e){return"$"+e}},scaleLabel:{display:!0,labelString:"Balance"}}]}}}),document.querySelector("#investment_timespan").addEventListener("change",function(){document.querySelector("#investment_timespan_text").innerHTML=this.value+" years"})}changeMode(e){"fixed"===e||"date"===e?(this.mode=e,this.setMode(e)):console.error("Interest system mode must be either 'fixed' or 'date'")}setMode(e){"fixed"===e||"date"===e?("fixed"===e?(document.querySelector(this.fields.fixed.clickListener).classList.add("smc-active"),document.querySelector(this.fields.date.clickListener).classList.remove("smc-active"),this.fields.fixed.fields.forEach(e=>{document.querySelectorAll(e).forEach(e=>{e.classList.remove("smc-hidden")})}),this.fields.date.fields.forEach(e=>{document.querySelectorAll(e).forEach(e=>{e.classList.add("smc-hidden")})})):"date"===e?(document.querySelector(this.fields.date.clickListener).classList.add("smc-active"),document.querySelector(this.fields.fixed.clickListener).classList.remove("smc-active"),this.fields.date.fields.forEach(e=>{document.querySelectorAll(e).forEach(e=>{e.classList.remove("smc-hidden")})}),this.fields.fixed.fields.forEach(e=>{document.querySelectorAll(e).forEach(e=>{e.classList.add("smc-hidden")})})):console.error("Interest System - Invalid Mode"),this.initialized?this.updateChart():this.initialized=!0):console.error("Interest system mode must be either 'fixed' or 'date'")}updateValue(e,t){var a=parseFloat(e.getAttribute("min")),r=parseFloat(e.getAttribute("max")),s=parseFloat(e.getAttribute("step"))||1,o=e.dataset.value||e.defaultValue||0,n=parseFloat(e.value.replace(/\$/,"")),n=isNaN(parseFloat(n))?o:("add"==t?n+=s:"sub"==t&&(n-=s),n<a?a:r<n?r:n);e.dataset.value=n,e.value=(e.dataset.prepend||"")+n+(e.dataset.append||""),this.updateChart()}getChartData(){parseFloat(document.getElementById("initial_deposit").dataset.value);var e,t=parseFloat(document.querySelector("#estimated_return").dataset.value/100),d=parseFloat(document.querySelector("#contribution_amount").dataset.value),u=parseInt(document.querySelector("#investment_timespan").value),m=(new Date).getFullYear(),a=parseInt(document.querySelector("#compound_frequency").value),r=parseInt(document.querySelector("#contribution_frequency").value),h=e=parseFloat(document.getElementById("initial_deposit").dataset.value),f=0,p=0,v=(document.querySelector("#contribution_amount"),document.querySelector("#investment_goal"),document.querySelector("#investment_timespan"),document.querySelector("#investment_timespan_text"),document.querySelector("#estimated_return"),document.querySelector("#future_balance")),s=(document.querySelector("#contribution_frequency"),document.querySelector("#compound_frequency"),document.querySelector("#cinterest_result_contributions")),y=document.querySelector("#cinterest_result_compounded_return"),_=document.querySelector("#cinterest_result_value"),g=document.querySelector("#smc_target_date");document.querySelector("#smc-date-interval-amount"),document.querySelector("#smc-date-interval"),document.querySelector("#smc-date-goal"),document.querySelector("#smc-date-date");if("fixed"===this.mode){for(var S=[],o=m;o<m+u;o++)S.push(o);for(var n={label:"Total Principal",backgroundColor:this.settings.chart.principle_colour,data:[]},b={label:"Total Interest",backgroundColor:this.settings.chart.interest_colour,data:[]},i=1;i<=u;i++){var c=0,q=l=e+d*r*i;t&&(c=((k=e*(M=Math.pow(1+t/a,a*i)))+(F=d*(M-1)/(t/r))-l).toFixed(0),q=(k+F).toFixed(0)),v.innerHTML="$"+smcNumberWithCommas(q),n.data.push(l),b.data.push(c),f=l,p=c}return s.innerHTML="$"+smcNumberWithCommas(f),y.innerHTML="$"+smcNumberWithCommas(p),_.innerHTML="$"+smcNumberWithCommas(parseFloat(f)+parseFloat(p)),{labels:S,datasets:[n,b]}}if("date"==this.mode){for(var s=g.value.split("-"),y=s[2],_=s[1],L=s[0],g=new Date(L,_-1,y),s=new Date,x=Math.floor(r*((g-s)/3154e7)),S=[],o=m;o<=L;o++)S.push(o);n={label:"Total Principal",backgroundColor:this.settings.chart.principle_colour,data:[]},b={label:"Total Interest",backgroundColor:this.settings.chart.interest_colour,data:[]};if(t){console.log(t+" "+r+" "+h+" "+e+" ");for(var C=t/r*(h-e*Math.pow(1+t/r,x))/(Math.pow(1+t/r,x)-1),q=(console.log(C),u=L-m,Math.pow(1+t,u*a),0),i=1;i<=x;i++){var l,M,k,F,c=0,q=l=e+C*r*i;t&&(c=((k=e*(M=Math.pow(1+t/a,a*i)))+(F=C*(M-1)/(t/r))-l).toFixed(0),q=(k+F).toFixed(0)),v.innerHTML="$"+smcNumberWithCommas(q),n.data.push(l),b.data.push(c),f=l,p=c}}return{labels:S,datasets:[n,b]}}console.error("System mode not defined")}updateChart(){try{var e=this.getChartData();this.chart.data.labels=e.labels,this.chart.data.datasets[0].data=e.datasets[0].data,this.chart.data.datasets[1].data=e.datasets[1].data,this.chart.update()}catch(e){console.error(e.message)}}registerListeners(e){try{for(var a=this,t=(e.forEach(e=>{document.querySelector(e).addEventListener("change",function(){a.updateValue(this)})}),document.querySelectorAll("[data-counter]")),r=0;r<t.length;r++)t[r].addEventListener("click",function(){var e=document.querySelector('[name="'+this.dataset.field+'"]'),t=this.dataset.counter;e&&a.updateValue(e,t)})}catch(e){console.error(e)}}}!function(){var t=new CInterestClass("fixed","rgb(0, 123, 255)","#1AAF5D");console.log("Interest Manager Initiated");for(const s in t.fields)document.querySelector(t.fields[s].clickListener).addEventListener("click",e=>{e.preventDefault(),t.changeMode(s)});t.registerListeners(["#initial_deposit","#contribution_amount","#investment_goal","#investment_timespan","#smc_target_date","#contribution_frequency","#compound_frequency"]);var e=new Date,a=e.getFullYear()+1,r=e.getMonth(),e=e.getDate(),r=r.toString().length<2?"0"+r.toString():r,e=e.toString().length<2?"0"+e.toString():e;document.querySelector("#smc_target_date").value=a+"-"+r+"-"+e}();