/** @format */

import DashboardContent from "@/components/dashboard-content";
import { getSession } from "@/lib/auth/server";

async function Dashboard() {
  const session = await getSession();
  return <DashboardContent userId={session.data.user.id} />;
}

export default Dashboard;
