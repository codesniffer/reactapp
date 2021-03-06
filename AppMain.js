import React from 'react';
import Select from 'react-select';
import Shodan from './shodan-index';
import Censys from './censys-index';
import DataGrid from 'react-datagrid';
//import DataGridStyle from 'react-datagrid/index.css';

// var gridRows = [
//   { item: 'John', highlight: 'Bobson'},
//   { item: 'Bob', highlight: 'Mclaren'}
// ]

var gridRows = [];
var gridColumns = [
  { name: 'item'},
  { name: 'highlight'}
]


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
  // { value: 'port', label: 'Port' },
   { value: 'protocol', label: 'Protocol' },
   { value: 'querysearch', label: 'Query Search' } //,
   //{ value: 'scaninternet', label: 'Scan Internet' } ,
   //{ value: 'search', label: 'Search' } //
];

class AppMain extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         dataSourceProvider: dataSourceProvider,
         dataSoruceAction: dataSoruceCensys,
         valueProvider: dataSourceProvider[0].value,
         valueAction: dataSoruceCensys[0].value,
         columns: gridColumns,
         rows: gridRows

      }

      selectedProvider = this.state.valueProvider;
      selectedAction = this.state.valueAction;

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


   submitRequest() {
      console.log ("Provider: ", selectedProvider, " Action: ", selectedAction);

      if (selectedProvider == 'shodan') {
         Shodan.performAction(selectedAction, (res) => {
            this.setState({rows:res});
         });
      } else {
         Censys.performAction(selectedAction, (res) => {
            this.setState({rows:res});
         });
      }
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
                <h3></h3>
               <button onClick = {this.submitRequest}>Submit</button>
               <h3> Query Result</h3>

            </div>
            <div>
               <DataGrid idProperty="id" dataSource={this.state.rows} columns={this.state.columns} />
            </div>
         </div>
         
      );
   }
}



export default AppMain;