import { UserModelHello, EndpointErrorModel } from '';
import { createAction, props } from '@ngrx/store';

const GetAllUsersId = 'GetAllUsers';
const GetAllUsersProps = props<{ actionData: UserModelHello }>();
const GetAllUsers = createAction(GetAllUsersId, GetAllUsersProps);

const GetAllUsersSuccess2Id = 'GetAllUsersSuccess2';
const GetAllUsersSuccess2Props = props<{ actionData: UserModelHello }>();
const GetAllUsersSuccess2 = createAction(GetAllUsersSuccess2Id, GetAllUsersSuccess2Props);

const GetAllUsersFailId = 'GetAllUsersFail';
const GetAllUsersFailProps = props<{ actionData: EndpointErrorModel }>();
const GetAllUsersFail = createAction(GetAllUsersFailId, GetAllUsersFailProps);

export const SmartStoreActions = {
    GetAllUsers,
    GetAllUsersSuccess2,
    GetAllUsersFail
};
