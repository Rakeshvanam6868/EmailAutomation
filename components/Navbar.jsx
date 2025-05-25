export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Email Automation Dashboard</h1>
        <div className="space-x-4">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/recruiters" className="hover:underline">Recruiters</a>
          <a href="/resume" className="hover:underline">Resume</a>
        </div>
      </div>
    </nav>
  );
}