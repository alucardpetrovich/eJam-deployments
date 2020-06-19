import React, { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/root.reducer";
import { showNewDeployment } from "../store/deployments/deployments.operations";

const TIMER_TICK_PERIOD_IN_MS = 50;

interface IDeploymentTimerProps {
  _id: string;
}

export function DeploymentTimer(props: IDeploymentTimerProps) {
  const { _id } = props;
  const deployments = useSelector((state: RootState) => state.deployments.data);
  const dispatch = useDispatch();

  const targetDeployment = deployments.find(
    (deployment) => deployment._id === _id
  )!;

  const timerTimeout = _.random(5, 30, false) * 1000;

  const [time, setTime] = useState(timerTimeout + 2 * TIMER_TICK_PERIOD_IN_MS);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTime(time - TIMER_TICK_PERIOD_IN_MS);

      if (time <= 0) {
        clearInterval(countdownInterval);
        dispatch(showNewDeployment(targetDeployment._id));
      }
    }, TIMER_TICK_PERIOD_IN_MS);

    return () => {
      clearInterval(countdownInterval);
    };
  });

  return <>{time >= 0 && <p>{moment(time).format("mm:ss:SSS")}</p>}</>;
}
