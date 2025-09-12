import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constant";
import { DateTime } from "luxon";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const payload = {
      username: data.username,
      email: data.email,
      timezone: timezone,
      dob: data.birthday,
    };
    try {
      const response = await fetch(
        `${BACKEND_URL}/`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (response.ok) {
        const dob = result?.user.dob;
        const dayAndMonth = DateTime.fromISO(dob).toFormat("MM-dd");

        localStorage.setItem(
          "birthday",
          JSON.stringify({
            username: result?.user.username,
            dob: dayAndMonth,
            timezone: result?.user.timezone,
          })
        );

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="rounded-xl p-8 w-full max-w-lg text-center">
        {/* <AuthLogo /> */}
        <div className="flex justify-center mb-6">
          <a href="/" className="flex items-center space-x-2">
            <div className="text-3xl text-blue-500 font-bold">
              Birthday Reminder
            </div>
          </a>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-12">
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-left text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <div>
                <small className="flex justify-start text-red-500">
                  {errors.username.message}
                </small>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-left text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="flex justify-start  text-red-500">
                {errors.email.message}
              </small>
            )}
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block text-sm text-left text-gray-700 dark:text-gray-300 mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("birthday", { required: true })}
            />
            {errors.birthday && (
              <small className="flex justify-start  text-red-500">
                {errors.birthday.message}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition mt-10"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
