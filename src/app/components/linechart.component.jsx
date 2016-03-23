/**
 * Created by bobse on 3/3/16.
 */
// get dataset
// get screensize
// compute scale based off domain (dataset) and range (screen size)

// <path className = "line"
//       d="M918,188.08716973421562L892.5,189.43738899454598L816,185.20127941153356L790.5,
//         177.8157427345457L765,174.78995017525108L739.5,164.61287584678496L714,152.76348175974098L637.5,
//         130.54830800182324L612,94.60970089433067L586.5,62.75754051207898L561,30.105009194788032L535.5,
//         18.25236156735773L459,10.085975197648658L433.5,4.3792653600113285L408,3.2633010074972852L382.5,
//         2.5345079609575034L357,0L255,0.8296527985162773L229.5,3.87822014051525L204,2.248196406959738L178.5,
//         5.726231079955359L102,11.933986137088814L76.5,8.579585998774023L51,6.054838658975535L25.5,
//         7.076450340285743L0,9.516605630039457"
// ></path>
// <path className="area"
//       d="M918,188.08716973421562L892.5,189.43738899454598L816,185.20127941153356L790.5,
//         177.8157427345457L765,174.78995017525108L739.5,164.61287584678496L714,152.76348175974098L637.5,
//         130.54830800182324L612,94.60970089433067L586.5,62.75754051207898L561,30.105009194788032L535.5,
//         18.25236156735773L459,10.085975197648658L433.5,4.3792653600113285L408,3.2633010074972852L382.5,
//         2.5345079609575034L357,0L255,0.8296527985162773L229.5,3.87822014051525L204,2.248196406959738L178.5,
//         5.726231079955359L102,11.933986137088814L76.5,8.579585998774023L51,6.054838658975535L25.5,
//         7.076450340285743L0,9.516605630039457L0,207L25.5,207L51,207L76.5,207L102,207L178.5,207L204,207L229.5,
//         207L255,207L357,207L382.5,207L408,207L433.5,207L459,207L535.5,207L561,207L586.5,207L612,207L637.5,
//         207L714,207L739.5,207L765,207L790.5,207L816,207L892.5,207L918,207Z"
// ></path>

import React from 'react';
import * as d3 from 'd3';

class LineChart extends React.Component {
  getInitialState() {
    return { clickCount: 0 };
  }

  handleClick() {
    this.setState(function(state) {
      return { clickCount: state.clickCount + 1 };
    });
  }

  loadData() {
    const parseDate = d3.time.format('%d-%b-%y').parse;
    const that = this;

    console.log('inside _loadData()');
    d3.csv('app/assets/data/data.csv', function (error, data) {
      console.log('inside d3.csv parser');
      that.parsed_data = [];

      data.forEach(function (d) {
        that.parsed_data.push({
          date: parseDate(d.date),
          close: +d.close
        });
      });

      // that._setScale(that);

      // let _w = parseInt(d3.select('div.panel-body').style('width'));
      // let _h = parseInt(d3.select('div.panel-body').style('height'));
      // that._draw(that, _w, _h);
    });
  }


  render() {
    return (
      <div />
    );
  }
}

export default LineChart;