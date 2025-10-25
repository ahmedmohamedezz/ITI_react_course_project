import AnalyticsCard from "../components/cards/AnalyticsCard";
import NotesManagerCard from "../components/cards/NotesManagerCard";
import UsersCard from "../components/cards/UsersCard";
import WeatherCard from "../components/cards/WeatherCard";

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid sm:grid-cols-1 gap-6 w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <UsersCard />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <NotesManagerCard />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <AnalyticsCard />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <WeatherCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
