import {all, call, takeLatest, put} from "redux-saga/effects";
import {
    fetchOfferedAssignments,
    offeredAssignmentsFailure,
    offeredAssignmentsSuccess
} from "../actions/offeredassignments";



export const fetchOfferedAssignmentsFn = () => fetch('http://localhost:4000/offeredassignments', {method: 'GET', headers: 'application/json'});

export function* getOfferedAssignments() {
    try {
        const response = yield call(fetchOfferedAssignmentsFn);
        const data = yield response.json();
        //Fire the event(dispatch the action)
        yield put(offeredAssignmentsSuccess(data))


    } catch (e) {
        yield put(offeredAssignmentsFailure(e))
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(fetchOfferedAssignments().type, getOfferedAssignments)
    ])
}