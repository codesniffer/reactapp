import React from 'react';
import Select from 'react-select';

var selectedProvider = null;
var selectedAction = null;

var dataSourceProvider = [
   { value: 'censys', label: 'Censys' },
   { value: 'shodan', label: 'Shodan' }
];

var dataSoruceCensys = [
   { value: 'search', label: 'Search' },
   { value: 'view', label: 'View' },
   { value: 'report', label: 'Report' }
];
var dataSoruceShodan = [
   { value: 'host', label: 'Host' },
   { value: 'count', label: 'Count' },
   { value: 'port', label: 'Port' },
   { value: 'protocol', label: 'Protocol' },
   { value: 'search', label: 'Search' },
   { value: 'scaninternet', label: 'Scan Internet' },
   { value: 'querysearch', label: 'Query Search' }
];

class AppMain extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         dataSourceProvider: dataSourceProvider,
         dataSoruceAction: dataSoruceCensys,
         valueProvider: dataSourceProvider[0].value,
         valueAction: dataSoruceCensys[0].value
      }

      selectedProvider = this.state.valueProvider;
      selectedAction = this.state.valueAction;

      this.updateState = this.updateState.bind(this);
      this.submitRequest = this.submitRequest.bind(this);
      this.eventHandlerDataSourceProviderChange = this.eventHandlerDataSourceProviderChange.bind(this);
      this.eventHandlerDataSourceActionChange = this.eventHandlerDataSourceActionChange.bind(this);

   };

   eventHandlerDataSourceProviderChange(val) {
      if(val.value == 'shodan') {
         this.setState ({dataSoruceAction: dataSoruceShodan});
         selectedProvider = 'shodan';
      } else {
         this.setState ({dataSoruceAction: dataSoruceCensys});
         selectedProvider = 'censys';
      }
      this.setState({valueProvider: val});
      this.setState({valueAction: null});
   }
   eventHandlerDataSourceActionChange(val) {
      selectedAction = val.value;
      this.setState({valueAction: val});
   }

   updateState(e) {
      this.setState({data: e.target.value});
   }

   submitRequest() {
      //this.setState({data: ''});
      //ReactDOM.findDOMNode(this.refs.myInput).focus();
      console.log ("Provider: ", selectedProvider, " Action: ", selectedAction);
   }

   render() {
      return (
         <div>
            <div> 
               <h3> Data Providers</h3>
               <Select name="dropdown-data-srouce" value={this.state.valueProvider} options={this.state.dataSourceProvider} onChange={this.eventHandlerDataSourceProviderChange}/>
            </div>
            <div> 
                <h3> Actions</h3>
               <Select name="dropdown-actions" value={this.state.valueAction} options={this.state.dataSoruceAction} onChange={this.eventHandlerDataSourceActionChange}/>
            </div>
            <div>
               <button onClick = {this.submitRequest}>Submit</button>
            </div>
         </div>
         
      );
   }
}

// class Header extends React.Component {
//    render() {
//       return (
//          <div>
//             <h1>Header</h1>
//          </div>
//       );
//    }
// }

// class Content extends React.Component {
//    render() {
//       return (
//          <div>
//             <h2>Content</h2>
//             <p>The content text!!!</p>
//          </div>
//       );
//    }
// }

export default AppMain;