import React, { Component } from 'react';
import AllPlaceChart from './component/allplacechart'
import IndividualPlaceChart from './component/individualplacechart'
import './App.css';
import City from './component/city'
import File from './component/file'
import axios from 'axios'
class App extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    file: null,
    chartType: null,
    files: [],
    ready: false,
    allPlaceData:[]
  }

  componentDidMount() {
    console.log("hi")
    axios({
      method: 'get',
      url: 'https://betterplaceaseem.herokuapp.com/v1/api/rainfall/getdataids',
    })
      .then(async function (response) {
        console.log(response)
        await this.setState({
          files: response.data,
          ready: true
        })
      }.bind(this));
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      placeData: [],
      cityData: []
    })
  }

  handleFileName = async (data) => {
    axios({
      method: 'get',
      url: 'https://betterplaceaseem.herokuapp.com/v1/api/rainfall/getextremes/'+data.file,
    })
      .then(async function (response) {
        console.log(response)
        await this.setState({
          allPlaceData: response.data,
          file:data.file,
          chartType: "All",
        })
      }.bind(this));
  }
  
  handleIndividualPlaceChart = async (data) => {
    // console.log('http://localhost:8181/v1/api/rainfall/getmonthwise/'+this.state.file+'/'+data)
    axios({
      method: 'get',
      url: 'https://betterplaceaseem.herokuapp.com/v1/api/rainfall/getmonthwise/'+this.state.file+'/'+data,
    })
      .then(async function (response) {
        console.log(response)
        await this.setState({
          individualPlaceData: response.data[0].monthlyAvg,
          chartType: "Individual",
        })
      }.bind(this));
  }

  handleId = async(e)=>{
    await this.setState({
      fileId:e.target.value
    })
  }

  handleUpload = async () => {
    const data = new FormData()
    await data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    console.log(data)
    axios
      .post('https://betterplaceaseem.herokuapp.com/v1/api/rainfall/upload/'+this.state.fileId, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        alert(res.data)
      })
  }
  render() {
    console.log(this.state)
    return (
      <div className="container-fluid">
        <div className="row grid-margin">
          <div className="navigation">
            
            <input type="file" name="" id="" onChange={this.handleselectedFile} />
            <input type="text" name="" id="" onChange={this.handleId} placeholder="enter id for the file"/> &nbsp; &nbsp;
            <button onClick={this.handleUpload}>Upload</button>
          </div>
        </div>
        <br/><br/>
        {this.state.chartType == "All" && <div style={{ height: "50vh", width: "99vw" }} className="row grid-margin">
          <AllPlaceChart data={this.state.allPlaceData}></AllPlaceChart>
        </div>}
        {this.state.chartType == "Individual" && <div style={{ height: "50vh", width: "99vw" }} className="row grid-margin">
          <IndividualPlaceChart data= {this.state.individualPlaceData}></IndividualPlaceChart>
        </div>}
        {this.state.ready && <div className="row grid-margin">
            <File data={this.state.files} handleFileName={this.handleFileName} />
        </div>}
        {this.state.file && <div className="row grid-margin">
          <City data={this.state.allPlaceData} handleChart={this.handleIndividualPlaceChart} ></City>
        </div>}
      </div>
    )
  }
}

export default App;
