import React, { Component } from "react";
import { Link, Switch, Route, useParams } from 'react-router-dom'
import CaseModelAllCase from '../components/CaseModelAll';
import axios from 'axios'
import CanvasJSReact from '../lib/canvasjs.react';
import {CanvasJS} from '../lib/canvasjs.min.js';
import Chart  from 'chart.js'
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
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  var arrVaka =  [  { label: "11-08-2012",  y: 12  },
                    { label: "05-12-2013", y: 15  },
                    { label: "24-05-2017", y: 3  },
                    { label: "24-06-2017",  y: 38  },
                    { label: "01-01-2021",  y: 35  }]
  
  var arrVefat = [
                    { label: "11-08-2012",  y: 22  },
                    { label: "05-12-2013", y: 11  },
                    { label: "24-05-2017", y: 36  },
                    { label: "24-06-2017",  y: 22  },
                    { label: "01-01-2021",  y: 9  }]
  
  var arrTaburcu = [{ label: "11-08-2012",  y: 3  },
                    { label: "05-12-2013", y: 5  },
                    { label: "24-05-2017", y: 16  },
                    { label: "24-06-2017",  y: 21  },
                    { label: "01-01-2021",  y: 3  }]
  const options = {
      title: { text: "Sample Date Chart ( Vaka - Vefat - Taburcu )" },
      data: [ {				
                type: "column",
                name: "VakaColumn",
                dataPoints: arrVaka
              },
              {				
                type: "column",
                name: "VefatColumn",
                dataPoints: arrVefat
              },
              {				
                type: "column",
                name: "TaburcuColumn",
                dataPoints: arrTaburcu
              }
      ]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
}

const CityCharter = () => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  var arrVaka =  [  { label: "Ankara",  y: 15  },
                    { label: "Izmir", y: 5  },
                    { label: "Istanbul", y: 21  },
                    { label: "Washington",  y: 22  },
                    { label: "Berlin",  y: 5  }]
  
  var arrVefat = [
                    { label: "Ankara",  y: 34  },
                    { label: "Izmir", y: 12  },
                    { label: "Istanbul", y: 21  },
                    { label: "Washington",  y: 8  },
                    { label: "Berlin",  y: 17  }]
  
  var arrTaburcu = [{ label: "Ankara",  y: 25  },
                    { label: "Izmir", y: 15  },
                    { label: "Istanbul", y: 13  },
                    { label: "Washington",  y: 42  },
                    { label: "Berlin",  y: 27  }]
  const options = {
      title: { text: "Sample City Chart ( Vaka - Vefat - Taburcu )" },
      data: [ {				
                type: "column",
                name: "VakaColumn",
                dataPoints: arrVaka
              },
              {				
                type: "column",
                name: "VefatColumn",
                dataPoints: arrVefat
              },
              {				
                type: "column",
                name: "TaburcuColumn",
                dataPoints: arrTaburcu
              }
      ]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
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
	//if there is no input, show all records
    

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
	console.log("fetched path: " + path)

	let url = 'http://localhost:8080/CaseModel/'+route+ path	
  response = await axios(url);
  
  //responsa.data is the array of json objects
  console.log("city data:"+response.data)
  
  //res is the array of JSON documents, datalist keeps each document as a string object
  textCity="<ul>"
  response.data.forEach(element => {
      
      var record = ["Tarih: " + element["tarih"] + " ","Şehir: " + element["il"] + " ","Vaka: " + element["vaka"] + " ","Vefat: " + element["vefat"] + " ","Taburcu: " + element["taburcu"]]
      console.log("record: "+record)

      textCity+="<li>"+record+"</li>"
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
        var record = ["Tarih: " + element["tarih"] + " ","Şehir: " + element["il"] + " ","Vaka: " + element["vaka"] + " ","Vefat: " + element["vefat"] + " ","Taburcu: " + element["taburcu"]]
        console.log("record: "+record)

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