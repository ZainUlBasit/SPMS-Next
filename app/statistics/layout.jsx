import StatsNavs from "@/components/Navigations/StatsNavs";

export default function StatisticsLayout({ children }) {
  return (
    <div>
      <StatsNavs />
      {children}
    </div>
  );
}
