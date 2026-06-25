import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { logsTable } from "../../components/ui.js";

export function AdminDashboard() {
  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Admin control</p>
      <h2>Clinic Management</h2>
      <p>Focused admin tools for users, reports, and audit review.</p>
    </section>
    <section class="admin-grid">
      <article class="panel">
        <h3>User Management</h3>
        <p class="panel-copy">Create staff accounts during the backend database phase.</p>
        <div class="user-management">
          <button 
class="solid"
data-link="/admin/create-doctor">

Create Doctor

</button>


<button 
class="ghost"
data-link="/admin/create-receptionist">

Create Receptionist

</button>
        </div>
      </article>
      <article class="panel">
        <h3>Admin Navigation</h3>
        <p class="panel-copy">Use audit logs and reports for the hackathon walkthrough.</p>
        <div class="user-management">
          <button class="solid" data-link="/admin/logs">View Logs</button>
          <button class="ghost" data-link="/admin/reports">Reports</button>
        </div>
      </article>
    </section>
    <section class="panel">
      <h3>Recent Activity</h3>
      ${logsTable(state.queue.logs.slice(0, 5))}
    </section>
  `);
}
