import { workloadReducer } from "./reducer";
import { Status } from "./types";

const initialState = {};
const dummyWorkload = {
  completeDate: new Date("2020-01-01T00:00:05.000Z"),
  id: 0,
  complexity: 5,
  status: ("WORKING" as Status),
};

test("test return original state", () => {
  expect(
    workloadReducer(undefined, {
      type: "workload/SUBMIT",
      payload: { complexity: 5 },
    })
  ).toEqual({});
});

test("test workload created", () => {
  expect(
    workloadReducer(
      {},
      {
        type: "workload/CREATED",
        payload: {
          completeDate: new Date("2020-01-01T00:00:05.000Z"),
          id: 0,
          complexity: 5,
          status: "WORKING",
        },
      }
    )
  ).toEqual({
    "0": dummyWorkload,
  });
});

test("test update status", () => {
  const data = expect(
    workloadReducer({0:dummyWorkload}, {
      type: "workload/UPDATE_STATUS",
      payload: {
        id: 0,
        status: "CANCELED",
      },
    })
  );
  dummyWorkload.status = "CANCELED";
  data.toEqual({"0":dummyWorkload});
});
