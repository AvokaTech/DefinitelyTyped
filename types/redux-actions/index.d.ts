// Type definitions for redux-actions 2.3
// Project: https://github.com/acdlite/redux-actions
// Definitions by: Jack Hsu <https://github.com/jaysoo>,
//                 Alex Gorbatchev <https://github.com/alexgorbatchev>,
//                 Alec Hill <https://github.com/alechill>
//                 Alexey Pelykh <https://github.com/alexey-pelykh>
//                 Jack Coulter <https://github.com/jscinoz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

export as namespace ReduxActions;

import { Action as ReduxAction, Reducer as ReduxReducer } from "redux";

// FSA-compliant action.
// See: https://github.com/acdlite/flux-standard-action
export interface BaseAction<T, Payload> extends ReduxAction<T> {
    payload?: Payload;
    error?: boolean;
}

export interface BaseActionMeta<T, Payload, Meta> extends BaseAction<T, Payload> {
    meta: Meta;
}

export type AnyAction = BaseAction<any, any>;
export type AnyActionMeta = BaseActionMeta<any, any, any>;

// Allows us to correctly map the values in ReducerMap
export type GetActionTypeMap<Action extends AnyAction> =
  Action extends BaseAction<infer ActionType, infer Payload>
    ? ActionType extends string
      ? {
        [ConcreteActionType in ActionType]: BaseAction<ActionType, Payload>;
      }
      : never
    : never;

export type GetActionMetaTypeMap<ActionMeta extends AnyActionMeta> =
  ActionMeta extends BaseActionMeta<infer ActionType, infer Payload, infer Meta>
    ? ActionType extends string
      ? {
        [ConcreteActionType in ActionType]:
          BaseActionMeta<ActionType, Payload, Meta>;
      }
      : never
    : never;

export type GetActionType<Action extends AnyAction> =
  Action extends BaseAction<infer ActionType, any> ? ActionType : never;

export type GetActionPayload<Action extends AnyAction> =
  Action extends BaseAction<any, infer Payload> ? Payload : never;

export type GetActionMeta<ActionMeta extends AnyActionMeta> =
  ActionMeta extends BaseActionMeta<any, any, infer Meta> ? Meta : never;

// https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L27
export interface CombinedActionType {
    _dummy: undefined;
}

export type ReducerMapValue<State, Action extends AnyAction> =
  Reducer<State, Action> |
  ReducerNextThrow<State, Action> |
  ReducerMap<State, Action>;

export type StringKeys<O> = Extract<keyof O, string>;

export type AssertAction<Action> =
  Action extends BaseAction<infer ActionType, infer Payload>
    ? BaseAction<ActionType, Payload>
    : never;

export type AssertActionMeta<ActionMeta> =
  ActionMeta extends BaseActionMeta<infer ActionType, infer Payload, infer Meta>
    ? BaseActionMeta<ActionType, Payload, Meta>
    : never;

export type ReducerMap<
  State,
  Action extends AnyAction,
  ActionTypeMap = GetActionTypeMap<Action>
> = {
  [ConcreteActionType in StringKeys<ActionTypeMap>]?:
    ReducerMapValue<State, AssertAction<ActionTypeMap[ConcreteActionType]>>;
};

export type ReducerMapMetaValue<State, ActionMeta extends AnyActionMeta> =
  ReducerMeta<State, ActionMeta> |
  ReducerNextThrowMeta<State, ActionMeta>;

export type ReducerMapMeta<
  State,
  ActionMeta extends AnyActionMeta,
  ActionMetaTypeMap = GetActionMetaTypeMap<ActionMeta>
> = {
  [ConcreteActionType in StringKeys<ActionMetaTypeMap>]?:
    ReducerMapMetaValue<
      State,
      AssertActionMeta<ActionMetaTypeMap[ConcreteActionType]>
    >;
};

export interface ReducerNextThrow<State, Action extends AnyAction> {
    next?(state: State, action: Action): State;
    throw?(state: State, action: Action): State;
}

export interface ReducerNextThrowMeta<State, ActionMeta extends AnyActionMeta> {
    next?(state: State, action: ActionMeta): State;
    throw?(state: State, action: ActionMeta): State;
}

export type BaseActionFunctions<TAction> =
    ActionFunction0<TAction> |
    ActionFunction1<any, TAction> |
    ActionFunction2<any, any, TAction> |
    ActionFunction3<any, any, any, TAction> |
    ActionFunction4<any, any, any, any, TAction> |
    ActionFunctionAny<TAction>;

export type ActionFunctions<Action extends AnyAction> = BaseActionFunctions<Action>;

export type ActionWithMetaFunctions<Action extends AnyActionMeta> =
  BaseActionFunctions<Action>;

export type Reducer<State, Action extends AnyAction> =
  Action extends BaseAction<infer ActionType, infer Payload>
    ? ReduxReducer<State, BaseAction<ActionType, Payload>>
    : never;

export type ReducerMeta<State, ActionMeta extends AnyActionMeta> =
  ActionMeta extends BaseActionMeta<infer ActionType, infer Payload, infer Meta>
    ? ReduxReducer<State, BaseActionMeta<ActionType, Payload, Meta>>
    : never;

/** argument inferring borrowed from lodash definitions */
export type ActionFunction0<R> = () => R;
export type ActionFunction1<T1, R> = (t1: T1) => R;
export type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
export type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;
export type ActionFunctionAny<R> = (...args: any[]) => R;

// https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/createAction.js#L6
export function createAction(
  actionType: string
): ActionFunctionAny<BaseAction<string, any>>;

export function createAction<Action extends AnyAction>(
  actionType: GetActionType<Action>,
  payloadCreator: ActionFunction0<GetActionPayload<Action>>
): ActionFunction0<Action>;

export function createAction<Action extends AnyAction, Arg1>(
  actionType: GetActionType<Action>,
  payloadCreator: ActionFunction1<Arg1, GetActionPayload<Action>>
): ActionFunction1<Arg1, Action>;

export function createAction<Action extends AnyAction, Arg1, Arg2>(
  actionType: GetActionType<Action>,
  payloadCreator: ActionFunction2<Arg1, Arg2, GetActionPayload<Action>>
): ActionFunction2<Arg1, Arg2, Action>;

export function createAction<Action extends AnyAction, Arg1, Arg2, Arg3>(
  actionType: GetActionType<Action>,
  payloadCreator: ActionFunction3<Arg1, Arg2, Arg3, GetActionPayload<Action>>
): ActionFunction3<Arg1, Arg2, Arg3, Action>;

export function createAction<Action extends AnyAction, Arg1, Arg2, Arg3, Arg4>(
  actionType: GetActionType<Action>,
  payloadCreator: ActionFunction4<Arg1, Arg2, Arg3, Arg4, GetActionPayload<Action>>
): ActionFunction4<Arg1, Arg2, Arg3, Arg4, Action>;

export function createAction<Action extends AnyAction>(
  actionType: GetActionType<Action>,
): ActionFunction1<GetActionPayload<Action>, Action>;

export function createAction<ActionMeta extends AnyActionMeta>(
  actionType: GetActionType<ActionMeta>,
  payloadCreator:
    null |
    undefined |
    ActionFunctionAny<GetActionPayload<ActionMeta>>,
  metaCreator: ActionFunctionAny<GetActionMeta<ActionMeta>>
): ActionFunctionAny<ActionMeta>;

export function createAction<
  ActionMeta extends AnyActionMeta,
  Arg1
>(
  actionType: GetActionType<ActionMeta>,
  payloadCreator: ActionFunction1<Arg1, GetActionPayload<ActionMeta>>,
  metaCreator: ActionFunction1<Arg1, GetActionMeta<ActionMeta>>
): ActionFunction1<Arg1, ActionMeta>;

export function createAction<
  ActionMeta extends AnyActionMeta,
  Arg1, Arg2
>(
  actionType: GetActionType<ActionMeta>,
  payloadCreator: ActionFunction2<Arg1, Arg2, GetActionPayload<ActionMeta>>,
  metaCreator: ActionFunction2<Arg1, Arg2, GetActionMeta<ActionMeta>>
): ActionFunction2<Arg1, Arg2, ActionMeta>;

export function createAction<
  ActionMeta extends AnyActionMeta,
  Arg1, Arg2, Arg3
>(
  actionType: GetActionType<ActionMeta>,
  payloadCreator: ActionFunction3<Arg1, Arg2, Arg3, GetActionPayload<ActionMeta>>,
  metaCreator: ActionFunction3<Arg1, Arg2, Arg3, GetActionMeta<ActionMeta>>
): ActionFunction3<Arg1, Arg2, Arg3, ActionMeta>;

export function createAction<
  ActionMeta extends AnyActionMeta,
  Arg1, Arg2, Arg3, Arg4
>(
  actionType: GetActionType<ActionMeta>,
  payloadCreator: ActionFunction4<Arg1, Arg2, Arg3, Arg4, GetActionPayload<ActionMeta>>,
  metaCreator: ActionFunction4<Arg1, Arg2, Arg3, Arg4, GetActionMeta<ActionMeta>>
): ActionFunction4<Arg1, Arg2, Arg3, Arg4, ActionMeta>;

export function handleAction<State, Action extends AnyAction>(
    actionType:
      GetActionType<Action> |
      ActionFunctions<Action> |
      CombinedActionType,
    reducer:
      Reducer<State, GetActionPayload<Action>> |
      ReducerNextThrow<State, GetActionPayload<Action>>,
    initialState: State
): ReduxReducer<State, Action>;

export function handleAction<State, ActionMeta extends AnyActionMeta>(
    actionType:
      GetActionType<ActionMeta> |
      ActionWithMetaFunctions<ActionMeta> |
      CombinedActionType,
    reducer:
      ReducerMeta<State, ActionMeta> |
      ReducerNextThrowMeta<State, ActionMeta>,
    initialState: State
): ReduxReducer<State, ActionMeta>;

export function handleActions<StateAndPayload>(
    reducerMap: ReducerMap<StateAndPayload, BaseAction<any, StateAndPayload>>,
    initialState: StateAndPayload
): ReduxReducer<StateAndPayload, BaseAction<any, StateAndPayload>>;

export function handleActions<State, Action extends AnyAction>(
    reducerMap: ReducerMap<State, Action>,
    initialState: State
): ReduxReducer<State, Action>;

export function handleActions<State, ActionMeta extends AnyActionMeta>(
    reducerMap: ReducerMapMeta<State, ActionMeta>,
    initialState: State
): ReduxReducer<State, ActionMeta>;

// https://github.com/redux-utilities/redux-actions/blob/v2.3.0/src/combineActions.js#L21
export function combineActions(...actionTypes: Array<ActionFunctions<any> | string | symbol>): CombinedActionType;

export type ActionMap<
  Action extends AnyAction,
  ActionTypeMap = GetActionTypeMap<Action>
> = {
  [ConcreteActionType in StringKeys<ActionTypeMap>]?:
    ActionMap<AssertAction<ActionTypeMap[ConcreteActionType]>> |
    ActionFunctionAny<GetActionPayload<AssertAction<ActionTypeMap[ConcreteActionType]>>>;
};

export type ActionMapMeta<
  ActionMeta extends AnyActionMeta,
  ActionTypeMap = GetActionMetaTypeMap<ActionMeta>
> = {
  [ConcreteActionType in StringKeys<ActionTypeMap>]?:
    ActionMap<AssertActionMeta<ActionTypeMap[ConcreteActionType]>> |
    ActionFunctionAny<GetActionPayload<AssertAction<ActionTypeMap[ConcreteActionType]>>> |
    [
      ActionFunctionAny<GetActionPayload<AssertActionMeta<ActionTypeMap[ConcreteActionType]>>>,
      ActionFunctionAny<GetActionMeta<AssertActionMeta<ActionTypeMap[ConcreteActionType]>>>
    ];
};

export type ActionCreatorMap<
  Action extends AnyAction,
  ActionTypeMap = GetActionTypeMap<Action>
> = {
  [ConcreteActionType in StringKeys<ActionTypeMap>]:
    ActionFunctionAny<BaseAction<
      ConcreteActionType,
      GetActionPayload<AssertAction<ActionTypeMap[ConcreteActionType]>>
    >>;
};

export function createActions<Action extends AnyAction>(
    actionMapOrIdentityAction: ActionMap<Action> | string,
    ...identityActions: string[]
): ActionCreatorMap<Action>;

export function createActions(
    actionMapOrIdentityAction: ActionMap<any> | string,
    ...identityActions: string[]
): {
    [actionName: string]: ActionFunctionAny<AnyAction>
};
