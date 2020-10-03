import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	uploadFile: {},
        	downloadLink: ''
        }
    }

    onFileUpload = (event) => {
      let file = event.target.files[0];
      console.log('file ', file)
      if (file.type === 'application/exe' || file.name.split('.').pop() === 'exe') {
        alert('Exe file types not allowed');
        window.location.reload();
      } else if (file.size/10485760 > 2) {
        alert('File size above 20MB is now allowed');
        window.location.reload();
        return;
      } else {
        this.setState({ uploadFile: file });
      }
    }

    submitClick = () => {
		  const data = new FormData();
		  data.append("file", this.state.uploadFile);
		  return axios.post(`http://localhost:8080/upload/${this.state.uploadFile.name}`, data).then(response => {
        this.setState({downloadLink: response && response.data.link});
		  });
    }

    render() {

		const btn = {
			width: "290px",
			backgroundColor: "#2baae1",
			color:"white",
			paddingTop: "0.7rem",
			paddingBottom: "0.7rem",
			border: "1px solid #2baae1",
			borderRadius: "10px",
			marginBottom: "10px"
    };
    
    const div = {
      position: "absolute",
      top: "30%",
      left: "45%",
      marginTop: "-50px",
      marginLeft: "-50px",
      width: "700px",
      height: "100px"
    };

    return (
        	<div style = {div}>
	        	<main>
        			<h2>File Bin</h2>
              {!this.state.downloadLink.length && 
	        		<div>
		        		<input data-max-size="2048"  type="file" onChange={this.onFileUpload} />
		        	</div>
              }
              {!this.state.downloadLink.length && 
		        	<div>
		            	<button style={btn} value="Submit" onClick={this.submitClick}>Submit</button>
		        	</div>
              }
              </main>
    
              {!!this.state.downloadLink.length && 
                <div>
                  <p>Click on the link to start the download:</p>
                  <a href = {this.state.downloadLink} target = "_blank">{this.state.downloadLink}</a>
                </div>
              }
		      </div>
        );
    }
}

export default App; 			