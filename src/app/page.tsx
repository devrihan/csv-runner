"use client";

import { useState } from "react";
import { CsvUploader } from "@/components/csv-uploader";
import { Dashboard } from "@/components/dashboard";
import { DashboardData } from "@/types";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="border-b pb-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Runner Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload CSV data to analyze running performance metrics.
          </p>
        </header>

        {!data ? (
          <CsvUploader onDataLoaded={setData} />
        ) : (
          <Dashboard data={data} onReset={() => setData(null)} />
        )}
      </div>
    </main>
  );
}
