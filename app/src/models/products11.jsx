"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespace: 'products',
    state: [],
    reducers: {
        'delete': function (state, _a) {
            var id = _a.payload;
            return state.filter(function (item) { return item.id !== id; });
        },
    },
};
