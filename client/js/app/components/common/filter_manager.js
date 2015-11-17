/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var Filter = require('./filter.js');
var Modal = require('./modal.js');
var ProjectUtils = require('../../utils/ProjectUtils');

var FilterManager = React.createClass({

  propTypes: {
    eventCollection:  React.PropTypes.string,
    propertyNames:    React.PropTypes.array,
    filters:          React.PropTypes.array,
    addFilter:        React.PropTypes.func.isRequired,
    removeFilter:     React.PropTypes.func.isRequired,
    handleChange:     React.PropTypes.func.isRequired,
    getPropertyType:  React.PropTypes.func.isRequired
  },

  open: function() {
    this.refs.modal.open();
  },

  addFilter: function(e) {
    e.preventDefault();
    this.props.addFilter();
  },

  removeFilter: function(e) {
    e.preventDefault();
    this.props.removeFilter(this.props.index);
  },

  buildFilterNodes: function() {
    var filterNodes = this.props.filters.map(function(filter, index) {
      return(
        <Filter key={index}
                index={index}
                filter={filter}
                propertyType={this.getPropertyType(this.props.eventCollection, filter.property_name)}
                eventCollection={this.props.eventCollection}
                propertyNames={htis.props.propertyNames}
                handleChange={this.props.handleChange}
                removeFilter={this.removeFilter}
                filterOperators={ProjectUtils.getConstant('FILTER_OPERATORS')} />
      );
    }.bind(this));

    return (
      <div>
        {filterNodes}
        <div className="filter-buttons">
          <a href="#" className="add-filter btn btn-primary" onClick={this.addFilter}>
            <i className="icon glyphicon glyphicon-plus margin-right-tiny"></i>
            Add another filter
          </a>
        </div>
      </div>
    )
  },

  noFiltersMarkup: function() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="no-filters-msg callout">
            <p className="lead">
              <i className="icon glyphicon glyphicon-info-sign margin-right-tiny"></i>
              Please select an Event Collection before making a filter.
            </p>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    var filterContent = this.props.eventCollection ? this.buildFilterNodes() : this.noFiltersMarkup();

    return (
      <Modal ref="modal"
             title="Filters"
             size="large"
             onClose={this.modalClosed}
             modalClasses="filters-modal"
             footerBtns={[
              { 
                text: 'Done',
                classes: 'btn-success',
                iconName: 'ok-circle'
              }
            ]}>
        <div className="filters">
          {filterContent}
        </div>
      </Modal>
    );
  }
});

module.exports = FilterManager;
