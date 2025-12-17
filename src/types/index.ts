export interface RunData {
  date: string;
  person: string;
  miles: number;
}

export interface ParseResult {
  data: RunData[];
  errors: string[];
}

export interface RunnerMetrics {
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  runCount: number;
}

export interface DashboardData {
  raw: RunData[];
  overallMetrics: RunnerMetrics;
  personMetrics: Record<string, RunnerMetrics>;
  uniqueRunners: string[];
}