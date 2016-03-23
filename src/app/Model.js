/**
 * Model.js - a place to stash our data, and eventually will be replaced by Redux, Meteor, or other
 */

class Model {
  setModel() {}
  getModel() {}
}
Model.data = {
  xScale: 0,
  yScale: 0,
  xAxis: 0,
  yAxis: 0,
  xGrid: 0,
  yGrid: 0,
  chartWrapper: null,

  panelWidth: 600, // let _w = parseInt(d3.select('div.panel-body').style('width'));
  panelHeight: 270, // let _h = parseInt(d3.select('div.panel-body').style('height'));
  margin: { top: 30, left: 50, bottom: 30, right: 50 },
  chartWidth: 0,
  chartHeight: 0,
  firstTimeThru: true,

  interpolate: 'step-after',
      // linear - piecewise linear segments, as in a polyline.
      // step - alternate between horizontal and vertical segments, as in a step function.
      // step-before - alternate between vertical and horizontal segments, as in a step function.
      // step-after - alternate between horizontal and vertical segments, as in a step function.
      // basis - a B-spline, with control point duplication on the ends.
      // basis-open - an open B-spline; may not intersect the start or end.
      // cardinal - a Cardinal spline, with control point duplication on the ends.
      // cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
      // monotone - cubic interpolation that pres
  timerActive: 0,
  timerValue: 0,
  timerThreshold: 50, // how many updates per day?
  intervalMillis: 5,

  var1: 'got some data'
};

export default Model;
