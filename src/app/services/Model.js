/**
 * Model.js - a place to stash our data, and eventually will be replaced by Redux, Meteor, or other
 */

class Model {
  setModel() {}
  getModel() {}
}
Model.data = {
  margin: { top: 30, left: 50, bottom: 30, right: 50 },

  timerActive: 0,
  timerValue: 0,
  timerThreshold: 50, // how many updates per day?
  intervalMillis: 5,

  var1: 'got some data'
};

export default Model;
