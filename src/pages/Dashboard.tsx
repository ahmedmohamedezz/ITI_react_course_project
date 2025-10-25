import AnalyticsCard from "../components/cards/AnalyticsCard";
import NotesManagerCard from "../components/cards/NotesManagerCard";
import UsersCard from "../components/cards/UsersCard";

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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Weather Card
          </h2>
          <p className="text-gray-500 text-sm">
            Check today's weather forecast
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
