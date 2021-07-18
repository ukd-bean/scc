export const replaceGroup = (id) => ({
    type: 'REPLACE_GROUP',
    payload: id
})

export const finishReplaceGroup = () => ({
    type: 'FINISH_REPLACE_GROUP',
})

export const selectPayment = (id, isSelected) => ({
    type: 'SELECT_PAYMENT',
    payload: {id, isSelected}
})

export const cutPayments = () => ({
    type: 'CUT_PAYMENTS'
})

export const resetSelecting = () => ({
    type: 'RESET_SELECTING'
})

export const setAllPaymentsCollapsed = (isCollapsed) => ({
    type: 'GLOBAL_COLLAPSE',
    payload: isCollapsed
})

export const globalEdit = () => ({
    type: 'GLOBAL_EDIT'
})

export const switchMode = () => ({
    type: 'SWITCH_MODE'
})

export const setIsHiddenMode = (isHiddenMode) => ({
    type: 'SWITCH_HIDDEN_MODE',
    payload: isHiddenMode
})