import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

const useBirthDayCountdown = (dob, timezone) => {
  const [timeleft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!dob || !timezone) return;

    const interval = setInterval(() => {
      const now = DateTime.now().setZone(timezone);

      let birthday = DateTime.fromFormat(dob, "MM-dd", { zone: timezone }).set({
        year: now.year,
        hour: 7,
        minute: 0,
        second: 0,
        millisecond: 0,
      });

      // birthday has passed already? It should shift it to the next year
      if (birthday < now) {
        birthday = birthday.plus({ years: 1 });
      }

      //Get the difference
      const diff = birthday
        .diff(now, ["days", "hours", "minutes", "seconds"])
        .toObject();
      setTimeLeft({
        days: Math.floor(diff.days ?? 0),
        hours: Math.floor(diff.hours ?? 0),
        minutes: Math.floor(diff.minutes ?? 0),
        seconds: Math.floor(diff.seconds ?? 0),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dob, timezone]);

  return timeleft;
};

export default useBirthDayCountdown;
