(this["webpackJsonptwist-pie-chart"]=this["webpackJsonptwist-pie-chart"]||[]).push([[0],{10:function(t,a,e){t.exports=e(17)},16:function(t,a,e){},17:function(t,a,e){"use strict";e.r(a);var i=e(7),o=e(1),n=e(2),r=e(3),s=e(4),l=e(5),h=e(0),p=e.n(h),c=e(9),d=e.n(c),u=e(6),C=(e(16),function(t){Object(l.a)(e,t);var a=Object(s.a)(e);function e(t){var i;Object(o.a)(this,e),(i=a.call(this,t)).handleMouseMove=function(t){var a=i.findPos(i.pieChartCanvas),e=t.pageX-a.x,o=t.pageY-a.y,n=i.pieChartPickingCtx.getImageData(e,o,1,1).data,r=n[2]/i.pieChartPickingColorOffSet-1,s=[];i.aggData.forEach((function(t){s.push(i.props.dataTypeToColorDict[t.type])})),i.drawPieChart(i.pieChartCtx,s,s[r]),0!==n[2]&&255===n[3]?i.setState({toolTipLeft:t.clientX-75,toolTipTop:t.clientY+15,canvasToolTipVisibility:"visible",currentHovering:Object(u.a)({},i.aggData[r],{color:s[r]})}):i.setState(Object(u.a)({},i.state,{canvasToolTipVisibility:"hidden"})),i.state.currentHovering,i.aggData[r]},i.handleMouseOut=function(){i.setState(Object(u.a)({},i.state,{canvasToolTipVisibility:"hidden"}))},i.data=i.props.data,i.title=i.props.title,i.typeToColorDict=i.props.dataTypeToColorDict,i.pieChartCtx=null,i.pieChartPickingCtx=null,i.pieChartCanvasW=i.props.width,i.pieChartCanvasH=400,i.pieChartToolTipW=120,i.pieChartToolTipH=190,i.pieChartToolTipOffsetY=60,i.state={canvasToolTipVisibility:"hidden",toolTipLeft:i.pieChartCanvasW-i.pieChartToolTipW,toolTipTop:i.pieChartCanvasH-i.pieChartToolTipH+i.pieChartToolTipOffsetY},i.colorToDataTypeDict={},i.pieChartColors=[],i.pieChartPickingColors=[],i.pieChartPickingColorOffSet=7;for(var n=1;n<=i.data.length;n++)i.pieChartPickingColors.push(i.digToRgbStr(n));return i}return Object(n.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.pieChartCanvas=this.refs.canvas,this.pieChartPickingCanvas=this.refs.pieChartPickingCanvas,this.tooltipCanvas=this.refs.tooltipCanvas,this.pieChartCtx=this.pieChartCanvas.getContext("2d"),this.pieChartPickingCtx=this.pieChartPickingCanvas.getContext("2d"),this.aggData=this.aggTheData(this.data),this.pieChartPickingColors=[];for(var a=1;a<=this.aggData.length;a++)this.pieChartPickingColors.push(this.digToRgbStr(a));var e=[];this.aggData.forEach((function(a){e.push(t.props.dataTypeToColorDict[a.type])})),this.drawPieChart(this.pieChartCtx,e),this.drawPieChart(this.pieChartPickingCtx,this.pieChartPickingColors," ",!0)}},{key:"componentDidUpdate",value:function(){var t=this;this.data=this.props.data,this.title=this.props.title,this.typeToColorDict=this.props.dataTypeToColorDict,this.aggData=this.aggTheData(this.data),this.pieChartPickingColors=[];for(var a=1;a<=this.aggData.length;a++)this.pieChartPickingColors.push(this.digToRgbStr(a));var e=[];this.aggData.forEach((function(a){e.push(t.props.dataTypeToColorDict[a.type])})),"hidden"===this.state.canvasToolTipVisibility&&(this.drawPieChart(this.pieChartCtx,e),this.drawPieChart(this.pieChartPickingCtx,this.pieChartPickingColors," ",!0))}},{key:"aggTheData",value:function(t){var a=this,e=[],i={};return this.dataSum=0,this.pieChartColors=[],t.forEach((function(t){a.dataSum+=t.value,i[t.type]?i[t.type]={value:i[t.type].value+=t.value}:i[t.type]={value:t.value}})),Object.keys(i).forEach((function(t,o){var n=i[t];a.pieChartColors.push(a.typeToColorDict[t]),n.percent=n.value/a.dataSum,n.rad=2*n.percent*Math.PI,n.type=t,a.colorToDataTypeDict[a.pieChartColors[o]]=n,e[o]=n})),e.sort((function(t,a){return t.rad-a.rad})),e}},{key:"drawPieChart",value:function(t,a){var e,i,o,n,r,s,l,h,p,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",d=arguments.length>3&&void 0!==arguments[3]&&arguments[3],u=10,C=0,v=0,g=this.pieChartCanvasW/2,f=this.pieChartCanvasH/2+30,T="ERROR",m="",y=0;if(t){t.clearRect(0,0,this.pieChartCanvasW,this.pieChartCanvasH);for(var D=0;D<this.aggData.length;D++)if(e=d?this.pieChartCanvasW/4+10:this.pieChartCanvasW/4,T=this.aggData[D].type,C=v,s=((v+=this.aggData[D].rad)+C)/2,i=g+.6*e*(l=Math.cos(s)),o=f+.6*e*(h=Math.sin(s)),m=a[D],d?(n=0,r=0):m===c?(n=l*u,r=h*u):(n=2*l,r=2*h),(p=this.roundDegToMultiOfTen(this.toDegree(s)))<=y+5?p=y+=6:y=p,t.beginPath(),t.fillStyle=m,t.moveTo(g+n,f+r),t.arc(g+n,f+r,e,C,v),t.lineTo(g+n,f+r),t.strokeStyle=m,t.fill(),t.textAlign="center",t.textBaseline="top",t.font=c!==m?"bold 10pt MuseoSans":"900 10pt MuseoSans",t.fillStyle=d?m:"#1f589d",this.aggData[D].percent>.15)d||t.fillText(T,i,o);else{var b=Math.cos(this.toRadians(p)),S=Math.sin(this.toRadians(p)),k=d?e-=10:e,E=g+.8*k*b+k/2*b,x=f+.9*k*S+k/2*S;if(d){var P=t.measureText(T).width,M=parseInt(t.font.match(/\d+/),11),w=12;p>=90&&p<180?t.rect(E-P,x,P,w):p>=180&&p<270?t.rect(E-P,x-M-2,P,w):p>=270?t.rect(E,x-M-2,P,w):t.rect(E,x,P,w),t.fillStyle=m[D],t.fill()}else this.aggData[D].percent>.15&&t.fillText(T,i,o),i=g+.9*e*l,o=f+.9*e*h,t.lineWidth=c===m[D]?2:1.3,t.beginPath(),t.moveTo(i,o),t.lineTo(i+e/5*l,o+e/5*h),p>=90&&p<180?(t.textAlign="right",t.textBaseline="top"):p>=180&&p<270?(t.textAlign="right",t.textBaseline="bottom"):p>=270?(t.textAlign="left",t.textBaseline="bottom"):(t.textAlign="left",t.textBaseline="top"),t.lineTo(E,x),t.stroke(),t.fillText(T,E,x)}}}},{key:"roundDegToMultiOfTen",value:function(t){return t<10?10:t>=350?360:Number(String(t).slice(0,-1)+0)}},{key:"toDegree",value:function(t){return t*(180/Math.PI)}},{key:"toRadians",value:function(t){return t*(Math.PI/180)}},{key:"findPos",value:function(t){var a=0,e=0;if(t.offsetParent){do{a+=t.offsetLeft,e+=t.offsetTop}while(t=t.offsetParent);return{x:a,y:e}}}},{key:"digToRgbStr",value:function(t){return"rgb(0,0,"+t*this.pieChartPickingColorOffSet+")"}},{key:"randomRgba",value:function(){var t=Math.round,a=Math.random;return"rgba("+t(255*a())+","+t(255*a())+","+t(255*a())+","+a().toFixed(1)+")"}},{key:"drawBreakDownBars",value:function(){for(var t={peach:this.randomRgba(),peach1:this.randomRgba(),orange:this.randomRgba(),cyan:this.randomRgba(),red:this.randomRgba()},a=new Set([0,1]),e=new Set([2,3,4,5,6]),i=0,o=10,n=this.tooltipCanvas.getContext("2d"),r=0;r<10;r++){var s=void 0;n.moveTo(0,i),n.moveTo(0,o),s=e.has(r)?t.orange:a.has(r)?t.red:t.cyan,n.fillStyle=s,n.fillRect(20,o,20,10),n.fillStyle="black",n.fillText("TEST",50,o+10),i=o,o+=10}}},{key:"drawTooltip",value:function(){for(var t={peach:this.randomRgba(),peach1:this.randomRgba(),orange:this.randomRgba(),cyan:this.randomRgba(),red:this.randomRgba()},a=new Set([0,1]),e=new Set([2,3,4,5,6]),i=0,o=10,n=this.tooltipCanvas.getContext("2d"),r=0;r<10;r++){var s=void 0;n.moveTo(0,i),n.moveTo(0,o),s=e.has(r)?t.orange:a.has(r)?t.red:t.cyan,n.fillStyle=s,n.fillRect(20,o,20,10),n.fillStyle="black",n.fillText("TEST",50,o+10),i=o,o+=10}}},{key:"render",value:function(){var t=this.props.titleUnit,a=this.state.currentHovering,e={chartContainer:{width:this.props.width},pieChartTitle:{fontSize:"25pt"},pickingCanvas:{display:"none"},tooltipContainer:{width:this.pieChartToolTipW,left:this.state.toolTipLeft,top:this.state.toolTipTop,visibility:this.state.canvasToolTipVisibility,zIndex:9999}};return p.a.createElement("div",{className:"pie-chart-container",style:{width:e.chartContainer.width}},p.a.createElement("div",{className:"pie-chart-title",style:{fontSize:e.pieChartTitle.fontSize}},p.a.createElement("span",null,this.title+" "+this.dataSum," "),p.a.createElement("span",{className:"pie-chart-title-measurements"},t)),p.a.createElement("canvas",{style:e.pickingCanvas,className:"pie-chart-picking-canvas",ref:"pieChartPickingCanvas",width:this.pieChartCanvasW,height:this.pieChartCanvasH}),p.a.createElement("canvas",{className:"pie-chart-canvas",ref:"canvas",width:this.pieChartCanvasW,height:this.pieChartCanvasH,onMouseMove:this.handleMouseMove,onMouseOut:this.handleMouseOut}),a?p.a.createElement("div",{className:"pie-chart-tooltip-container",style:e.tooltipContainer},p.a.createElement("div",{className:"pie-chart-tooltip-title-container",style:{backgroundColor:a.color?a.color:"white"}},p.a.createElement("span",{className:"pie-chart-tooltip-title"},a.type?a.type:"")),p.a.createElement("span",{className:"pie-chart-tooltip-percent"},a.value?a.value:""),p.a.createElement("span",{className:"pie-chart-tooltip-details"},t),p.a.createElement("br",null),p.a.createElement("span",{className:"pie-chart-tooltip-percent"},a.percent?Math.round(100*a.percent.toFixed(2))+"%":""),p.a.createElement("span",{className:"pie-chart-tooltip-details"},"of total")):null)}}]),e}(h.PureComponent)),v=function(t){Object(l.a)(e,t);var a=Object(s.a)(e);function e(t){var n;return Object(o.a)(this,e),(n=a.call(this,t)).handleSubmit=function(t){t&&t.preventDefault();var a=n.data.value.replace(/(\w+:)|(\w+ :)/g,(function(t){return'"'+t.substring(0,t.length-1)+'":'})),e=JSON.parse(a);n.state.data.push(e),n.setState({data:[].concat(Object(i.a)(n.state.data),[e])})},n.dataTypeToColorDict={MEDS:"#C2EEF8",FLUSHES:"#5DD2EF",TPN:"#84A5D5",FEEDS:"#A3DBDC",lol434ra:"#C13BDA",xbo4334x:"#613BFA"},n.state={data:[{value:1,type:"MEDS"},{value:1,type:"FLUSHES"},{value:20,type:"FEEDS"},{value:10,type:"FEEDS"},{value:1,type:"TPN"}]},n.meds=["MEDS","FLUSHES","FEEDS","TPN"],n.handleRemoveBtnCLick=n.handleRemoveBtnCLick.bind(Object(r.a)(n)),n}return Object(n.a)(e,[{key:"componentDidMount",value:function(){}},{key:"handleRemoveBtnCLick",value:function(){var t=this.state.data;t=t.slice(0,-1),this.setState({data:t})}},{key:"simulateDataChange",value:function(){var t=Math.floor(100*Math.random())+0,a=Math.floor(4*Math.random())+0;if(t%11===0){var e=this.state.data;e=e.slice(0,-1),this.setState({data:e})}else{var o={value:Math.floor(100*Math.random())+1,type:this.meds[a]};this.state.data.push(o),this.setState({data:[].concat(Object(i.a)(this.state.data),[o])})}}},{key:"render",value:function(){var t=this,a=this.state,e=a.data;a.width;return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",null,"Pass in data in the form: ",' { value: 1, type: "MEDS" } '),p.a.createElement("form",{onSubmit:this.handleSubmit},p.a.createElement("input",{style:{height:"50px",width:"50%",fontSize:"14pt"},placeholder:"data",type:"text",ref:function(a){t.data=a}}),p.a.createElement("button",null,"ADD DATA")),p.a.createElement("button",{onClick:this.handleRemoveBtnCLick},"REMOVE DATA"),p.a.createElement(C,{data:e,width:500,dataTypeToColorDict:this.dataTypeToColorDict,title:"Calories",titleUnit:"mL/kg/day"}))}}]),e}(h.Component);d.a.render(p.a.createElement(v,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.97e98865.chunk.js.map