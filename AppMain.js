import React from 'react';
import Select from 'react-select';


class AppMain extends React.Component {

   constructor(props) {
      super(props);
     
      var dataSourceProvider = [
         { value: 'shodan', label: 'Shodan' },
         { value: 'censys', label: 'Censys' }
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
      
      this.state = {
         dataSourceProvider: dataSourceProvider,
         dataSoruceAction: dataSoruceCensys,
         valueProvider: dataSourceProvider[0].value,
         valueAction: dataSoruceCensys[0].value
      }

      this.updateState = this.updateState.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.eventHandlerDataSourceProviderChange = this.eventHandlerDataSourceProviderChange.bind(this);
      this.eventHandlerDataSourceActionChange = this.eventHandlerDataSourceActionChange.bind(this);

   };

   eventHandlerDataSourceProviderChange(val) {
    console.dir(val);
     this.setState({valueProvider: val});
     console.dir(this.state);
   }
   eventHandlerDataSourceActionChange(val) {
    console.dir(val);
     this.setState({valueAction: val});
      console.dir(this.state);
   }

   updateState(e) {
      this.setState({data: e.target.value});
   }

   clearInput() {
      this.setState({data: ''});
      ReactDOM.findDOMNode(this.refs.myInput).focus();
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