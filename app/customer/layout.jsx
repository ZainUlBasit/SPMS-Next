import CustomerNavs from "@/components/Navigations/CustomerNavs";

export default function CustomerLayout({ children }) {
  return (
    <div>
      <CustomerNavs />
      {children}
    </div>
  );
}
