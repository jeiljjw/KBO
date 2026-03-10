import { years } from "@/data/mockData";

interface HeaderProps {
  year: number;
  setYear: (year: number) => void;
  title: string;
}

export function Header({ year, setYear, title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <div className="flex items-center gap-3">
        <label htmlFor="year-select" className="text-sm font-medium text-slate-600">
          시즌 선택:
        </label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="block w-32 rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border bg-white"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y} 시즌
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
