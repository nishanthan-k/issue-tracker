"use client";
import StatisticsChart from "@/components/StatisticsChart";
import { StatusChart } from "@/components/StatusChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChartDataProps } from "./validationSchema";
import IssueChart from "@/components/IssueChart";
import DevStatTable from "@/components/DevStatTable";

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
              title: updatedKey,
              issues: resp.data.issuesStat[key],
            },
          ];
        });

        setIssueStat(updatedResp);
        setTotalIssues(resp.data.total);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen space-y-6">
      <section className="flex flex-col sm:flex-row">
        <StatisticsChart stat={issueStat} totalIssues={totalIssues} />
      </section>
      <section className="h-[540px] flex flex-col sm:flex-row gap-4">
        <div className="sm:w-2/3">
          <IssueChart stat={issueStat} totalIssues={totalIssues} />
        </div>
        <div className="w-full sm:w-1/3 h-full flex flex-col gap-4">
          <div className="h-[60%]">
            <StatusChart stat={issueStat} totalIssues={totalIssues} />
          </div>
          <div className="h-[47%]">
            <DevStatTable />
          </div>
        </div>
      </section>
    </main>
  );
}
