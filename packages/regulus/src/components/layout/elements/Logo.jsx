import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import classes from './Logo.scss';

class Logo extends PureComponent {
    render() {
        const c = classnames({ [classes.logo]: true });

        return <div className={c}>RGLS</div>;
    }
}

Logo.propTypes = {
    align: PropTypes.string
};

export default Logo;
