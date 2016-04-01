/**
 * Created by bobse on 3/22/16.
 */

import React from 'react';
import * as d3 from 'd3';

import myModel from '../services/Model';


class LinechartAnimated extends React.Component {
  constructor() { // need to have a constructor to initialize component state
    super(); // 'super' gives the context for 'this' within the component

    this.firstTimeThru = true;
    this.xScale = null;
    this.yScale = null;
    this.xAxis = null;
    this.yAxis = null;
    this.xGrid = null;
    this.yGrid = null;

    this.panelWidth = 600;
    this.panelHeight = 270;
    // linear, step, step-before, step-after, basis, basis-open, cardinal, cardinal-open, monotone
    this.interpolater = 'step-after';
    this.state = {
      txt: '...',
      parsedData: [
        { date: '', close: 1 },
        { date: '', close: 2 },
        { date: '', close: 3 }
      ],
      winWidth: this.panelWidth
    };

    // not allowed to .bind() inside the render method, so these identities are needed
    this.update = this.update.bind(this);
    this.handleBump = this.handleBump.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.myTimer = this.myTimer.bind(this);
    this.setScale = this.setScale.bind(this);
    this.drawChart = this.drawChart.bind(this);
    this.scaleAndRenderGraph = this.scaleAndRenderGraph.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // Attach D3 to class d3-div-space here...
    // d3.select('.d3-div-space').append('svg');
    const cn = `.${this.props.className}`;
    // console.log(`cn: ${cn}`);

    d3.select(cn).append('svg');

    this.panelWidth = window.innerWidth - 30;
    this.setState({ winWidth: window.innerWidth });

    window.addEventListener('resize', this.handleResize);
    if (this.firstTimeThru) this.loadData();
  }

  componentDidUpdate() {
    const cn = `.${this.props.className}`;
    // console.log(`cn: ${cn}`);
    let svgEl = d3.selectAll(cn).select('svg');
    // console.log(`inside componentDidUpdate() -- svgEl: ${svgEl}`);
    this.scaleAndRenderGraph(svgEl);

    this.firstTimeThru = false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // ===========================================
  // ===  S E T  S C A L E  F O R   D A T A  ===
  // ===========================================
  setScale() {
    let dataArray = this.state.parsedData;

    // console.log(`data: ${JSON.stringify(dataArray)}`);

    // initialize the domain side of the scales (based on the data you just loaded)
    this.xScale = d3.time.scale().domain(d3.extent(dataArray, d => d.date));
    this.yScale = d3.scale.linear()
      .domain([d3.min(dataArray, d => d.close), d3.max(dataArray, d => d.close)]);
    // console.log(`inside setScale() -- this.xScale:${this.xScale}, this.yScale:${this.yScale}`)

    // initialize axis
    this.xAxis = d3.svg.axis().scale(this.xScale).orient('bottom').ticks(5);
    this.yAxis = d3.svg.axis().scale(this.yScale).orient('left').ticks(5);
    // console.log(`inside setScale() -- this.xAxis:${this.xAxis}, this.yAxis:${this.yAxis}`)

    this.xGrid = d3.svg.axis().scale(this.xScale).orient('bottom').ticks(5).tickFormat('');
    this.yGrid = d3.svg.axis().scale(this.yScale).orient('left').ticks(5).tickFormat('');
  }

  scaleAndRenderGraph(svgEl) {
    this.setScale();
    this.drawChart(svgEl);
  }

  handleResize() {
    // console.log('asdf');
    // the -30 is to give ourselves a little margin
    this.panelWidth = window.innerWidth - 30;
    this.setState({ winWidth: window.innerWidth });
  }

  // ======================================
  // ===  D R A W   T H E   C H A R T   ===
  // ======================================
  drawChart(svgEl) {
    let dataArray = this.state.parsedData;
    let myData = myModel.data;

    const margin = myData.margin;

    const chartWidth = this.panelWidth - margin.left - margin.right;
    const chartHeight = this.panelHeight - margin.top - margin.bottom;

    // update x and y scales to new dimensions
    this.xScale.range([0, chartWidth]);
    this.yScale.range([chartHeight, 0]);

    // update the axis and line
    this.xAxis.scale(this.xScale);
    this.yAxis.scale(this.yScale);

    // update the axis and line
    this.xGrid.scale(this.xScale);
    this.yGrid.scale(this.yScale);

    // update svg elements to new dimensions
    svgEl
      .attr('width', this.panelWidth)
      .attr('height', this.panelHeight)
      .attr('class', 'd3chart');  // use this class as something for css selector

    let chartWrapper = svgEl.select('g'); // there should be only one

    // TODO: ugh, such a bad hack, figure out how to initialize ONCE without this flag
    // TODO: should be easy enough to do since nothing here is data-dependent
    // TODO: we are just setting up chartWrapper, linGrad, radGrad and linGrad
    // TODO: these can be created just after svgEl (for chartWrapper) is created
    //
    if (this.firstTimeThru) {
      console.log('inside hack....');
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
      .call(this.xAxis);

    svgEl.select('.y.axis')
      .call(this.yAxis);

    const _area = d3.svg.area()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.close))
      .y0(chartHeight)
      .interpolate(this.interpolater);

    let newShade = chartWrapper.selectAll('path.area')
      .data([dataArray]);
    newShade.enter().append('path').attr('class', 'area')
      .attr('d', d => _area(d));
    newShade.attr('d', d => _area(d))
      .style('fill', 'URL(#area-gradient)'); // update
    newShade.exit().remove(); // exit

    const _line = d3.svg.line()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.close))
      .interpolate(this.interpolater);

    let newPath = chartWrapper.selectAll('path.line')
      .data([dataArray]);
    newPath.enter().append('path').attr('class', 'line')
      .attr('d', d => _line(d));
    newPath.attr('d', d => _line(d));  // update
    newPath.exit().remove(); // exit

    let cir = chartWrapper.selectAll('circle')
      .data(dataArray);
    cir.enter().append('circle') // adding new data point(s)
      .attr('r', 5)
      .attr('cx', d => this.xScale(d.date)) // updating all data points
      .attr('cy', d => this.yScale(d.close));
    cir
      .attr('class', 'datapoint')
      .attr('cx', d => this.xScale(d.date)) // updating all data points
      .attr('cy', d => this.yScale(d.close));
    cir.exit().remove(); // removing the exited data point(s)

    svgEl.select('.x.grid')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(this.xGrid
        .innerTickSize(-chartHeight)
        .outerTickSize(0)
      );

    svgEl.select('.y.grid')
      .call(this.yGrid
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
  loadData() {
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
      this.setState({ parsedData: aData });
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
    // console.log('inside myTimer');
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
//     const panel = return(`<div>
//   <section style="padding-top: 50px;">
//     <div class="col-lg-6 col-sm-12" id="d3-line-chart">
//       <div class="panel panel-default">
//         <div class="panel-heading">D3 Line Chart</div>
//         <div class="panel-body">
//           <d3-line-chart>loading . . .</d3-line-chart>
//         </div>
//       </div>
//     </div>
//   </section>
// </div>`);

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
          <div className={this.props.className} />
        </span>
      </div>
    );
  }
}
LinechartAnimated.propTypes = {
  data: React.PropTypes.array,
  svg_el: React.PropTypes.element,
  className: React.PropTypes.string
};

LinechartAnimated.defaultProps = {
  txt: 'this is the default txt',
  className: 'd3-chart'
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

export default LinechartAnimated;
