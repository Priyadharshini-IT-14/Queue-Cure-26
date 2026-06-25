import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { statCards } from "../../components/ui.js";

export function Reports() {
  const analytics = state.analytics || {};
  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Daily summary</p>
      <h2>Reports</h2>
    </section>
    ${statCards([
      { label: "Patients Served", value: analytics.patientsServed || 0 },
      { label: "Average Wait", value: analytics.averageWait || "0m" },
      { label: "Average Consultation", value: analytics.averageConsultation || "0m" },
      { label: "Peak Hour", value: analytics.peakHour || "-" }
    ])}
    <section class="panel export-panel">
      <h3>Export</h3>
      <button class="solid" data-action="export-pdf">PDF</button>
      <button class="ghost" data-action="export-csv">CSV</button>
    </section>
  `);
}
