import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil } from 'rxjs/operators';

import operations from './operations';

import { actionTypes } from './actions';
import actions from './actions';

const userEpic = action$ =>
    action$.pipe(
        ofType(actionTypes.FETCH_USER),
        mergeMap(() => operations.fetchUser()),
        map(response => actions.fetchUserFulfilled(response)),
        // delay(5000),
        takeUntil(action$.pipe(ofType(actionTypes.FETCH_USER_CANCELLED)))
    );

export default combineEpics(userEpic);
