import './appcontainer.scss';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ErrorBoundary from './errorboundary';

export default class AppContainer extends Component {
  
    render() {
        return (
            <ErrorBoundary>
                <div className="container">
                   {this.props.children}
                </div>
            </ErrorBoundary>
        )
    }
}
AppContainer.contextTypes = {
    router: PropTypes.object.isRequired
  }; 