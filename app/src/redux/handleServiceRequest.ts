import {
  addErrorMessage,
  addSuccessMessage,
  setLoading,
} from "./actions/dialog";
import store from "./store";

interface IHandleServiceRequestProps {
  requestFunction: any;
  requestProps: { [keyof: string]: any };
}

const handleServiceRequest = ({
  requestFunction,
  requestProps,
}: IHandleServiceRequestProps) => {
  const onSuccess = (message: string) => {
    store.dispatch(setLoading(false));
    store.dispatch(addSuccessMessage(message));
  };
  const onError = (message: string) => {
    store.dispatch(setLoading(false));
    store.dispatch(addErrorMessage(message));
  };
  store.dispatch(setLoading(true));
  requestFunction({
    ...requestProps,
    onSuccess,
    onError,
  });
};

export default handleServiceRequest;
