import setStatus from "./stateStatus";

describe("state status tests", () => {
  test("sets state correctly - idle", () => {
    const state = {
      status: {
        state: "loading",
      },
    };
    setStatus.idle(state, "");
    expect(state).toEqual({
      status: { state: "idle", idle: "" },
    });
  });
  test("sets state correctly - loading", () => {
    const state = {
      status: {
        state: "idle",
      },
    };
    setStatus.loading(state, "loading data...");
    expect(state).toEqual({
      status: { state: "loading", loading: "loading data..." },
    });
  });
  test("sets state correctly - error", () => {
    const state = {
      status: {
        state: "idle",
      },
    };
    setStatus.error(state, "error");
    expect(state).toEqual({
      status: { state: "error", error: "error" },
    });
  });
});
