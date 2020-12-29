import React, { Component } from "react";
import { Link, Switch, Route, useParams } from 'react-router-dom'
import CaseModelAllCase from '../components/CaseModelAll';
import axios from 'axios'
import CanvasJSReact from '../lib/canvasjs.react';

//GLOBALS
var textDate
var textCity

// WEP PAGES AND REDIRECTED SUBPAGES

const AllCases = () => {

	return(
	<div>
       <div className="container mt-3">
        <Switch>
            <Route exact path={["/all"]} component={CaseModelAllCase} />
        </Switch>
      </div>
      <canvas id="canvas"></canvas>       
    </div>	
    

  )
  

}

const MainCase = () => {
  return (
	<div>
			<h1>WELCOME</h1><br></br>
      <p>This project is prepared as two parts: Backend and Frontend</p>
      <p>Backend part benefits from SpringBoot, Maven, REST API, MongoDB, Java and XML</p>
      <p>Frontend part benefits from Reactive Bootstrap and javascript</p><br></br>

      <p>In this project you can browser a list of records from mongodb, advance to date or city filtered sublists, insert new records and enjoy graphical representations!</p><br></br>
      <p>Full-stack credits to: Akın Berkay Bal</p>			
	</div>
   
  );
}

const CityCases = (prop) => {
  return getCities(prop)
}

const AddCases = () => {
   var inputlist=[] 
   insertRecordTest()

  return (
    <div>     
      <form method="none">
        <pre>
          <label>SEHIR:   </label><input type="text" id="cval" name="cval" onChange={event => (inputlist[0]=(event.target.value))}></input><br></br>
          <label>TARIH:   </label><input type="tval" id="tval" name="tval" onChange={event => (inputlist[1]=(event.target.value))}></input><br></br>
          <label>VAKA:    </label><input type="vkval" id="vkval" name="vkval" onChange={event => (inputlist[2]=(event.target.value))}></input><br></br>
          <label>VEFAT:   </label><input type="vfval" id="vkval" name="vfval" onChange={event => (inputlist[3]=(event.target.value))}></input><br></br>
          <label>TABURCU: </label><input type="tbval" id="tbval" name="tbval" onChange={event => (inputlist[4]=(event.target.value))}></input><br></br><br></br>
          <input type="submit" value="Report!" onClick={event => (insertRecord(inputlist) )}></input>
        </pre>
      </form>

    </div>	
  )
}

const DateCases = (prop) => {
  return getDates(prop)
}

const DateCharter = () => {
  render()
  
  return (
	<div>
			<h1>Adding through CanvasJSReact...</h1><br></br>

     	<div id="chartContainer" style={{height : "300px", width: "100%"}}></div>
          
        
      <div id="chartContainer" style={{height : "300px", width: "100%"}} ></div>
     	
	</div>
   
  );
}

const CityCharter = () => {
  render()
  return (
	<div>
      <h1>Adding through CanvasJSReact...</h1><br></br>

     	<div id="chartContainer" style={{height : "300px", width: "100%"}}></div>
          
      <div>
        
      <div id="chartContainer" style={{height : "300px", width: "100%"}} ></div>
     

    </div>

	</div>
   
  );
}

const Charter = () => {
  return (
	<div>
			<h2>--Choose The Chart Type--</h2><br></br>
      <form>
        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
        <input type="submit" value="City!" formAction="/CaseModel/chart/city"></input>         
        &nbsp; &nbsp; &nbsp;
         <input type="submit" value="Date!" formAction="/CaseModel/chart/date"></input>
      </form>
     	
	</div>
   
  );
}

export {MainCase,AllCases,CityCases,AddCases,DateCases,DateCharter,CityCharter,Charter}

//////////////////////////////////// DATE AND CITY OPERATIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCities(prop){
  var myRef=React.createRef()	
	var datalist=[]
	var response

  //save reference of the datalist to HTML using react reference, then transfer it to an HTML object  
  var mate = function(...index){
	//if there is no imput, show all records

    if(index.length===0){
      setTimeout(
        () => myRef.current.innerHTML = textCity,500
      )   
    }
    //otherwise show the specified record
    else{
      setTimeout(
        () => myRef.current.innerHTML = textCity,500
      )   
    }
  }    

  return (	

    <div>
      <div className="container mt-3"></div>
      <div>
        { (fetcherCities(prop,response,datalist),mate()) }
          <h3>List:</h3>
          <p ref={myRef} id="bop"></p>          
      </div>
    </div>	
  )
}

//////////////////////////////////// DATE AND CITY SUPPORT OPERATIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getDates(prop){
  var myRef=React.createRef()	
	var datalist=[]
	var response

  //save reference of the datalist to HTML using react reference, then transfer it to an HTML object  
  var mate = function(...index){
	//if there is no imput, show all records
    

    if(index.length===0){
      setTimeout(
        () => myRef.current.innerHTML = textDate,500
      )   
    }
    //otherwise show the specified record
    else{
      setTimeout(
        () => myRef.current.innerHTML = textDate,500
      )   
    }
  }    

  return (
    <div>
        <div className="container mt-3">
          
          </div>
      <div>          
            
        { (fetcherDates(prop,response,datalist),mate()) }
            <h3>List:</h3>
          <p ref={myRef} id="bop"></p>         
      </div>
      
    </div>	
  )
}

//this function gets all data from mongodb through REST API
async function fetcherCities(prop,response,datalist){
  var route = 'sehir/'
  
  var path = JSON.stringify(prop.match.params.attr)
  
	path = path.substr(1)
	path = path.substr(0,path.length-1)
	console.log(path)

	let url = 'http://localhost:8080/CaseModel/'+route+ path	
  response = await axios(url);
  
  //responsa.data is the array of json objects
  console.log("city data:"+response.data)
  
  //res is the array of JSON documents, datalist keeps each document as a string object
  textCity="<ul>"
  response.data.forEach(element => {
      
      var record = [JSON.stringify(element["id"]),element["tarih"],element["il"],element["vaka"],element["vefat"],element["taburcu"]]
      console.log("record: "+record)

      textCity += "<li>" + "<a href="+"http://localhost:3000/CaseModel/city/"+ element.il + ">" + record + "</li></a>"
      datalist.push(record)
  });   
  textCity+="</ul>"

  console.log("city:"+JSON.stringify(textCity))

  //report the JSON content as strings
  console.log("Data Fetch:\n"+datalist)
}

//this function gets all data from mongodb through REST API
async function fetcherDates(prop,response,datalist){    
  
  var path = JSON.stringify(prop.match.params.attr)
  var route = "tarih/"
  path = path.substr(1)
  path = path.substr(0,path.length-1)
  console.log(path)

  let url = 'http://localhost:8080/CaseModel/'+ route + path
    
  response = await axios(url);
  //responsa.data is the array of json objects
  console.log("city data:"+response.data)

  //res is the array of JSON documents, datalist keeps each document as a string object
  textDate="<ul>"
    response.data.forEach(element => {
        var record = [JSON.stringify(element["id"]),element["tarih"],element["il"],element["vaka"],element["vefat"],element["taburcu"]]
        console.log("record: "+record)

        //this.datalist.push(JSON.stringify(element,null,2)+"\r")
        textDate+="<li>"+record+"</li>"
        datalist.push(record)
    });   
    textDate+="</ul>"
    //report the JSON content as strings
    console.log("Data Fetch:\n"+datalist)
}

///////////////////////////////////////////////////////////// INSERT OPERATIONS  /////////////////////////////////////////////////////////////////////////////////////////////////////
function insertRecord(record){
  var sehir = record[0]
  var tarih = record[1]
  var vaka = record[2]
  var vefat = record[3]
  var taburcu = record[4]

  let url = 'http://localhost:8080/CaseModel/add'
  let details = { 
          "tarih": tarih,
          "il": sehir,
          "vaka": vaka,
          "vefat": vefat,
          "taburcu": taburcu
  }

  let jsondata = JSON.stringify(details)
  postData(url, jsondata)
    .then(data => { console.log(data)
  });

  alert("Record inserted: {" + record + "}")
}


function insertRecordTest(){
  var sehir = "Ank"
  var tarih = "12-12-2012"
  var vaka = 12
  var vefat = 13
  var taburcu = 14

  let url = 'http://localhost:8080/CaseModel/add'
  let details = { 
    "tarih": tarih,
    "il": sehir,
    "vaka": vaka,
    "vefat": vefat,
    "taburcu": taburcu
  }

  let jsondata = JSON.stringify(details)
  postData(url, jsondata)
    .then(data => { console.log(data)
  });

}

async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
  return response; // parses JSON response into native JavaScript objects
}

/////////////////////////////////////////////////////////// CHART OPERATIONS ///////////////////////////////////////////////////////////////////////////////
function render(){
  /*
  var chart = new CanvasJSReact.CanvasJSChart("chartContainer", {
	theme: "dark1", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: "Desktop Browser Market Share in 2016"
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: {y}%",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		indexLabel: "{label} - {y}%",
		dataPoints: [
			{ y: 51.08, label: "Chrome" },
			{ y: 27.34, label: "Internet Explorer" },
			{ y: 10.62, label: "Firefox" },
			{ y: 5.02, label: "Microsoft Edge" },
			{ y: 4.07, label: "Safari" },
			{ y: 1.22, label: "Opera" },
			{ y: 0.44, label: "Others" }
		]
	}]
});
chart.render();
*/
  const options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [{				
                type: "column",
                dataPoints: [
                    { label: "Apple",  y: 10  },
                    { label: "Orange", y: 15  },
                    { label: "Banana", y: 25  },
                    { label: "Mango",  y: 30  },
                    { label: "Grape",  y: 28  }
                ]
       }]
   }

   return (
      <div>
        <CanvasJSReact.CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  
}

