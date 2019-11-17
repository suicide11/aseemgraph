import React, {Component} from 'react'
import axios from 'axios'
class City extends Component {
    state= {
        data:[],
        ready:false,
        file:null
    }
    
    handleCity = () =>{
        return this.props.data.map((city, i) => 
             <button onClick = {()=>{this.props.handleChart(city._id)}} key={city._id} className="btn btn-default" style={{margin:"5px"}}>
                {city._id}
            </button>
        )
        
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        // if(this.state.file!=this.props.file) {
        //     this.handleData
        //     this.setState({
        //         file:this.props.file
        //     })
        // }
        return(
            <div className="container-fluid">
                <center>
                    <br/> <br/>
                    <h5>Select a city to get more info</h5>
                </center>
                {this.handleCity()}
            </div>
        )
    }
}

export default City