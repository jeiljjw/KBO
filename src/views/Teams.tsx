import { teamStandings, teamColors } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TeamsProps {
  year: number;
}

export function Teams({ year }: TeamsProps) {
  const standings = teamStandings[year] || [];

  if (standings.length === 0) {
    return <div className="p-8 text-center text-slate-500">해당 연도의 데이터가 없습니다.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">{year} KBO 정규시즌 순위</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">순위</th>
                <th className="px-6 py-4 font-bold">팀명</th>
                <th className="px-6 py-4 font-bold text-right">경기</th>
                <th className="px-6 py-4 font-bold text-right">승</th>
                <th className="px-6 py-4 font-bold text-right">무</th>
                <th className="px-6 py-4 font-bold text-right">패</th>
                <th className="px-6 py-4 font-bold text-right">승률</th>
                <th className="px-6 py-4 font-bold text-right">승차</th>
                <th className="px-6 py-4 font-bold text-right">연속</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standings.map((team) => {
                const games = team.w + team.l + team.d;
                return (
                  <tr key={team.team} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{team.rank}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className={cn("w-4 h-4 rounded-full shadow-sm", teamColors[team.team] || "bg-slate-300")} />
                      {team.team}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600 font-mono">{games}</td>
                    <td className="px-6 py-4 text-right text-blue-600 font-mono font-medium">{team.w}</td>
                    <td className="px-6 py-4 text-right text-slate-500 font-mono">{team.d}</td>
                    <td className="px-6 py-4 text-right text-red-600 font-mono font-medium">{team.l}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 font-mono">{team.pct.toFixed(3)}</td>
                    <td className="px-6 py-4 text-right text-slate-500 font-mono">{team.gb.toFixed(1)}</td>
                    <td className="px-6 py-4 text-right text-slate-600 font-medium">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs",
                        team.streak.includes("승") ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"
                      )}>
                        {team.streak}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
