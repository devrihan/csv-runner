"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, AlertCircle } from "lucide-react";
import { parseAndValidateCSV, processDashboardData } from "@/lib/data-logic";
import { DashboardData } from "@/types";

interface CsvUploaderProps {
  onDataLoaded: (data: DashboardData) => void;
}

export function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const { data, errors } = await parseAndValidateCSV(file);

      if (errors.length > 0) {
        setError(errors);
        if (errors[0].includes("Invalid CSV Headers")) {
          setLoading(false);
          return;
        }
      }

      if (data.length > 0) {
        const processed = processDashboardData(data);
        onDataLoaded(processed);
      } else {
        setError((prev) => [...(prev || []), "No valid data rows found."]);
      }
    } catch (err) {
      setError(["An unexpected error occurred parsing the file."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Upload Run Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Button
            variant="outline"
            className="w-full h-32 border-dashed border-2 flex flex-col gap-2 hover:bg-muted/50"
            onClick={() => document.getElementById("csv-input")?.click()}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground">
              {loading ? "Processing..." : "Click to select CSV"}
            </span>
          </Button>
          <input
            id="csv-input"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="max-h-40 overflow-y-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Error</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 text-xs">
                {error.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
