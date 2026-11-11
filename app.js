const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== Helpers =====
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch {}
    document.body.removeChild(ta);
    return ok;
  }
}

// ===== Phone logic =====
function normalizePhone(raw) {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length >= 13) {
    digits = "0" + digits.slice(3);
  } else if (digits.length === 10 && !digits.startsWith("0")) {
    digits = "0" + digits;
  }
  return digits;
}

function detectNetwork(national) {
  if (national.length !== 11) return null;
  return NETWORK_PREFIXES[national.slice(0, 4)] || null;
}

function renderPhone() {
  const raw = $("#phone-input").value;
  const out = $("#phone-result");
  if (!raw.trim()) { out.innerHTML = ""; return; }

  const national = normalizePhone(raw);
  const valid = /^0[789]\d{9}$/.test(national);

  if (!valid) {
    out.innerHTML = `
      <div class="card">
        <div class="bad">❌ Not a valid Nigerian mobile number.</div>
        <div class="muted">Expected 11 digits starting with 070, 080, 081, 090, or 091.</div>
      </div>`;
    return;
  }

  const network = detectNetwork(national);
  const e164 = "+234" + national.slice(1);
  const networkBadge = network
    ? `<span class="badge net-${network.toLowerCase()}">${escapeHtml(network)}</span>`
    : `<span class="badge net-unknown">Unknown / Other</span>`;

  out.innerHTML = `
    <div class="card">
      <div class="row"><span class="label">Status</span><span class="ok">✅ Valid Nigerian mobile</span></div>
      <div class="row"><span class="label">Network</span>${networkBadge}</div>
      <div class="row"><span class="label">Prefix</span><code>${national.slice(0, 4)}</code></div>
      <div class="row"><span class="label">National</span><code>${national}</code></div>
      <div class="row"><span class="label">E.164</span><code>${e164}</code></div>
      <div class="actions">
        <a class="btn" href="tel:${e164}">📞 Call</a>
        <a class="btn" href="https://wa.me/${e164.replace("+", "")}" target="_blank" rel="noopener">💬 WhatsApp</a>
        <button class="btn" data-copy="${e164}" type="button">📋 Copy</button>
      </div>
    </div>`;

  out.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await copyText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = "✅ Copied";
      setTimeout(() => (btn.textContent = old), 1200);
    });
  });
}

// ===== BVN / NIN =====
function renderIdNumber(inputSel, outSel, label) {
  const val = $(inputSel).value.replace(/\D/g, "");
  const out = $(outSel);
  if (!val) { out.innerHTML = ""; return; }

  if (val.length !== 11) {
    out.innerHTML = `
      <div class="card">
        <div class="bad">❌ ${label} must be exactly 11 digits.</div>
        <div class="muted">You entered ${val.length} digit${val.length === 1 ? "" : "s"}.</div>
      </div>`;
    return;
  }

  out.innerHTML = `
    <div class="card">
      <div class="row"><span class="label">Format</span><span class="ok">✅ Valid</span></div>
      <div class="row"><span class="label">Length</span><code>11 digits</code></div>
      <div class="row"><span class="label">Value</span><code>${escapeHtml(val)}</code></div>
      <p class="muted small" style="margin: 12px 0 0;">
        We only check the <em>format</em> — we cannot verify that this number belongs to a real person. That requires the issuing authority.
      </p>
    </div>`;
}

// ===== Banks =====
function renderBanks(query = "") {
  const q = query.trim().toLowerCase();
  const list = q
    ? BANKS.filter(b => b.name.toLowerCase().includes(q) || b.code.includes(q))
    : BANKS;

  const container = $("#bank-list");
  if (!list.length) {
    container.innerHTML = `<div class="card muted">No banks match "<strong>${escapeHtml(q)}</strong>".</div>`;
    return;
  }

  container.innerHTML = list.map(b => `
    <div class="bank-row">
      <div>
        <strong>${escapeHtml(b.name)}</strong>
        <div class="muted small">${escapeHtml(b.type)}</div>
      </div>
      <code>${escapeHtml(b.code)}</code>
    </div>
  `).join("");
}

// ===== Tabs =====
function initTabs() {
  const tabs = $$(".tab");
  const panels = $$(".panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.id === target));
    });
  });
}

// ===== Boot =====
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderBanks();

  $("#phone-input").addEventListener("input", renderPhone);
  $("#phone-clear").addEventListener("click", () => {
    $("#phone-input").value = "";
    renderPhone();
    $("#phone-input").focus();
  });

  $("#bvn-input").addEventListener("input", () =>
    renderIdNumber("#bvn-input", "#bvn-result", "BVN"));
  $("#nin-input").addEventListener("input", () =>
    renderIdNumber("#nin-input", "#nin-result", "NIN"));

  $("#bank-search").addEventListener("input", (e) => renderBanks(e.target.value));
});
