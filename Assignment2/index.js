function reverseString(str) {
  return [...String(str)].reverse().join('');
}

function isNumericPalindrome(input) {
  const cleaned = String(input || '').replace(/\D+/g, '');
  if (cleaned.length === 0) return { valid: false, reason: 'no digits', cleaned };

  let i = 0, j = cleaned.length - 1;
  while (i < j) {
    if (cleaned[i] !== cleaned[j]) return { valid: true, palindrome: false, cleaned };
    i++; j--;
  }
  return { valid: true, palindrome: true, cleaned };
}

function calculateTip(subtotal, tipPercent) {
  const s = Number(subtotal);
  const p = Number(tipPercent);
  if (!isFinite(s) || s < 0) return { ok: false, reason: 'Invalid subtotal' };
  if (!isFinite(p) || p < 0) return { ok: false, reason: 'Invalid tip percentage' };

  const tipAmount = Math.round(s * (p / 100) * 100) / 100;
  const total = Math.round((s + tipAmount) * 100) / 100;
  return { ok: true, subtotal: Math.round(s * 100) / 100, tipPercent: p, tipAmount, total };
}

// Helper to safely get element
function $id(id) {
  return document.getElementById(id) || null;
}

// Wire up UI only if elements exist (prevents errors if script runs early)
const reverseForm = $id('reverse-form');
const reverseInput = $id('reverse-input');
const reverseOutput = $id('reverse-output');
const reverseClearBtn = $id('reverse-clear');

if (reverseForm && reverseInput && reverseOutput) {
  reverseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = reverseInput.value || '';
    if (value.trim() === '') {
      reverseOutput.textContent = 'Please enter a string.';
      return;
    }
    reverseOutput.textContent = reverseString(value);
  });
}
if (reverseClearBtn && reverseInput && reverseOutput) {
  reverseClearBtn.addEventListener('click', () => {
    reverseInput.value = '';
    reverseOutput.textContent = '';
  });
}

const palForm = $id('palindrome-form');
const palInput = $id('palindrome-input');
const palOutput = $id('palindrome-output');
const palClearBtn = $id('palindrome-clear');

if (palForm && palInput && palOutput) {
  palForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = isNumericPalindrome(palInput.value);
    if (!res.valid) {
      palOutput.textContent = 'Please enter at least one digit.';
      return;
    }
    if (res.palindrome) {
      palOutput.textContent = `Yes — \"${res.cleaned}\" is a palindrome.`;
    } else {
      palOutput.textContent = `No — \"${res.cleaned}\" is not a palindrome.`;
    }
  });
}
if (palClearBtn && palInput && palOutput) {
  palClearBtn.addEventListener('click', () => {
    palInput.value = '';
    palOutput.textContent = '';
  });
}

const tipForm = $id('tip-form');
const subtotalInput = $id('subtotal-input');
const tipPercentInput = $id('tip-percent-input');
const tipOutput = $id('tip-output');
const tipClearBtn = $id('tip-clear');

if (tipForm && subtotalInput && tipPercentInput && tipOutput) {
  tipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = calculateTip(subtotalInput.value, tipPercentInput.value);
    if (!res.ok) {
      tipOutput.textContent = `Error: ${res.reason}`;
      return;
    }
    tipOutput.innerHTML =
      `Subtotal: $${res.subtotal.toFixed(2)}<br>` +
      `Tip (${res.tipPercent}%): $${res.tipAmount.toFixed(2)}<br>` +
      `<strong>Total: $${res.total.toFixed(2)}</strong>`;
  });
}
if (tipClearBtn && subtotalInput && tipPercentInput && tipOutput) {
  tipClearBtn.addEventListener('click', () => {
    subtotalInput.value = '';
    tipPercentInput.value = '';
    tipOutput.textContent = '';
  });
}
