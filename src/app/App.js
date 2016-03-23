import React from 'react';
import * as d3 from 'd3';

import myModel from './Model';

class App extends React.Component {
  constructor() { // need to have a constructor to initialize component state
    super(); // 'super' gives the context for 'this; within the component
    this.state = {
      txt: '...',
      parsedData: [
        { date: '', close: 1 }, { date: '', close: 2 }, { date: '', close: 3 },
      ],
      winWidth: myModel.data.panelWidth
    };

    // not allowed to .bind() inside the render method, so these identities are needed
    this.update = this.update.bind(this);
    this.handleBump = this.handleBump.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.myTimer = this.myTimer.bind(this);
  }

  componentDidMount() {
    // Attach D3 to class d3-div-space here...
    d3.select('.d3-div-space').append('svg');
    myModel.data.panelWidth = window.innerWidth - 30;
    this.setState({ winWidth: window.innerWidth });

    window.addEventListener('resize', this.handleResize);
    this.loadData(this);
  }

  componentDidUpdate() {
    const svgEl = d3.select('svg');
    this.scaleAndRenderGraph(this, svgEl);

    myModel.data.firstTimeThru = false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // ===========================================
  // ===  S E T  S C A L E  F O R   D A T A  ===
  // ===========================================
  setScale(that) {
    const dataArray = that.state.parsedData;

    console.log(`data: ${JSON.stringify(dataArray)}`);

    // initialize the domain side of the scales (based on the data you just loaded)
    const _xScale = d3.time.scale().domain(d3.extent(dataArray, d => d.date));
    const _yScale = d3.scale.linear()
      .domain([d3.min(dataArray, d => d.close), d3.max(dataArray, d => d.close)]);
    myModel.data.xScale = _xScale;
    myModel.data.yScale = _yScale;

    // initialize axis
    const _xAxis = d3.svg.axis().scale(_xScale).orient('bottom').ticks(5);
    const _yAxis = d3.svg.axis().scale(_yScale).orient('left').ticks(5);
    myModel.data.xAxis = _xAxis;
    myModel.data.yAxis = _yAxis;

    const _xGrid = d3.svg.axis().scale(_xScale).orient('bottom').ticks(5).tickFormat('');
    const _yGrid = d3.svg.axis().scale(_yScale).orient('left').ticks(5).tickFormat('');
    myModel.data.xGrid = _xGrid;
    myModel.data.yGrid = _yGrid;
  }

  scaleAndRenderGraph(that, svgEl) {
    that.setScale(that);
    that.drawChart(that, svgEl);
  }

  handleResize() {
    // console.log('asdf');
    // the -30 is to give ourselves a little margin
    myModel.data.panelWidth = window.innerWidth - 30;
    this.setState({ winWidth: window.innerWidth });

    // const svgEl = d3.select('svg');
    // this.scaleAndRenderGraph(this, svgEl);
  }

  // ======================================
  // ===  D R A W   T H E   C H A R T   ===
  // ======================================
  drawChart(that, svgEl) {
    const dataArray = that.state.parsedData;
    const myData = myModel.data;

    const panelWidth = myData.panelWidth;
    const panelHeight = myData.panelHeight;

    const margin = myData.margin;

    const chartWidth = panelWidth - margin.left - margin.right;
    const chartHeight = panelHeight - margin.top - margin.bottom;
    myData.chartWidth = chartWidth;
    myData.chartHeight = chartHeight;

    const xScale = myData.xScale;
    const yScale = myData.yScale;
    const xAxis = myData.xAxis;
    const yAxis = myData.yAxis;
    const xGrid = myData.xGrid;
    const yGrid = myData.yGrid;

    // update x and y scales to new dimensions
    xScale.range([0, chartWidth]);
    yScale.range([chartHeight, 0]);

    // update the axis and line
    xAxis.scale(xScale);
    yAxis.scale(yScale);

    // update the axis and line
    xGrid.scale(xScale);
    yGrid.scale(yScale);

    // update svg elements to new dimensions
    svgEl
      .attr('width', panelWidth)
      .attr('height', panelHeight)
      .attr('class', 'd3chart');

    let chartWrapper = svgEl.select('g'); // there should be only one

    // TODO: ugh, such a bad hack, figure out how to initialize ONCE without this flag
    // TODO: should be easy enough to do since nothing here is data-dependent
    if (myModel.data.firstTimeThru) {
      svgEl.append('rect').attr('width', '100%').attr('height', '100%').attr('class', 'chartPanel');

      chartWrapper = svgEl.append('g');
      chartWrapper.attr('transform', `translate(${margin.left}, ${margin.top})`);
      chartWrapper.append('g').classed('x axis', true);
      chartWrapper.append('g').classed('y axis', true);
      chartWrapper.append('g').classed('x grid', true);
      chartWrapper.append('g').classed('y grid', true);

      // build an CVS gradient
      // let defs = _that.svg_el.append('defs');
      const linGrad = chartWrapper.insert('linearGradient', ':first-child')
        .attr('id', 'area-gradient');
      linGrad
        .attr('x1', '0%').attr('x2', '0%')
        .attr('y1', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');
      linGrad.append('stop')
        .attr('offset', '5%')
        .attr('stop-color', '#fff')
        .attr('stop-opacity', 1);
      linGrad.append('stop')
        .attr('offset', '90%')
        .attr('stop-color', '#fff')
        .attr('stop-opacity', 0.2);
      const svgDefs = svgEl.append('defs');
      const radGrad = svgDefs.insert('radialGradient', ':first-child')
        .attr('id', 'radial-gradient1');
      radGrad.attr('cx', '100%').attr('cy', '0%').attr('r', '100%');
      radGrad.append('stop').attr('offset', '5%').attr('stop-color', '#f8cdda');
      radGrad.append('stop').attr('offset', '90%').attr('stop-color', '#1d2b64');

      const linGrad2 = svgDefs.insert('linearGradient', ':first-child')
        .attr('id', 'area-gradient2');
      linGrad2
        .attr('x1', '100%').attr('x2', '0%')
        .attr('y1', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');
      linGrad2.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#1d2b64');
        // .attr('stop-opacity', 1);
      linGrad2.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', '#fff');
        // .attr('stop-opacity', 1.0);
    }

    svgEl.select('.x.axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    svgEl.select('.y.axis')
      .call(yAxis);


    const _area = d3.svg.area()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))
      .y0(chartHeight)
      .interpolate(myData.interpolate);

    const newShade = chartWrapper.selectAll('path.area')
      .data([dataArray]);
    newShade.enter().append('path').attr('class', 'area')
      .attr('d', d => _area(d));
    newShade.attr('d', d => _area(d))
      .style('fill', 'URL(#area-gradient)'); // update
    newShade.exit().remove(); // exit

    const _line = d3.svg.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))
      .interpolate(myData.interpolate);

    const newPath = chartWrapper.selectAll('path.line')
      .data([dataArray]);
    newPath.enter().append('path').attr('class', 'line')
      .attr('d', d => _line(d));
    newPath.attr('d', d => _line(d));  // update
    newPath.exit().remove(); // exit

    const cir = chartWrapper.selectAll('circle')
      .data(dataArray);
    cir.enter().append('circle') // adding new data point(s)
      .attr('r', 5)
      .attr('cx', d => xScale(d.date)) // updating all data points
      .attr('cy', d => yScale(d.close));
    cir
      .attr('class', 'datapoint')
      .attr('cx', d => xScale(d.date)) // updating all data points
      .attr('cy', d => yScale(d.close));
    cir.exit().remove(); // removing the exited data point(s)

    svgEl.select('.x.grid')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xGrid
        .innerTickSize(-chartHeight)
        .outerTickSize(0)
      );

    svgEl.select('.y.grid')
      .call(yGrid
        .innerTickSize(-chartWidth)
        .outerTickSize(0)
      );
  }
  showme(a) {
    console.log(`=== inside: x:${a.date} , y:${a.close}`);
  }

  // function: update
  update(e) {
    this.setState({ txt: e.target.value });
  }

  // this will eventually become a (data) service.
  loadData(that) {
    // ==========================================
    // ===  L O A D I N G   T H E   D A T A   ===
    // ==========================================

    const parseDate = d3.time.format('%d-%b-%y').parse;
    let aData = [];
    d3.csv('src/app/assets/data/data.csv', (unwashedData) => {
      // console.log('inside _loadData(): ', unwashedData);
      aData = unwashedData.map((d) => {
        // each d is one line of the csv file represented as a javascript object
        // console.log('d', d);
        const txDate = parseDate(d.date);
        const txClose = +d.close;
        return { date: txDate, close: txClose };
      });
      that.setState({ parsedData: aData });
    });
  }

  handleBump() { // optional 'event'
    const tmpArray = this.state.parsedData.slice(0, 50);
    tmpArray[0].close += 300 * Math.random().toFixed(2) - 150; // bump the current element +/-
    this.setState({ parsedData: tmpArray });
  }

  handleShift() { // optional 'event' parameter
    const tmpArray = this.state.parsedData.slice(0, 49);
    const txDate = (tmpArray[0] === undefined) ? new Date(1973, 1, 1) : new Date(tmpArray[0].date);
    txDate.setDate(txDate.getDate() + 1);

    const txClose = tmpArray[0].close;
    tmpArray.unshift({ date: txDate, close: txClose }); // bump up the current element
    this.setState({ parsedData: tmpArray });
  }

  myTimer() {
    console.log('inside myTimer');
    myModel.data.timerValue += 1;
    if (myModel.data.timerValue % myModel.data.timerThreshold === 0) this.handleShift();
    else this.handleBump();
  }

  startTimer() {
    if (myModel.data.timerActive !== 0) clearInterval(myModel.data.timerActive);
    myModel.data.timerActive = setInterval(this.myTimer, myModel.data.intervalMillis);
  }

  stopTimer() {
    clearInterval(myModel.data.timerActive);
    myModel.data.timerActive = 0;
  }

// <Widget txt={this.state.txt} update={this.update} />
// <p />
// <div>Current window width: {this.state.winWidth}</div>
// <p />

  render() {
    return (
      <div>
        <span>
          <span>Manual:&nbsp;
            <button onClick={this.handleBump}>bump</button>
            <span> - </span>
            <button onClick={this.handleShift}>shift</button>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Automatic:&nbsp;
            <button onClick={this.startTimer}>Start</button>
            <span> - </span>
            <button onClick={this.stopTimer}>Stop</button>
          </span>
          <p></p>
          <div className="d3-div-space" />
        </span>
      </div>
    );
  }
}
App.propTypes = {
  data: React.PropTypes.array,
  svg_el: React.PropTypes.element
};

App.defaultProps = {
  txt: 'this is the default txt'
};


const Widget = (props) => (
  <div>
      <span>
        <p className="input">Input some text: <input type="text" onChange={props.update} /></p>
        <p className="output">Output: {props.txt}</p>
      </span>
  </div>
);

Widget.propTypes = {
  txt: React.PropTypes.string,
  update: React.PropTypes.func
};

export default App;
