import logger from 'redux-logger';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore, compose } from 'redux';

import rootEpic from './epics';
import rootReducer from './reducers';

const configureStore = preloadedState => {
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(epicMiddleware, logger))
    );

    const epic$ = new BehaviorSubject(rootEpic);

    const hotReloadingEpic = (...args) =>
        epic$.pipe(switchMap(epic => epic(...args)));

    epicMiddleware.run(hotReloadingEpic);

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );

        module.hot.accept('./epics', () =>
            epic$.next(require('./epics').default)
        );
    }

    return store;
};

export default configureStore;
