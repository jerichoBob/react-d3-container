import React from 'react';
import LinechartAnimated from './components/linechart.animated';

class App extends React.Component {
  // constructor() {}

  render() {
    return (
      <div>
        <LinechartAnimated className = "d3-divclass-1" />
        <LinechartAnimated className = "d3-divclass-2" />
      </div>
    );
  }
}
App.propTypes = {
  data: React.PropTypes.array,
  root_el: React.PropTypes.element
};

App.defaultProps = {
  data: [],
  root_el: null
};


export default App;
