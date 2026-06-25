import { state } from "../../context/clinicState.js";
import { logsTable } from "../../components/ui.js";
import { mainLayout } from "../../layouts/MainLayout.js";

export function ActivityLogs() {
  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Audit trail</p>
      <h2>Activity Logs</h2>
    </section>
    <section class="panel filters">
      <input placeholder="Date">
      <input placeholder="User">
      <input placeholder="Action">
    </section>
    <section class="panel">
      ${logsTable(state.queue.logs)}
    </section>
  `);
}
