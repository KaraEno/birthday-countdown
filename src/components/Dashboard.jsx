import { useEffect, useState } from "react";
import useBirthDayCountdown from "../hooks/useBirthdayCountdown.js";

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("birthday");
    const parsedData = JSON.parse(data);
    setUser(parsedData);
  }, []);

  if (!user) {
    return <div>Loading</div>;
  }

  const { days, hours, minutes, seconds } = useBirthDayCountdown(
    user.dob ?? null,
    user.timezone ?? null
  );

  return (
    <div className="w-full flex p-4 h-screen mx-auto">
      {user && (
        <div className="w-full">
          <h2 className="text-xl pt-4 md:text-2xl font-bold text-foreground mb-1">
            Hello, <span className="text-blue-500">{user.username}!</span>{" "}
            <span className="ml-1">👋</span>
          </h2>
          <div className="w-full shadow-lg pt-4 px-2 flex flex-col justify-center items-center">
            <img src="/birthday-meme.jpg" className="w-[300px h-[300px]" />
            <p className="text-sm sm:text-xl px-6 text-muted-foreground mb-6">
              I hope you are pumped for your birthday coming up in
            </p>
            {days || hours || minutes || seconds ? (
              <p className="text-[30px] sm:text-[150px] font-bold">
                {days}d : {hours}h : {minutes}m : {seconds}s
              </p>
            ) : (
              <p>Loading countdown...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
