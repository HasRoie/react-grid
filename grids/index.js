/**
 * @jsx React.DOM
 */
"use strict";

var React          = require('react');
var BasicGrid           = require('./basic');


//globally expose React
//makes dev tools (among other things) work
if(window) { window.React = window.React || React; }

var components = [];
//register our component examples
//the files need to module.export a react component
components.push({id:'Basic', module:require('./basic') });


//creates a simple nav menu and viewer
var ReactGrid = React.createClass({
 getInitialState: function(){
   return { exampleToShow: BasicGrid };
 },
 render: function() {
   var component =this.state.exampleToShow ? this.state.exampleToShow({}) : '';   
  return (<div>            
          {component}
        </div>)
 }
});
//loops the components and puts out a menu item, wired to pass up the component


 // React.renderComponent(<ReactGrid />, document.body);


if(window) { window.ReactGrid = window.ReactGrid|| ReactGrid; }