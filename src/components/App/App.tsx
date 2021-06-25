import React, { PureComponent } from "react";

import { WorkloadListContainer } from "../WorkloadList";
import { WorkloadFormContainer } from "../WorkloadForm";
import classes from "./App.module.css";

class App extends PureComponent {
  render() {
    return (
      <div className={classes.container}>
        <h1 className={classes.header}>CloudWork</h1>
        <hr />
        <div className={classes.workloadBox}>
          <div className={classes.workloadsContainer}>
            <h2 className={classes.header}>Workloads</h2>
            <WorkloadListContainer />
          </div>
          <div className={classes.formContainer}>
            <WorkloadFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
