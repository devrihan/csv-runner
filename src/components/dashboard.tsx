"use client";

import { useState } from "react";
import { DashboardData } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricsGrid } from "./metrics-grid";
import { RunnerChart } from "./runner-chart";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

export function Dashboard({
  data,
  onReset,
}: {
  data: DashboardData;
  onReset: () => void;
}) {
  const [selectedPerson, setSelectedPerson] = useState<string>(
    data.uniqueRunners[0]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Analytics Overview
        </h2>
        <Button variant="outline" onClick={onReset}>
          <RefreshCcw className="mr-2 h-4 w-4" /> Upload New
        </Button>
      </div>

      <Tabs defaultValue="overall" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overall">Overall Team</TabsTrigger>
          <TabsTrigger value="person">Per Person</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-4">
          <MetricsGrid metrics={data.overallMetrics} title="Team" />
          <RunnerChart data={data.raw} />
        </TabsContent>

        <TabsContent value="person" className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Select Runner:</span>
            <Select value={selectedPerson} onValueChange={setSelectedPerson}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select person" />
              </SelectTrigger>
              <SelectContent>
                {data.uniqueRunners.map((runner) => (
                  <SelectItem key={runner} value={runner}>
                    {runner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPerson && data.personMetrics[selectedPerson] && (
            <>
              <MetricsGrid
                metrics={data.personMetrics[selectedPerson]}
                title={selectedPerson}
              />
              <RunnerChart data={data.raw} filterPerson={selectedPerson} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
