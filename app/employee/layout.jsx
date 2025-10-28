import EmployeeNavs from "@/components/Navigations/EmployeeNavs";

export default function EmployeeLayout({ children }) {
  return (
    <div>
      <EmployeeNavs />
      {children}
    </div>
  );
}
