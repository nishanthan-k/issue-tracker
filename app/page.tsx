import StatisticsChart from "@/components/StatisticsChart";
import { StatusChart } from "@/components/StatusChart";

export default function Home() {
  return (
    <main className="min-h-screen space-y-6">
      <section className="flex flex-col sm:flex-row">
        <StatisticsChart />
      </section>
      <section className="flex flex-col sm:flex-row">
        <div className="w-2/3">
          {/* <StatisticsCard /> */}
        </div>
        <div className="w-full sm:w-1/3">
          <StatusChart />
        </div>
      </section>
    </main>
  );
}
