import React from 'react';
import Select from 'react-select';


class AppMain extends React.Component {

   constructor(props) {
      super(props);

      var optionsDataSoruce = [
         { value: 'shodan', label: 'Shodan' },
         { value: 'censis', label: 'Censis' },
         { value: 'zoomeye', label: 'Zoomeye' }

      ];
      
      this.state = {
         datasource: optionsDataSoruce,
         value: optionsDataSoruce[0].value,

      }

      this.updateState = this.updateState.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.eventHandlerDataSourceChange = this.eventHandlerDataSourceChange.bind(this);
   };

   eventHandlerDataSourceChange(val) {
    console.log("Selected: " );
    console.dir(val);
     this.setState({value: val});
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
            <Select name="dropdown-data-srouce" value={this.state.value} options={this.state.datasource} onChange={this.eventHandlerDataSourceChange}/>
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