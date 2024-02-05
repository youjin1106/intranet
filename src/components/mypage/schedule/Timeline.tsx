import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import WorkingTimer from "./WorkingTimer";
type Chart = {
  series: Array<WorkState>;
  options: ApexOptions;
};

type WorkState = {
  name: string;
  data: Array<TimeRange>;
};

type TimeRange = {
  x: string;
  y: [number, number];
};

type JsonUserScheduleData = {
  state: string;
  date: string;
  time: string;
};

const Timeline = () => {
  const state: Chart = {
    series: [
      {
        name: "근무중",
        data: [],
      },

      {
        name: "반차",
        data: [],
      },
      {
        name: "연차",
        data: [],
      },
    ],
    ///////////////////////////////////////
    options: {
      chart: {
        width: "100%",
        height: 400,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
      },
      colors: ["#546E7A", "#E91E63", "#FF9800"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "40%",
          rangeBarGroupRows: true,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      stroke: {
        width: 1,
      },
      fill: {
        type: "solid",
        opacity: 0.6,
      },
    },
  };

  const getSchedules = async (id: string) => {
    const response = await fetch(`http://localhost:3001/schedules/${id}`).then(
      (res) => res.json()
    );
    return response;
  };
  const [chart, setChart] = useState(state);

  const getSchedule = async () => {
    const copyState: Chart = JSON.parse(JSON.stringify(state));
    const getData = await getSchedules("yj"); //임시 유저
    getData.schedule.map((timeRecord: JsonUserScheduleData) => {
      const [startTime, endTime] = timeRecord.time.split(",");
      const filteredTimeRecord: TimeRange = {
        x: timeRecord.date,
        y: [
          dayjs(`2024-01-31 ${startTime}`).valueOf(),
          dayjs(`2024-01-31 ${endTime}`).valueOf(),
        ],
      };
      if (timeRecord.state === "근무중") {
        copyState.series[0].data.push(filteredTimeRecord);
      } else if (timeRecord.state === "반차") {
        copyState.series[1].data.push(filteredTimeRecord);
      } else if (timeRecord.state === "연차") {
        copyState.series[2].data.push(filteredTimeRecord);
      }
    });

    setChart(copyState);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="text-titleMd text-gray00 font-bold">근무 관리</div>
        <WorkingTimer />
      </div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={chart.series}
          type="rangeBar"
          height={220}
        />
      </div>
    </>
  );
};

export default Timeline;
