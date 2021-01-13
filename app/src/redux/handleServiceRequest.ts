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
  store.dispatch(setLoading(true));
  try {
    const res = await requestFunction(requestProps);   
    res.successMessage && store.dispatch(addSuccessMessage(res.successMessage));
    return res;
  } catch (error) {
    error && store.dispatch(addErrorMessage(error));
    return false;
  } finally {
    store.dispatch(setLoading(false));
  }
};

export default handleServiceRequest;
