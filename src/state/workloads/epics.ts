import { combineEpics, Epic } from "redux-observable";
import { filter, map, mergeMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction, RootState } from "../reducer";
import { submit, created, cancel, updateStatus } from "./actions";
import { WorkloadService } from "./services";

const workloadService = new WorkloadService();
const timer = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve("finish"), time));
const totalList: any = {};

type AppEpic = Epic<RootAction, RootAction, RootState>;

const logWorkloadSubmissions: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(submit)),
    mergeMap(async (action) => {
      const createdTask = await workloadService.create(action.payload);
      totalList[`${createdTask.id}`] = Date.now();
      return created(createdTask);
    })
  );

const cancelWorkload: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(cancel)),
    mergeMap(async (action) => {
      const curr = await workloadService.checkStatus(action.payload);
      if (curr.status === "WORKING") {
        const work = await workloadService.cancel(action.payload);
        return updateStatus(work);
      }
      return updateStatus(curr);
    })
  );

const workloadTimer: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(created)),
    map(action => action.payload),
    filter(payload => "status" in payload && payload.status === "WORKING"),
    mergeMap(async (payload) => {
      const diff =
        payload.completeDate.getTime() - totalList[payload.id];
      delete totalList[payload.id];
      await timer(diff);
      const curr = await workloadService.checkStatus(payload);
      return updateStatus(curr);
    })
  );

export const epics = combineEpics(
  logWorkloadSubmissions,
  cancelWorkload,
  workloadTimer
);

export default epics;
