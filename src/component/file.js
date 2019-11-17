import React, { Component } from 'react'

function File(props) {
  console.log(props)
  // Build an array of items
  let array = [];
  for (let i = 0; i < props.data.length; i++) {
    array.push(
      <button onClick={() => { props.handleFileName({ file: props.data[i] }) }} className="btn btn-default " style={{ margin: "5px" }} key={i}> {props.data[i]}</button>
    );
  }

  // Render it
  return (
    <div className="container-fluid">
      <br/> <br/>
      <center>
        <h5> Select a File</h5>
        {array}
      </center>

    </div>
  );
}
export default File