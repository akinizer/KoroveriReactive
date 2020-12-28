import React, { Component } from "react";
import { Link, Switch, Route, useParams } from 'react-router-dom'
import CaseModelAllCase from '../components/CaseModelAll';
import axios from 'axios'
const AllCases = () => {

	return(
	<div>
       <div className="container mt-3">
          <Switch>
			<Route exact path={["/all"]} component={CaseModelAllCase} />
		</Switch>
        </div>
	  </div>	

	)

}

const MainCase = () => {
  return (
	<div>
			<h1>WELCOME</h1>
			
	</div>
   
  );
}

const CityCases = (prop) => {
 


  return getCities(prop)
}

const AddCases = () => {
   var inputlist=[]

  return (
    <div>
      <form>
        <label>SEHIR: </label><input type="text" id="cval" name="cval" onChange={event => (inputlist[0]=(event.target.value))}></input><br></br>
        <label>TARIH:</label><input type="tval" id="tval" name="tval" onChange={event => (inputlist[1]=(event.target.value))}></input><br></br>
        <label>VAKA:</label><input type="vkval" id="vkval" name="vkval" onChange={event => (inputlist[2]=(event.target.value))}></input><br></br>
        <label>VEFAT:</label><input type="vfval" id="vkval" name="vfval" onChange={event => (inputlist[3]=(event.target.value))}></input><br></br>
        <label>TABURCU:</label><input type="tbval" id="tbval" name="tbval" onChange={event => (inputlist[4]=(event.target.value))}></input><br></br><br></br>
        <input type="submit" value="Submit" onClick={event => (alert(inputlist))}></input>
      </form>
    </div>	
  )
}

const DateCases = (prop) => {
  return getDates(prop)
}

export {MainCase,AllCases,CityCases,AddCases,DateCases}

function getCities(prop){
  var myRef=React.createRef()	
	var datalist=[]
	var response

  //this function gets all data from mongodb through REST API
  async function fetcher(){    
  var path = JSON.stringify(prop.match.params.attr)
  
	path = path.substr(1)
	path = path.substr(0,path.length-1)
	console.log(path)

	let url = 'http://localhost:8080/CaseModel/sehir/'+ path
		
    response = await axios(url);
    //res is the array of json objects
	let res = response.data
	
    //res is the array of JSON documents, datalist keeps each document as a string object
    res.forEach(element => {
        var record = [JSON.stringify(element["id"]),element["tarih"],element["il"],element["vaka"],element["vefat"],element["taburcu"]]
        console.log("record: "+record)

        //this.datalist.push(JSON.stringify(element,null,2)+"\r")
        datalist.push(record)
    });   

    //report the JSON content as strings
    console.log("Data Fetch:\n"+datalist)
  }
  //save reference of the datalist to HTML using react reference, then transfer it to an HTML object  
  var mate = function(...index){
	//if there is no imput, show all records

    if(index.length===0){
      setTimeout(
        () => myRef.current.innerHTML = datalist,500
      )   
    }
    //otherwise show the specified record
    else{
      setTimeout(
        () => myRef.current.innerHTML = datalist[index[0]],500
      )   
    }
  }    

  return (
	

	<div>
       <div className="container mt-3">
        
        </div>
		 <div>          
          
		  {fetcher(),mate()}
          <h3>List:</h3>
          <p ref={myRef} id="bop"></p>          
		</div>
    
  </div>	
  )
}

function getDates(prop){
  var myRef=React.createRef()	
	var datalist=[]
	var response

  //this function gets all data from mongodb through REST API
  async function fetcher(){    
  var path = JSON.stringify(prop.match.params.attr)
  
	path = path.substr(1)
	path = path.substr(0,path.length-1)
	console.log(path)

	let url = 'http://localhost:8080/CaseModel/tarih/'+ path
		
    response = await axios(url);
    //res is the array of json objects
	let res = response.data
	
    //res is the array of JSON documents, datalist keeps each document as a string object
    res.forEach(element => {
        var record = [JSON.stringify(element["id"]),element["tarih"],element["il"],element["vaka"],element["vefat"],element["taburcu"]]
        console.log("record: "+record)

        //this.datalist.push(JSON.stringify(element,null,2)+"\r")
        datalist.push(record)
    });   

    //report the JSON content as strings
    console.log("Data Fetch:\n"+datalist)
  }
  //save reference of the datalist to HTML using react reference, then transfer it to an HTML object  
  var mate = function(...index){
	//if there is no imput, show all records

    if(index.length===0){
      setTimeout(
        () => myRef.current.innerHTML = datalist,500
      )   
    }
    //otherwise show the specified record
    else{
      setTimeout(
        () => myRef.current.innerHTML = datalist[index[0]],500
      )   
    }
  }    

  return (
	

	<div>
       <div className="container mt-3">
        
        </div>
		 <div>          
          
		  {fetcher(),mate()}
          <h3>List:</h3>
         <p ref={myRef} id="bop"></p>         
		</div>
    
  </div>	
  )
}