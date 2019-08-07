import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import classes from './Header.scss';

const Header = ({ children, align }) => {
    const c = classnames(
        { [classes.header]: true },
        // eslint-disable-next-line
        { [classes[align]]: true }
    );

    return <header className={c}>{children}</header>;
};

Header.defaultProps = {
    align: 'evelyn'
};

Header.propTypes = {
    children: PropTypes.node,
    align: PropTypes.oneOf([
        'evelyn',
        'around',
        'between',
        'center',
        'end',
        'start'
    ])
};

export default Header;
