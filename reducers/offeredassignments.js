const initialState = {
    offeredAssignments: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'OFFERED_ASSIGNMENTS_SUCCESS':
            return {
                ...state,
                offeredAssignments: action.payload.value
            }
        default:
            return state
    }
}