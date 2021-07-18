const initialState = {
    isGlobalCollapse: true,
    isGlobalEdit: false,
    replacingGroupId: null,
    selectedPayments: [],
    arePaymentsCuted: false,
    isGroupMode: true,
    isHiddenMode: true
};

export const store = (state = initialState, action) => {
    switch (action.type) {
        case 'GLOBAL_COLLAPSE':
            return { ...state, isGlobalCollapse: action.payload };
        case 'GLOBAL_EDIT':
            return { ...state, isGlobalEdit: !state.isGlobalEdit };
        case 'REPLACE_GROUP':
            return { ...state, replacingGroupId: action.payload };
        case 'FINISH_REPLACE_GROUP':
            return { ...state, replacingGroupId: null };
        case 'SELECT_PAYMENT':
            if (action.payload.isSelected) {
                return { ...state, selectedPayments: [action.payload.id, ...state.selectedPayments] };
            } else {
                const index = state.selectedPayments.findIndex(id => id === action.payload.id);
                state.selectedPayments.splice(index, 1);
                
                return { ...state, selectedPayments: [...state.selectedPayments] };
            }
        case 'CUT_PAYMENTS':
            return { ...state, arePaymentsCuted: true };
        case 'RESET_SELECTING':
            return { ...state, arePaymentsCuted: false, selectedPayments: [] };
        case 'SWITCH_MODE':
            return { ...state, isGroupMode: !state.isGroupMode };
        case 'SWITCH_HIDDEN_MODE':
            console.log('asdasd')
            return { ...state, isHiddenMode: action.payload };
        default:
            return state;
    }
}