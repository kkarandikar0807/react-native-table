export function fetchOfferedAssignments() {
    return {
        type: 'OFFERED_ASSIGNMENTS'
    }
}

export function offeredAssignmentsSuccess(assignments) {
    return {
        type: 'OFFERED_ASSIGNMENTS_SUCCESS',
        payload: {
            value: assignments
        }
    }
}

export function offeredAssignmentsFailure(error) {
    return {
        type: 'OFFERED_ASSIGNMENTS_FAILURE',
        payload: {
            value: error
        }
    }
}