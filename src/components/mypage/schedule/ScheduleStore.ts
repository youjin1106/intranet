import { atom } from "jotai";

const sec = atom(0);
const urlAtom = atom("http://localhost:3001/schedules");

type Schedule = {
  state: string;
  date: string;
  time: string;
};

const getTest = async (id: string) => {
  const response = await fetch(`http://localhost:3001/schedules/${id}`).then(
    (res) => res.json()
  );
  return response;
};

export const addChart = async (
  id: string,
  state: string,
  date: string,
  time: string
) => {
  const schedule: Schedule = {
    state: state,
    date: date,
    time: time,
  };

  const beforeChart = await getTest(id);
  const newSchedules = [...beforeChart.schedule, schedule];
  try {
    const response = await fetch("http://localhost:3001/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ id, schedule: newSchedules }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add schedule. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Schedule added successfully:", result);
  } catch (error) {
    console.error("Error adding schedule:", error.message);
  }
};
