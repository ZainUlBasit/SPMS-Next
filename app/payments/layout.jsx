import PaymentNavs from "@/components/Navigations/PaymentNavs";

export default function PaymentsLayout({ children }) {
  return (
    <div>
      <PaymentNavs />
      {children}
    </div>
  );
}
