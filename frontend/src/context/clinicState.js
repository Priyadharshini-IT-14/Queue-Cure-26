import { api } from "../services/api.js";

export const state = {
  user: JSON.parse(localStorage.getItem("qc-user") || "null"),
  queue: {
    patients: [],
    currentPatient: null,
    waitingPatients: [],
    logs: [],
    nextTokenPreview: "A001"
  },
  analytics: null,
  trackedQueue: null,
  registrationDraft: {
    name: "",
    age: "",
    phone: "",
    type: "General"
  },
  generatedTokenModal: null
};

export async function loadClinicState() {
  state.queue = await api.getQueue();
  state.analytics = await api.analytics();
}

export async function refreshClinicState() {
  await loadClinicState();
}

export function setUser(user) {
  state.user = user;
  localStorage.setItem("qc-user", JSON.stringify(user));
}

export function logout() {
  state.user = null;
  localStorage.removeItem("qc-user");
}

export function actor() {
  return state.user ? { name: state.user.name, role: state.user.role, token: state.user.token } : { name: "System", role: "system" };
}
