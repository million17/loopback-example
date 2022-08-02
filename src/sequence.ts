// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  AuthenticateFn,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  AuthenticationBindings,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  FindRoute, InvokeMethod,
  MiddlewareSequence,
  ParseParams, Reject,
  RequestContext,
  RestBindings, Send,
  SequenceHandler,
} from '@loopback/rest';
import SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(
    @inject(SequenceActions.FIND_ROUTE)
    protected findRoute: FindRoute,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND)
    protected send: Send,
    @inject(SequenceActions.REJECT)
    protected reject: Reject,
  ) {
  }

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);

      //Enable JWT
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      // check err jwt request
      if (err.code === AUTHENTICATION_STRATEGY_NOT_FOUND || err.code === USER_PROFILE_NOT_FOUND) {
        Object.assign(err, {statusCode: 401 /*Unauthorized */});
      }
      this.reject(context, err)
    }
  }
}
