import {
  addErrorMessage,
  addSuccessMessage,
  setLoading,
} from "./actions/dialog";
import store from "./store";

interface IHandleServiceRequestProps {
  requestFunction: any;
  requestProps?: { [keyof: string]: any };
}

const handleServiceRequest = async ({
  requestFunction,
  requestProps,
}: IHandleServiceRequestProps) => {
  const onSuccess = (message?: string) => {
    store.dispatch(setLoading(false));
    message && store.dispatch(addSuccessMessage(message));
  };
  const onError = (message?: string) => {
    store.dispatch(setLoading(false));
    message && store.dispatch(addErrorMessage(message));
  };
  store.dispatch(setLoading(true));
  const res = await requestFunction({
    ...requestProps,
    onSuccess,
    onError,
  });
  return res;
};

export default handleServiceRequest;
