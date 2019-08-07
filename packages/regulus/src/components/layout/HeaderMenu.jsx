import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';

const linkActice = (match, location) => {
    if (match) {
        const { path } = match;
        return matchPath(location.pathname, { path }) != null;
    }
};

const HeaderMenu = ({ routes }) => (
    <nav>
        <ul>
            {routes.map((route, i) => {
                if (route.path !== '*') {
                    /* eslint-disable */
                    return (
                        <li key={i}>
                            <NavLink key={i} to={route.path} isActive={linkActice}>
                                {route.desc}
                            </NavLink>
                        </li>
                    );
                    /* eslint-enable */
                }
            })}
        </ul>
    </nav>
);

HeaderMenu.propTypes = {
    routes: PropTypes.array
};

HeaderMenu.defaultProps = {
    routes: []
};

export default HeaderMenu;
