function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * 10 цифр после +7: ввод «900 123 45 67» (поддержка вставки с +7 / 8).
 */
export function formatRuPhoneLocal(value: string): string {
  let d = digitsOnly(value);
  if (d.startsWith('8') && d.length > 1) {
    d = '7' + d.slice(1);
  }
  if (d.startsWith('7')) {
    d = d.slice(1);
  }
  d = d.slice(0, 10);
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);
  let out = '';
  if (p1) out = p1;
  if (p2) out += ` ${p2}`;
  if (p3) out += ` ${p3}`;
  if (p4) out += ` ${p4}`;
  return out.trim();
}

/** Полный номер E.164 для отправки в CRM, например +79001234567 */
export function toFullRuPhone(localFormatted: string): string {
  let d = digitsOnly(localFormatted);
  if (d.startsWith('8') && d.length > 1) {
    d = '7' + d.slice(1);
  }
  if (d.length === 11 && d.startsWith('7')) {
    d = d.slice(1);
  }
  d = d.slice(0, 10);
  if (!d) return '';
  return `+7${d}`;
}
