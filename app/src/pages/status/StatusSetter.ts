import { store } from "../../store";
import { IStatusProps, StatusType } from "./status.types";
import { addStatusLog } from "./statusSlice";

export const statusStates = {
  idle: "idle",
  loading: "loading",
  error: "error",
} as const;

class Status {
  constructor({ type, state, message }: IStatusProps) {
    this.type = type;
    this.state = state;
    this.message = message;
    this.timeStamp = new Date();
  }
  type;
  state;
  message;
  timeStamp;
}

export default class StatusSetter {
  constructor(type: StatusType) {
    this.type = type;
  }
  type;

  idle(state: any, message: string = "") {
    state.status.state = statusStates.idle;
    state.status.idle = message;
    store.dispatch(
      addStatusLog(
        new Status({ type: this.type, state: statusStates.idle, message })
      )
    );
  }
  loading(state: any, message: string = "") {
    state.status.state = statusStates.loading;
    state.status.loading = message;
    store.dispatch(
      addStatusLog(
        new Status({ type: this.type, state: statusStates.loading, message })
      )
    );
  }
  error(state: any, message: string = "") {
    state.status.state = statusStates.error;
    state.status.error = message;
    store.dispatch(
      addStatusLog(
        new Status({ type: this.type, state: statusStates.error, message })
      )
    );
  }
}
