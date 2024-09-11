"use client";
import StatisticsChart from "@/components/StatisticsChart";
import { StatusChart } from "@/components/StatusChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChartDataProps } from "./validationSchema";

export default function Home() {
  const [issueStat, setIssueStat] = useState([] as ChartDataProps[]);
  const [totalIssues, setTotalIssues] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const resp = await axios.get('/api/issues/stat');
      
      if (resp.status === 200) {
        let updatedResp = [] as ChartDataProps[];

        Object.keys(resp.data.issuesStat).forEach((key) => {
          const updatedKey = key.replace('_', ' ');
          updatedResp = [
            ...updatedResp,
            {
              "title": updatedKey,
              "issues": resp.data.issuesStat[key]
            }
          ]
        })

        setIssueStat(updatedResp);
        setTotalIssues(resp.data.total);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen space-y-6">
      <section className="flex flex-col sm:flex-row">
        <StatisticsChart stat={issueStat} totalIssues={totalIssues} />
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
