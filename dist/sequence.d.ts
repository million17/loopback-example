import { AuthenticateFn } from '@loopback/authentication';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
export declare class MySequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected authenticateRequest: AuthenticateFn;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    protected send: Send;
    protected reject: Reject;
    constructor(findRoute: FindRoute, authenticateRequest: AuthenticateFn, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject);
    handle(context: RequestContext): Promise<void>;
}
