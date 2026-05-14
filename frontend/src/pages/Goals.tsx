import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import QuickMetricForm from "../components/QuickMetricForm";




export default function Goals() {
 return (
  <div className="flex min-h-screen bg-[#EAF6FF]">
    <Sidebar />

    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex-1 p-6 pb-24 lg:pb-6">
        {<QuickMetricForm />}
      </main>

      <BottomNavbar />
    </div>
  </div>
);
}
