/**
 * @jsx React.DOM
 */
var Grid = require('../lib/Grid');
var EditableCell  = require('../lib/addons/cells/EditableCell');
var SelectableGridMixin      = require('../lib/addons/grids/mixins/SelectableGridMixin');

var React = require('react');

'use strict';

function rows(start, end) {
  var rows = [];
  for (var i = start; i < end; i++) {
    rows.push([i, 'Name ' + i, 'Surname ' + i]);
  }
  return rows;
}

var columns = [
  {
    name: '№',
    width: '10%',
    key: 0
  },
  {
    name: 'Name',
    width: '40%',
    resizeable: true,
    key: 1
  },
  {
    name: 'Surname',
    width: '50%',
    resizeable: true,
    key: 2
  }
];

var component = React.createClass({
  mixins : [SelectableGridMixin],
  onSelect: function(){
    console.log('selected');
  },
  render: function() {
    var cellRenderer = (
      <EditableCell
        selected={this.state.selected}
        onSelect={this.onSelect}/>
    );

    return this.transferPropsTo(<Grid
      columns={columns}
      length={30000}
      rows={rows}
      rowHeight={40}
      cellRenderer={cellRenderer} />);
  }
});
// module.exports = component;


 React.renderComponent(<component />, document.body);
