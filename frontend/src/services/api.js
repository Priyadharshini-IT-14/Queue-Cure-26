async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
}

export const api = {
  getQueue: () => request("/api/queue"),
  track: (query) => request(`/api/queue/track?q=${encodeURIComponent(query)}`),
  generateToken: (payload) => request("/api/queue/tokens", { method: "POST", body: JSON.stringify(payload) }),
  callNext: (actor) => request("/api/queue/call-next", { method: "POST", body: JSON.stringify({ actor }) }),
  updateStatus: (token, status, actor) => request(`/api/queue/${token}/status`, { method: "PATCH", body: JSON.stringify({ status, actor }) }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  analytics: () => request("/api/analytics"),
  logs: () => request("/api/logs"),
  createDoctor:(payload)=>
request(
"/api/admin/doctor",
{
method:"POST",
body:JSON.stringify(payload)
}
),


createReceptionist:(payload)=>
request(
"/api/admin/receptionist",
{
method:"POST",
body:JSON.stringify(payload)
}
),


exportCSV:()=>{

window.open(
"/api/admin/reports/csv",
"_blank"
);

},


exportPDF:()=>{

window.open(
"/api/admin/reports/pdf",
"_blank"
);

}
};
