export const statusStates = {
  idle: "idle",
  loading: "loading",
  error: "error",
};

const setIdleStatus = (state: any, message: string = "") => {
  state.status.state = statusStates.idle;
  state.status.idle = message;
};
const setLoadingStatus = (state: any, message: string = "") => {
  state.status.state = statusStates.loading;
  state.status.loading = message;
};
const setErrorStatus = (state: any, message: string = "") => {
  state.status.state = statusStates.error;
  state.status.error = message;
};

const setStatus = {
  idle: setIdleStatus,
  loading: setLoadingStatus,
  error: setErrorStatus,
};

export default setStatus;
