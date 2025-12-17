# CSV Runner Dashboard

A modern analytics dashboard built with **Next.js 16** and **shadcn/ui**
that visualizes running performance data. Users can upload a CSV file
containing run logs to view team-wide and individual performance metrics
through interactive charts and summary grids.

## 1. Project Overview

This project is a submission for the "CSV Runner Dashboard" challenge.
It solves the problem of visualizing raw running data by parsing
client-side CSV uploads and generating immediate insights without a
backend database.

### Core Capabilities

- **CSV Parsing:** Browser-based parsing using `papaparse` with real-time validation.
- **Data Visualization:** Interactive bar charts built with `recharts`.
- **Metrics Calculation:** Automatic computation of total, average, shortest, and longest runs.
- **Filtering:** Dynamic switching between **Overall Team** views and individual runner profiles.

## 2. Assumptions

In building this application, the following non-obvious decisions were made:

- **Client-Side Processing:** Since no backend persistence was required, all CSV parsing and data manipulation happen in the browser. Refreshing the page will reset the data.
- **Date Formats:** The parser assumes standard date formats (ISO 8601 or `YYYY-MM-DD`) that are parseable by the JavaScript `Date` object.
- **Miles Validation:** Miles must be non-negative numbers. Rows with missing names or invalid numbers are flagged as errors but do not crash the application; valid rows are still processed.
- **Theme:** The UI defaults to a clean, light-mode aesthetic using the `shadcn` Zinc color palette.


## 3. Prerequisites

-   **Node.js:** Version 18.17 or later (Required for Next.js 16).
-   **Package Manager:** `npm`, `yarn`, `pnpm`, or `bun`.

## 4. Setup

Follow these steps to set up the project locally:

### 1. Clone the repository

``` bash
git clone <your-repo-url>
cd csv-runner
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Environment Variables

-   This project currently does not require any environment variables
    (e.g., API keys or Database URLs).


### 4. Seeding Data

-   No database seeding is required as the app works with user-uploaded
    files.

## 5. Run & Verify

### Start the development server

``` bash
npm run dev
```

Open http://localhost:3000 in your browser.


### Verification Steps (Acceptance Criteria)

#### Validate CSV Parsing & Error Handling

Create a file named **bad_data.csv** with the content below (missing
miles in row 2):

``` csv
date,person,miles
2024-01-01,Alice,5.0
2024-01-02,Bob,invalid
```

Upload this file.

**Verify:** You should see a red **"Validation Error"** alert listing
the specific row error.



#### Verify Visualization & Metrics

Create a file named **runs.csv** with the sample data below:

``` csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.0
2024-01-03,Alice,6.0
2024-01-03,Charlie,2.5
```

Upload this file (or download & use the sample csv file i.e sample.csv)

##### Verify (Overall Tab)

-   **Total Miles:** 17
-   **Average Run:** 4.25
-   Chart shows bars for all 4 runs.

##### Verify (Per Person Tab)

-   Select **Alice**
-   Metrics update: **Total: 11.5**, **Max: 6.0**
-   Chart shows only Alice's 2 runs.

## 6. Features & Limitations

### Features

-  **Robust Validation:** Checks for missing headers and invalid data types per row.
-  **Interactive Charts:** Hover tooltips provide exact details for every run.
-  **Responsive Design:** Works seamlessly on desktop and mobile devices.

### Limitations

-   **Data Persistence:** Data is lost on page reload (by design).
-   **Large Files:** Very large CSVs (100k+ rows) may cause UI lag as
    processing is main-thread bound.
-   **Duplicate Entries:** If a person runs twice on the same day, both
    runs appear as separate bars; they are not aggregated by day.

## 7. Notes on Architecture

The project uses the Next.js App Router structure:

-   `src/app/page.tsx` - Main entry point. Manages high-level state
    (Upload vs Dashboard views).
-   `src/lib/data-logic.ts` - Core business logic; separates data
    processing from UI for testability.
-   `src/components/dashboard.tsx` - Smart container handling runner
    filtering and state.
-   `src/components/ui/` - Reusable UI primitives from **shadcn/ui**.

## 8. Accessibility & UI

-   **Keyboard Navigation:** Fully accessible via Tab, Arrow keys,
    Enter/Space using Radix UI primitives.
-   **Contrast:** Meets WCAG AA standards using Tailwind slate and zinc
    scales.
-   **Screen Readers:** Proper labels and ARIA roles for tabs and
    alerts.
-   **Typography:** Uses **Inter** (via `next/font/google`) for
    readability.
