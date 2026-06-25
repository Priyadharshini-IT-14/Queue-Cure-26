import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { statCards } from "../../components/ui.js";
import { tokenText } from "../../utils/format.js";

export function WaitingRoomDisplay() {
  const current = state.queue.currentPatient;
  return mainLayout(`
    <section class="display-grid">
      <article class="now-serving">
        <span>NOW SERVING</span>
        <strong class="${current ? "" : "empty-token"}">${tokenText(current)}</strong>
      </article>
      <article class="panel">
        <h3>Upcoming Tokens</h3>
        <div class="token-stack">
          ${state.queue.waitingPatients.length ? state.queue.waitingPatients.slice(0, 3).map((patient) => `<span>${patient.token}</span>`).join("") : `<span>No tokens</span>`}
        </div>
      </article>
    </section>
    ${statCards([
      { label: "Patients Waiting", value: state.queue.waitingPatients.length, note: "Live queue length" },
      { label: "Average Wait Time", value: state.analytics?.averageWait || "0m", note: "Rolling today" }
    ])}
    <section class="panel quick-search">
      <input placeholder="Track My Token">
      <button class="solid" data-link="/track">Search</button>
    </section>
  `, true);
}
