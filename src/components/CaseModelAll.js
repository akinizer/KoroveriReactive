import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'

const CaseModelAllCase = () => {
	
	var myRef=React.createRef()
	
	var datalist=[]
	var response
	var inputlist=[]
  
  //this function gets all data from mongodb through REST API
  async function fetcher(){    
    let url = 'http://localhost:8080/CaseModel/all';
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
      <div className="container mt-3"></div>
      <div>
        {fetcher(),mate()}
        <h3>List:</h3>
        <p ref={myRef} id="bop"></p>          
      </div>
        
    </div>	
  )

	
}

export default CaseModelAllCase
