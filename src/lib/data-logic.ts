import Papa from "papaparse";
import { DashboardData, ParseResult, RunData, RunnerMetrics } from "@/types";

const calculateMetrics = (values: number[]): RunnerMetrics => {
  if (values.length === 0) {
    return { totalMiles: 0, averageMiles: 0, minMiles: 0, maxMiles: 0, runCount: 0 };
  }
  const total = values.reduce((a, b) => a + b, 0);
  return {
    totalMiles: parseFloat(total.toFixed(2)),
    averageMiles: parseFloat((total / values.length).toFixed(2)),
    minMiles: Math.min(...values),
    maxMiles: Math.max(...values),
    runCount: values.length,
  };
};

export const parseAndValidateCSV = (file: File): Promise<ParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const validData: RunData[] = [];

        const headers = results.meta.fields;
        if (!headers || !headers.includes("date") || !headers.includes("person") || !headers.includes("miles")) {
          resolve({ data: [], errors: ["Invalid CSV Headers. Required: date, person, miles"] });
          return;
        }

        results.data.forEach((row: any, index) => {
          const miles = parseFloat(row.miles);
          const date = Date.parse(row.date);

          if (!row.person || row.person.trim() === "") {
            errors.push(`Row ${index + 1}: Missing person name.`);
          } else if (isNaN(miles) || miles < 0) {
            errors.push(`Row ${index + 1}: Invalid miles value '${row.miles}'.`);
          } else if (isNaN(date)) {
            errors.push(`Row ${index + 1}: Invalid date format '${row.date}'.`);
          } else {
            validData.push({
              date: new Date(row.date).toISOString().split('T')[0], 
              person: row.person.trim(),
              miles: miles,
            });
          }
        });

        resolve({ data: validData, errors });
      },
      error: (err) => {
        resolve({ data: [], errors: [`File read error: ${err.message}`] });
      }
    });
  });
};

export const processDashboardData = (data: RunData[]): DashboardData => {
  const allMiles = data.map(d => d.miles);
  
  const personMap: Record<string, number[]> = {};
  
  data.forEach(d => {
    if (!personMap[d.person]) personMap[d.person] = [];
    personMap[d.person].push(d.miles);
  });

  const personMetrics: Record<string, RunnerMetrics> = {};
  Object.keys(personMap).forEach(person => {
    personMetrics[person] = calculateMetrics(personMap[person]);
  });

  return {
    raw: data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    overallMetrics: calculateMetrics(allMiles),
    personMetrics,
    uniqueRunners: Object.keys(personMap).sort(),
  };
};