import { CreateDoctor } from "../pages/CreateDoctor/index.js";
import { CreateReceptionist } from "../pages/CreateReceptionist/index.js";
import { api } from "../services/api.js";
import { actor, loadClinicState, logout, refreshClinicState, setUser, state } from "../context/clinicState.js";
import { toast } from "../components/ui.js";
import { guarded } from "../layouts/MainLayout.js";
import { LandingPage } from "../pages/LandingPage/index.js";
import { QueueTracker } from "../pages/QueueTracker/index.js";
import { WaitingRoomDisplay } from "../pages/WaitingRoomDisplay/index.js";
import { Login } from "../pages/Login/index.js";
import { ReceptionistDashboard } from "../pages/ReceptionistDashboard/index.js";
import { DoctorDashboard } from "../pages/DoctorDashboard/index.js";
import { AdminDashboard } from "../pages/AdminDashboard/index.js";
import { ActivityLogs } from "../pages/ActivityLogs/index.js";
import { Reports } from "../pages/Reports/index.js";


const app = document.querySelector("#app");

const routes = {
  "/": LandingPage,
  "/track": QueueTracker,
  "/display": WaitingRoomDisplay,
  "/login": Login,
  "/receptionist": () => guarded("receptionist", ReceptionistDashboard),
  "/doctor": () => guarded("doctor", DoctorDashboard),
  "/admin": () => guarded("admin", AdminDashboard),
  "/admin/logs": () =>
guarded("admin", ActivityLogs),

"/admin/reports": () =>
guarded("admin", Reports),

"/admin/create-doctor": () =>
guarded("admin", CreateDoctor),

"/admin/create-receptionist": () =>
guarded("admin", CreateReceptionist)


};

function render() {
  const page = routes[location.pathname] || LandingPage;
  app.innerHTML = page();
}

function navigate(path) {
  history.pushState({}, "", path);
  render();
}

async function loginWith(email, password, expectedRole = null) {
  const user = await api.login({ email, password });
  if (expectedRole && user.role !== expectedRole) {
    throw new Error(`Use a ${expectedRole} account for this page.`);
  }
  setUser(user);
  await loadClinicState();

  if (user.role === "doctor") navigate("/doctor");
  else if (user.role === "admin") navigate("/admin");
  else navigate("/receptionist");
}

async function generateToken() {
  const form = document.querySelector("#registrationForm");
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const age = String(data.get("age") || "").trim();
  const phone = String(data.get("phone") || "").replace(/\D/g, "");
  const type = String(data.get("type") || "").trim();

  state.registrationDraft = { name, age, phone, type };

  if (!name || !age || phone.length < 10) {
    toast("Please enter name, age, and a valid phone number.");
    return;
  }

  const patient = await api.generateToken({ name, age, phone, type, actor: actor() });
  await refreshClinicState();
  state.generatedTokenModal = patient;
  render();
}

async function trackQueue() {
  const query = document.querySelector("#trackInput").value.trim();
  if (!query) {
    toast("Enter a token or phone number first.");
    return;
  }

  state.trackedQueue = await api.track(query);
  render();
}

async function callNext() {
  const patient = await api.callNext(actor());
  await refreshClinicState();
  toast(patient ? `Now serving ${patient.token}` : "No waiting tokens yet.");
  render();
}

async function updatePatientStatus(token, status) {
  await api.updateStatus(token, status, actor());
  await refreshClinicState();
  render();
}

async function createDoctor() {
  const payload = {
    name: document.querySelector("#doctorName")?.value.trim(),
    email: document.querySelector("#doctorEmail")?.value.trim(),
    password: document.querySelector("#doctorPassword")?.value
  };

  await api.createDoctor(payload);
  toast("Doctor account created.");
  navigate("/admin");
}

async function createReceptionist() {
  const payload = {
    name: document.querySelector("#receptionistName")?.value.trim(),
    email: document.querySelector("#receptionistEmail")?.value.trim(),
    password: document.querySelector("#receptionistPassword")?.value
  };

  await api.createReceptionist(payload);
  toast("Receptionist account created.");
  navigate("/admin");
}

async function handleAction(action, target) {
  try {
    if (action === "logout") {
      logout();
      state.trackedQueue = null;
      navigate("/");
    }
    if (action === "login") await loginWith(document.querySelector("#email").value, document.querySelector("#password").value);
    if (action === "role-login") await loginWith(document.querySelector("#email").value, document.querySelector("#password").value, target.dataset.role);
    if (action === "generate-token") await generateToken();
    if (action === "close-token-modal") {
      state.generatedTokenModal = null;
      render();
    }
    if (action === "register-another") {
      state.generatedTokenModal = null;
      state.registrationDraft = { name: "", age: "", phone: "", type: "General" };
      render();
    }
    if (action === "track-generated") {
      state.trackedQueue = await api.track(state.generatedTokenModal.token);
      state.generatedTokenModal = null;
      navigate("/track");
    }
    if (action === "track") await trackQueue();
    if (action === "call-next") await callNext();
    if (action === "skip") await updatePatientStatus(target.dataset.token, "skipped");
    if (action === "recall") await updatePatientStatus(target.dataset.token, "called");
    if (action === "start-consultation") {
      const token = state.queue.currentPatient?.token;
      if (!token) toast("Call a patient before starting consultation.");
      else {
        await updatePatientStatus(token, "in_consultation");
        toast("Consultation started.");
      }
    }
    if (action === "end-consultation") {
      const token = state.queue.currentPatient?.token;
      if (!token) toast("No active consultation to end.");
      else {
        await updatePatientStatus(token, "completed");
        toast("Consultation completed.");
      }
    }
    if (action === "create-doctor") await createDoctor();
    if (action === "create-receptionist") await createReceptionist();
    if (action === "export-pdf") api.exportPDF();
    if (action === "export-csv") api.exportCSV();
  } catch (error) {
    toast(error.message);
  }
}

export function initRouter() {
  document.addEventListener("click", async (event) => {
    const link = event.target.closest("[data-link]");
    const action = event.target.closest("[data-action]");

    if (link) navigate(link.dataset.link);
    if (action) await handleAction(action.dataset.action, action);
  });

  document.addEventListener("submit", (event) => {
    if (event.target.closest("#registrationForm")) {
      event.preventDefault();
    }
  });

  document.addEventListener("input", (event) => {
    const form = event.target.closest("#registrationForm");
    if (!form) return;

    const data = new FormData(form);
    state.registrationDraft = {
      name: String(data.get("name") || ""),
      age: String(data.get("age") || ""),
      phone: String(data.get("phone") || ""),
      type: String(data.get("type") || "General")
    };
  });

  document.addEventListener("change", (event) => {
    const form = event.target.closest("#registrationForm");
    if (!form) return;

    const data = new FormData(form);
    state.registrationDraft = {
      name: String(data.get("name") || ""),
      age: String(data.get("age") || ""),
      phone: String(data.get("phone") || ""),
      type: String(data.get("type") || "General")
    };
  });

  window.addEventListener("popstate", render);

  render();
}
