import React from 'react';
import TimeAgo from 'react-timeago';
import { Status } from '../../state/workloads'

const statusSpecificClasses = {
  'WORKING': 'working-div-style',
  'SUCCESS': 'success-div-style',
  'FAILURE': 'failure-div-style',
  'CANCELED': 'canceled-div-style'
}

export interface WorkloadItemStateProps {
  id: number;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
}

export interface WorkloadItemProps extends 
  WorkloadItemStateProps,
  WorkloadItemMethodProps {}


const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => (
  <div>
    <div>
      <h3>Workload #{props.id}</h3>
      <span>Complexity: {props.complexity}</span>
    </div>
    <div>
      {props.status === 'WORKING'
        ? (
          <>
            <span><TimeAgo date={props.completeDate} /></span>
            <button 
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </>
        )
        : (
          <span>{props.status.toLowerCase()}</span>
        )
      }
    </div>
  </div>
);


export { 
  WorkloadItem,
};

export default WorkloadItem;