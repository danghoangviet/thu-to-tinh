## 2024-06-28 - Custom Interactive Elements Missing Semantic Accessibility
**Learning:** Custom interactive elements (like the `div`-based envelopes in this app) lacked explicit ARIA roles, tabindex for keyboard focus, and keyboard event handlers. Screen readers would ignore them, and keyboard users could not interact with them.
**Action:** Always ensure that non-native interactive elements (like `div` or `span` acting as buttons) receive `role="button"`, `tabindex="0"`, and `keydown` event listeners for `Enter` and `Space` keys to match standard button accessibility.
