import React from 'react';
import Loadable from 'react-loadable';

import Loading from '../components/layout/Loading';

const AsyncHome = Loadable({
    loader: () => import('./Home'),
    loading: Loading
});

const Home = () => <AsyncHome />;

export default Home;
