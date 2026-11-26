import TeamCard from '../components/TeamCard'
import { teams } from '../data/teams'

/** 「团队」标签页：团队卡片网格 */
export default function TeamPage() {
  if (teams.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
        <i className="fa-regular fa-folder-open text-3xl" />
        <p className="text-sm">暂无团队</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
