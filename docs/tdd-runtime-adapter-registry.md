
# 🧪 TDD PACK — Runtime Adapter Registry

**Feature:** Runtime Adapter Registry
**Subsystem:** Runtime Engine
**Spec:** `spec-runtime-adapter-registry.md`
**UX Clauses:** UX-18, UX-13
**Risk Class:** Critical
**Gate:** Hard (Editor Safety)

---

## Layer 1 — Mechanical (Registry Correctness)

### **M-REG-01 — Registry Requires Explicit Registration**

* **Given:** An adapter definition exists but is not registered
* **When:** Preview Mode is entered
* **Then:** Adapter `init()` is never called

---

### **M-REG-02 — Duplicate Adapter IDs Rejected**

* **Given:** Two adapters with the same `id`
* **When:** Registry initializes
* **Then:** Registry throws and refuses startup

---

### **M-REG-03 — Registry Is Immutable**

* **Given:** Registry initialized
* **When:** Code attempts to add/remove adapters
* **Then:** Operation throws or no-ops with error

---

### **M-REG-04 — Domain Declaration Required**

* **Given:** Adapter without `domains.preview`
* **When:** Preview Mode enabled
* **Then:** Adapter is skipped and warning logged

---

## Layer 2 — Behavioral (User Reality)

### **BT-REG-01 — Preview Mode Activation**

* **Action:** Toggle Preview Mode ON
* **Result:** Registry calls `init()` on eligible adapters only

---

### **BT-REG-02 — Editor Safety**

* **Action:** Interact with editor canvas
* **Result:** No adapter lifecycle methods are invoked

---

### **BT-REG-03 — Teardown on Preview Exit**

* **Action:** Exit Preview Mode
* **Result:** All active adapters receive `teardown()`

---

### **BT-REG-04 — Idempotent Init**

* **Action:** Enter Preview Mode twice
* **Result:** Adapter listeners are not duplicated

---

## Layer 3 — Negative / Safety Tests

### **NEG-REG-01 — Direct Adapter Invocation Forbidden**

* **Action:** Call `adapter.init()` directly
* **Result:** Throws or logs critical error

---

### **NEG-REG-02 — AutoInit Forbidden**

* **Action:** Adapter attempts global auto-init
* **Result:** Registry detects violation → logs defect

---

### **NEG-REG-03 — Adapter Crash Isolation**

* **Action:** Adapter throws during `init()`
* **Result:** Other adapters still initialize; editor remains stable

---

## Layer 4 — UX Contract Proof

### **UX-REG-01 — Editor Never Executes Runtime**

* **Verification:** Spy confirms zero adapter calls in Design/Structure/KitchenSink

### **UX-REG-02 — Full Observability**

* **Verification:** All lifecycle events appear in Runtime Workbench log

---

✅ **Exit Condition:**
All `REQ-REG-*` requirements mapped to ≥1 test
At least one negative + teardown test present
Registry cannot be bypassed
