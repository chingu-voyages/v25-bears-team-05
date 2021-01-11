import { ADD_ERROR_MESSAGE, ADD_INFO_MESSAGE, ADD_SUCCESS_MESSAGE, SET_LOADING } from "../actionTypes";

export const addErrorMessage = (message: string) => ({
    type: ADD_ERROR_MESSAGE,
    payload: {
      message,
    },
});

export const addSuccessMessage = (message: string) => ({
    type: ADD_SUCCESS_MESSAGE,
    payload: {
      message,
    },
});

export const addInfoMessage = (message: string) => ({
    type: ADD_INFO_MESSAGE,
    payload: {
      message,
    },
});

export const setLoading = (loading: boolean) => ({
    type: SET_LOADING,
    payload: {
        loading
    },
});