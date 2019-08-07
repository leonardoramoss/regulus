import React from 'react';

const Loading = props => {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.timedOut) {
        return <div>Oh no! Something is wrong :(</div>;
    } else if (props.pastDelay) {
        return <div>Taking a long time...</div>;
    } else if (props.isLoading) {
        return <div>Loading</div>;
    } else {
        return null;
    }
};

export default Loading;
