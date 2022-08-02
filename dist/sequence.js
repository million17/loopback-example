"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
var SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructor(findRoute, authenticateRequest, parseParams, invoke, send, reject) {
        this.findRoute = findRoute;
        this.authenticateRequest = authenticateRequest;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const route = this.findRoute(request);
            //Enable JWT
            await this.authenticateRequest(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            // check err jwt request
            if (err.code === authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND || err.code === authentication_1.USER_PROFILE_NOT_FOUND) {
                Object.assign(err, { statusCode: 401 /*Unauthorized */ });
            }
            this.reject(context, err);
        }
    }
};
MySequence = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    tslib_1.__param(2, (0, core_1.inject)(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(3, (0, core_1.inject)(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(4, (0, core_1.inject)(SequenceActions.SEND)),
    tslib_1.__param(5, (0, core_1.inject)(SequenceActions.REJECT)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map