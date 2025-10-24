  function reverseString(str) {
    return [...String(str)].reverse().join('');
  }

  function isNumericPalindrome(input) {
    // Ensure input is treated as a string and remove any non-digit characters
    const cleaned = String(input).replace(/\D+/g, '');
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


  // Reverse form
  const reverseForm = document.getElementById('reverse-form');
  const reverseInput = document.getElementById('reverse-input');
  const reverseOutput = document.getElementById('reverse-output');
  const reverseClearBtn = document.getElementById('reverse-clear');

  reverseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = reverseInput.value;
    if (value.trim() === '') {
      reverseOutput.textContent = 'Please enter a string.';
      return;
    }
    reverseOutput.textContent = reverseString(value);
  });

  reverseClearBtn.addEventListener('click', () => {
    reverseInput.value = '';
    reverseOutput.textContent = '';
  });

  // Palindrome form
  const palForm = document.getElementById('palindrome-form');
  const palInput = document.getElementById('palindrome-input');
  const palOutput = document.getElementById('palindrome-output');
  const palClearBtn = document.getElementById('palindrome-clear');

  palForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const res = isNumericPalindrome(palInput.value);
    if (!res.valid) {
      palOutput.textContent = 'Please enter at least one digit.';
      return;
    }
    if (res.palindrome) {
      palOutput.textContent = `Yes — "${res.cleaned}" is a palindrome.`;
    } else {
      palOutput.textContent = `No — "${res.cleaned}" is not a palindrome.`;
    }
  });

  palClearBtn.addEventListener('click', () => {
    palInput.value = '';
    palOutput.textContent = '';
  });

  // Tip form
  const tipForm = document.getElementById('tip-form');
  const subtotalInput = document.getElementById('subtotal-input');
  const tipPercentInput = document.getElementById('tip-percent-input');
  const tipOutput = document.getElementById('tip-output');
  const tipClearBtn = document.getElementById('tip-clear');

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

  tipClearBtn.addEventListener('click', () => {
    subtotalInput.value = '';
    tipPercentInput.value = '';
    tipOutput.textContent = '';
  });

