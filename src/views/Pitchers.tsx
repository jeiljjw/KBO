import { pitcherStats, teamColors } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface PitchersProps {
  year: number;
}

export function Pitchers({ year }: PitchersProps) {
  const pitchers = pitcherStats[year] || [];

  if (pitchers.length === 0) {
    return <div className="p-8 text-center text-slate-500">해당 연도의 데이터가 없습니다.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">{year} KBO 투수 기록 (평균자책점 순)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">순위</th>
                <th className="px-6 py-4 font-bold">선수명</th>
                <th className="px-6 py-4 font-bold">팀명</th>
                <th className="px-6 py-4 font-bold text-right text-blue-600">ERA</th>
                <th className="px-6 py-4 font-bold text-right">경기</th>
                <th className="px-6 py-4 font-bold text-right">승</th>
                <th className="px-6 py-4 font-bold text-right">패</th>
                <th className="px-6 py-4 font-bold text-right">세이브</th>
                <th className="px-6 py-4 font-bold text-right">홀드</th>
                <th className="px-6 py-4 font-bold text-right">이닝</th>
                <th className="px-6 py-4 font-bold text-right">탈삼진</th>
                <th className="px-6 py-4 font-bold text-right">WHIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pitchers.map((player) => (
                <tr key={player.player} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{player.rank}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{player.player}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={cn("px-2 py-1 rounded-full text-xs text-white", teamColors[player.team] || "bg-slate-500")}>
                      {player.team}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-blue-600 font-mono">{player.era.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-600 font-mono">{player.g}</td>
                  <td className="px-6 py-4 text-right font-bold text-blue-600 font-mono">{player.w}</td>
                  <td className="px-6 py-4 text-right font-bold text-red-600 font-mono">{player.l}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800 font-mono">{player.sv}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800 font-mono">{player.hld}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800 font-mono">{player.ip.toFixed(1)}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900 font-mono">{player.so}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800 font-mono">{player.whip.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
