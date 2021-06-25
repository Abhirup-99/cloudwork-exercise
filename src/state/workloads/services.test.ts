import { WorkloadService } from "./services";
jest.mock("moment", () => {
  return () => jest.requireActual("moment")("2020-01-01T00:00:00.000Z");
});

const dummyData = {
  id: 0,
  complexity: 5,
  status: "WORKING",
  completeDate: new Date("2020-01-01T00:00:05.000Z"),
};
const service = new WorkloadService();

test("test create", () => {
  return service.create({ complexity: 5 }).then((data) => {
    expect(data).toEqual(dummyData);
  });
});

test("test check status found", () => {
  (service as any).workLoads = [dummyData];
  return service.checkStatus({ id: 0 }).then((data) => {
    expect(data).toEqual(dummyData);
  });
});

test("test workload not found error", () => {
  return service.checkStatus({ id: 0 }).catch((err) => {
    expect(err).toBe("Workload not found");
  });
});

test("test cancel", () => {
  (service as any).workLoads = [dummyData];
  return service.cancel({ id: 0 }).then((data) => {
    dummyData.status = "CANCELED";
    expect(data).toEqual(dummyData);
  });
});

test("test cannot be cancelled", ()=>{
    (service as any).workLoads = [dummyData];
    dummyData.status = "CANCELED";
    return service.cancel({ id: 0 }).catch((data) => {
      expect(data).toBe("Workload cannot be canceled");
    });
  
})
