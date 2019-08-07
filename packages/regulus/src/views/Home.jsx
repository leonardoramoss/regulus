import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Head from '../components/Head';

import actions from '../redux/actions';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.fetchInitialData = this.fetchInitialData.bind(this);
    }

    componentDidMount() {
        if (!this.props.users || this.props.users.length === 0) {
            this.props.actions.fetchUser();
        }
    }

    fetchInitialData() {
        this.props.actions.fetchUser();
    }

    render() {
        const { users } = this.props;
        return (
            <section>
                <Head title={'Teste'} />
                {users ? users.map((user, i) => <div key={i}>{user.name}</div>) : null /*eslint-disable-line*/}
                <button onClick={this.fetchInitialData}>LOAD USERS</button>
            </section>
        );
    }
}

Home.propTypes = {
    users: PropTypes.array,
    actions: PropTypes.object
};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
