import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MenuItem from './MenuItem';
import classes from './Menu.scss';

const Menu = ({ children }) => {
    const c = classnames({ [classes.menu]: true });
    return <nav className={c}>{children}</nav>;
};

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(PropTypes.instanceOf(MenuItem))
};

export default Menu;
