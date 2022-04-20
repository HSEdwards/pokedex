import * as d3 from 'd3';

export const generateRandomValues = (value, length = 3) =>
  d3.range(length).map((item, index) => ({  
      label: 'Label'+ index,  
      value: Math.floor(Math.random()*10) }
));
