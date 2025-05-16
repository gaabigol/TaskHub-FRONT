import ActivityItem from './activityItem'
import DashboardCards from './dashboardCards'
import QuickActionsPanel from './quickActionsPanel'
import RecentActivitiesPanel from './recentActivitiesPanel'
import ActivityItemSkeleton from './skeleton/activityItemSkeleton'
import SummarySkeleton from './skeleton/summarySkeleton'
import UpcomingTaskSkeleton from './skeleton/upcomingTaskSkeleton'
import SummaryCard from './summaryCard'
import UpcomingTaskItem from './upcomingTaskItem'
import UpcomingTasksPanel from './upcomingTasksPanel'

export const CDashboard = {
  summarySkeleton: SummarySkeleton,
  activitySkeleton: ActivityItemSkeleton,
  upcomingTaskSkeleton: UpcomingTaskSkeleton,
  card: SummaryCard,
  activityItem: ActivityItem,
  upcomingTaskItem: UpcomingTaskItem,
  dashboardCards: DashboardCards,
  recentActivitiesPanel: RecentActivitiesPanel,
  upcomintTaskPanel: UpcomingTasksPanel,
  quickActionsPanel:QuickActionsPanel
}
