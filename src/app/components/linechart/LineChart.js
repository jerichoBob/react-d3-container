/**
 * Created by bobse on 3/2/16.
 */
import React from 'react';
import * as d3 from 'd3';
// import _ from 'lodash';

export default class LineChart extends React.Component {

  render() {
    const data = this.props.data || [];
    // const width = 420;
    // const x = d3.scale.linear()
    //   .domain([0, _.max(data)])
    //   .range([0, width]);
    // <svg>
    //   <g>
    //     <linearGradient>
    //       <stop></stop>
    //       <stop></stop>
    //     </linearGradient>
    //     <path className="line"></path>
    //     <path className="area"></path>
    //
    //     <g className="x axis">
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //     </g>
    //
    //     <g className="y axis">
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //     </g>
    //
    //     <g className="x grid">
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //     </g>
    //
    //     <g className="y grid">
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //       <g className="tick">
    //         <line></line>
    //         <text></text>
    //       </g>
    //     </g>
    //   </g>
    // </svg>

    // this will eventually become a service.
    // should return an array of data which we can query to set up the chart


    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="chart" width="988" height="267">
        <g transform="translate(50,30)">


          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="100%" y2="100%" spreadMethod="pad">
            <stop offset="0%" stopColor="#F60" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#FF6" stopOpacity="1"></stop>
          </linearGradient>
          <path className = "line"
                d="M918,188.08716973421562L892.5,189.43738899454598L816,185.20127941153356L790.5,
                  177.8157427345457L765,174.78995017525108L739.5,164.61287584678496L714,152.76348175974098L637.5,
                  130.54830800182324L612,94.60970089433067L586.5,62.75754051207898L561,30.105009194788032L535.5,
                  18.25236156735773L459,10.085975197648658L433.5,4.3792653600113285L408,3.2633010074972852L382.5,
                  2.5345079609575034L357,0L255,0.8296527985162773L229.5,3.87822014051525L204,2.248196406959738L178.5,
                  5.726231079955359L102,11.933986137088814L76.5,8.579585998774023L51,6.054838658975535L25.5,
                  7.076450340285743L0,9.516605630039457"
          ></path>
          <path className="area"
                d="M918,188.08716973421562L892.5,189.43738899454598L816,185.20127941153356L790.5,
                  177.8157427345457L765,174.78995017525108L739.5,164.61287584678496L714,152.76348175974098L637.5,
                  130.54830800182324L612,94.60970089433067L586.5,62.75754051207898L561,30.105009194788032L535.5,
                  18.25236156735773L459,10.085975197648658L433.5,4.3792653600113285L408,3.2633010074972852L382.5,
                  2.5345079609575034L357,0L255,0.8296527985162773L229.5,3.87822014051525L204,2.248196406959738L178.5,
                  5.726231079955359L102,11.933986137088814L76.5,8.579585998774023L51,6.054838658975535L25.5,
                  7.076450340285743L0,9.516605630039457L0,207L25.5,207L51,207L76.5,207L102,207L178.5,207L204,207L229.5,
                  207L255,207L357,207L382.5,207L408,207L433.5,207L459,207L535.5,207L561,207L586.5,207L612,207L637.5,
                  207L714,207L739.5,207L765,207L790.5,207L816,207L892.5,207L918,207Z"
          ></path>
          <g className="x axis" transform="translate(0,207)">
            <g className="tick" transform="translate(153,0)">
              <line y2="6" x2="0"></line>
              <text dy=".71em" y="9" x="0">April</text>
            </g>
            <g className="tick" transform="translate(331.5,0)">
              <line y2="6" x2="0"></line>
              <text dy=".71em" y="9" x="0">Apr 08</text>
            </g>
            <g className="tick" transform="translate(510,0)">
              <line y2="6" x2="0"></line>
              <text dy=".71em" y="9" x="0">Apr 15</text>
            </g>
            <g className="tick" transform="translate(688.5,0)">
              <line y2="6" x2="0"></line>
              <text dy=".71em" y="9" x="0">Apr 22</text>
            </g>
            <g className="tick" transform="translate(867,0)">
              <line y2="6" x2="0"></line>
              <text dy=".71em" y="9" x="0">Apr 29</text>
            </g>
            <path className="domain" d="M0,6V0H918V6"></path>
          </g>
          <g className="y axis">
            <g className="tick" transform="translate(0,207)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">0</text>
            </g>
            <g className="tick" transform="translate(0,174.46459613661727)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">100</text>
            </g>
            <g className="tick" transform="translate(0,141.92919227323452)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">200</text>
            </g>
            <g className="tick" transform="translate(0,109.39378840985178)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">300</text>
            </g>
            <g className="tick" transform="translate(0,76.85838454646904)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">400</text>
            </g>
            <g className="tick" transform="translate(0,44.322980683086314)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">500</text>
            </g>
            <g className="tick" transform="translate(0,11.787576819703578)">
              <line x2="-6" y2="0"></line>
              <text dy=".32em" x="-9" y="0">600</text>
            </g>
            <path className="domain" d="M-6,0H0V207H-6"></path>
          </g>
          <g className="x grid" transform="translate(0,207)">
            <g className="tick" transform="translate(153,0)">
              <line y2="-207" x2="0"></line>
              <text dy=".71em" y="3" x="0"></text>
            </g>
            <g className="tick" transform="translate(331.5,0)">
              <line y2="-207" x2="0"></line>
              <text dy=".71em" y="3" x="0"></text>
            </g>
            <g className="tick" transform="translate(510,0)">
              <line y2="-207" x2="0"></line>
              <text dy=".71em" y="3" x="0"></text>
            </g>
            <g className="tick" transform="translate(688.5,0)">
              <line y2="-207" x2="0"></line>
              <text dy=".71em" y="3" x="0"></text>
            </g>
            <g className="tick" transform="translate(867,0)">
              <line y2="-207" x2="0"></line>
              <text dy=".71em" y="3" x="0"></text>
            </g>
            <path className="domain" d="M0,0V0H918V0"></path>
          </g>
          <g className="y grid">
            <g className="tick" transform="translate(0,207)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,174.46459613661727)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,141.92919227323452)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,109.39378840985178)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,76.85838454646904)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,44.322980683086314)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <g className="tick" transform="translate(0,11.787576819703578)">
              <line x2="918" y2="0"></line>
              <text dy=".32em" x="-3" y="0"></text>
            </g>
            <path className="domain" d="M0,0H0V207H0"></path>
          </g>
        </g>
      </svg>
    );
  }
}

LineChart.propTypes = {
  data: React.PropTypes.array
};
