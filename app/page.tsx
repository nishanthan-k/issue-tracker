import { StatusChart } from "@/components/StatusChart";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col sm:flex-row">
        <div className="w-1/3">
          <StatusChart />
        </div>
      </section>
    </main>
  );
}
