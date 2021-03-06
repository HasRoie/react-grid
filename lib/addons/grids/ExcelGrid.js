/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React                 = require('react');
var PropTypes             = React.PropTypes;
var BaseGrid              = require('../../Grid');
var ExcelCell             = require('../cells/ExcelCell');
var merge                 = require('../../merge');
var SelectableGridMixin   = require('./mixins/SelectableGridMixin');
var DraggableGridMixin    = require('./mixins/DraggableGridMixin');
var CopyPasteGridMixin    = require('./mixins/CopyPasteGridMixin');
var EditableGridMixin     = require('./mixins/EditableGridMixin');
var SortableGridMixin     = require('./mixins/SortableGridMixin');
var FilterableGridMixin   = require('./mixins/FilterableGridMixin');
var CheckboxEditor        = require('../editors/CheckboxEditor');
var MixinHelper           = require('../utils/MixinHelper');

var cloneWithProps = React.addons.cloneWithProps;

var ExcelGrid = React.createClass({

  getInitialState(){
    return {selectedRows : [], expandedRows : []};
  },

  getDefaultProps() {
    return {
      rowHeight: 35,
      shouldDisplayToolbar : true,
      isRowSelectable : true,
      minHeight : 350
    };
  },

  handleCheckboxChange : function(e){
    if(e.currentTarget.checked === true){
      var selectedRows = this.props.rows.map(() => true);
      this.setState({selectedRows : selectedRows});
    }else{
      var selectedRows = this.props.rows.map(() => false);
      this.setState({selectedRows : selectedRows});
    }
  },

  handleRowSelect(row){
    var selectedRows = this.state.selectedRows;
    if(selectedRows[row] == null || selectedRows[row] == false){
      selectedRows[row] = true;
    }else{
      selectedRows[row] = false;
    }
    this.setState({selectedRows : selectedRows});
  },

  handleShowMore(row, newHeight){
    var expandedRows = this.state.expandedRows;
    if(expandedRows[row]){
      if(expandedRows[row]== null || expandedRows[row] < newHeight){
        expandedRows[row] = newHeight;
      }
    }else{
      expandedRows[row] = newHeight;
    }
    this.setState({expandedRows : expandedRows});
  },

  handleShowLess(row){
    var expandedRows = this.state.expandedRows;
    if(expandedRows[row]){
        expandedRows[row] = null;
    }
    this.setState({expandedRows : expandedRows});
  },

  mixins : MixinHelper.mix([SelectableGridMixin, EditableGridMixin, DraggableGridMixin, CopyPasteGridMixin, SortableGridMixin, FilterableGridMixin]),

  overrides : {
    getColumns : function(){
    var cols = this.getDecoratedColumns(this.props.columns)
    if(this.props.isRowSelectable){
        cols.unshift({
          key: 'select-row',
          name: '',
          formatter : CheckboxEditor,
          width : '3%',
          onRowSelect :this.handleRowSelect,
          filterable : false,
          headerRenderer : <input type="checkbox" onChange={this.handleCheckboxChange} />
        });
      }
      return cols;
    }
  },

  render: function() {
    var cellRenderer = (
      <ExcelCell
        selected={this.state.selected}
        copied={this.state.copied}
        dragged={this.state.dragged}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        onSetActive={this.onSetActive}
        onCommit={this.onCellChanged}
        handleCopy={this.handleCopy}
        handlePaste={this.handlePaste}
        handleDragStart={this.handleDragStart}
        handleDragEnter={this.handleDragEnter}
        handleDragEnd={this.handleDragEnd}
        handleTerminateDrag={this.handleTerminateDrag}
        onShowMore={this.handleShowMore}
        onShowLess={this.handleShowLess}
        expandedRows={this.state.expandedRows}
        />
    );

    var rows = this.filterRows();
    return(
      <div className="container-fluid">
        <this.renderToolbar/>
        {this.transferPropsTo(<BaseGrid
          headerRows={this.getHeaderRows()}
          columns={this.getColumns()}
          rows={rows}
          cellRenderer={cellRenderer}
          selectedRows={this.state.selectedRows}
          expandedRows={this.state.expandedRows}
          rowOffsetHeight={this.getRowOffsetHeight()}
          minHeight={this.props.minHeight} />)}
      </div>
    )
  },

  renderToolbar(){
    if(this.props.shouldDisplayToolbar === true){
      return(<div className="navbar navbar-default">
        <div className="navbar-form">
          <div className="form-group">
            <button type="button" className="btn btn-default" onClick={this.toggleFilter}>
              <span className="glyphicon glyphicon-filter"></span> Filter Rows
            </button>
          </div>
        </div>
      </div>)
    }

  }


})


module.exports = ExcelGrid;
