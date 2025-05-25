import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Email Automation Dashboard</h1>
      <p className="mb-6">Use the navigation above to manage recruiters, update your resume, or view logs.</p>
    </div>
    </>
    
  );
}
