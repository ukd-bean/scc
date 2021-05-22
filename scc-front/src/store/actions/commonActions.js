export const someAction = (data) => {
    return {
        type: 'DO',
        payload: { data }
    }
}

export const callContextMenu = ({ x, y }) => {
    return {
        type: 'SET_CONTEXT_MENU_COORDINATES',
        payload: { x, y }
    }
}