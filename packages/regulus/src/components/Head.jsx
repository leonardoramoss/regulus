import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

const Head = ({ title, metas, links }) => (
    <Helmet>
        <title>{title}</title>

        {metas.map(itemMeta => (
            <meta
                key={itemMeta.name}
                name={itemMeta.name}
                content={itemMeta.content}
            />
        ))}

        {links.map(itemLink => (
            <link key={itemLink.href} rel={itemLink.rel} href={itemLink.href} />
        ))}
    </Helmet>
);

Head.propTypes = {
    title: PropTypes.string,
    metas: PropTypes.array,
    links: PropTypes.array
};

Head.defaultProps = {
    title: 'Regulus SSR',
    metas: [],
    links: []
};

export default Head;
