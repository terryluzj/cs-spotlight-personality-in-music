import { put, take, fork } from 'redux-saga/effects'

import {
    REQUEST_USER_INFO_ACTIONS,
    REQUEST_USER_INFO_CHANGE_ACTIONS,
    DISCONNECT_PROVIDER_ACTIONS,
} from '@redux/actions/user'
import { RELOAD_WINDOW } from '@redux/actions/window'
import genericAPISaga from '@redux/sagas/fetch'
import Api from '@services/api'

export const userInfoSaga = genericAPISaga(
    Api.user.getUserInfo,
    REQUEST_USER_INFO_ACTIONS
)

export const userProfileChangeSaga = genericAPISaga(
    Api.user.updateUserProfile,
    REQUEST_USER_INFO_CHANGE_ACTIONS
)

export const disconnectProviderSaga = genericAPISaga(
    Api.user.removeUserConnection,
    DISCONNECT_PROVIDER_ACTIONS
)

/**
 * Saga watcher for user information related requests
 */
export function* refreshUserProfileSaga() {
    yield fork(function* requestWatcher() {
        while (true) {
            yield take([REQUEST_USER_INFO_CHANGE_ACTIONS[1]])
            yield put({ type: REQUEST_USER_INFO_ACTIONS[0] })
        }
    })
    yield fork(function* disconnectRequestWatcher() {
        while (true) {
            yield take(DISCONNECT_PROVIDER_ACTIONS[1])
            yield put({ type: RELOAD_WINDOW })
        }
    })
}
