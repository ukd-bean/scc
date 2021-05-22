const initialState = {
    contextMenu: {
        isShown: false,
        x: null,
        y: null
    }
};

export const store = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONTEXT_MENU_COORDINATES':
            return {...state, contextMenu: { x: action.payload.x, y: action.payload.y, isShown: true }};
        default:
            return state;
    }
}