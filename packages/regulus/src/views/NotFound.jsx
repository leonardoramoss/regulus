/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
        if (staticContext) 
            staticContext.status = code;
        return <div>{children}</div>;
    }}
    />
);

const NotFound = () => <Status code={404}>404 - Page not found !</Status>;

Status.propTypes = {
    code: PropTypes.number,
    children: PropTypes.any
};

export default withRouter(connect()(NotFound));
