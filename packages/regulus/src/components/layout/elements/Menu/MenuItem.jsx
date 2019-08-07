import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import classes from './MenuItem.scss';

const MenuItem = ({ children }) => {
    const c = classnames({ [classes.menu]: true });
    return <div className={c}>{children}</div>;
};

MenuItem.propTypes = {
    children: PropTypes.node.isRequired
};

export default MenuItem;
