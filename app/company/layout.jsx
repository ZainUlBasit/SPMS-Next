import CompanyNavs from "@/components/Navigations/CompanyNavs";

export default function CompanyLayout({ children }) {
  return (
    <div>
      <CompanyNavs />
      {children}
    </div>
  );
}
