/**
 * Các tên miền email phổ biến thường bị gõ sai (ví dụ "gmail.co" thay vì "gmail.com").
 * Lưu ý: ".co" là một tên miền hợp lệ (Colombia) nên không thể loại bằng quy tắc định dạng chung;
 * ta chỉ chặn các lỗi gõ sai trên những nhà cung cấp email nổi tiếng.
 */
const DOMAIN_TYPOS: Record<string, string> = {
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.comm': 'gmail.com',
  'gmail.vn': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yahoo.co': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'hotmail.co': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'outlook.co': 'outlook.com',
  'outlook.con': 'outlook.com',
  'icloud.co': 'icloud.com',
  'icloud.con': 'icloud.com',
};

/** Trả về địa chỉ email gợi ý nếu tên miền bị gõ sai, ngược lại trả về null. */
export function suggestEmailFix(email: string): string | null {
  const value = email.trim().toLowerCase();
  const at = value.lastIndexOf('@');
  if (at < 1) return null;
  const fixed = DOMAIN_TYPOS[value.slice(at + 1)];
  return fixed ? `${value.slice(0, at)}@${fixed}` : null;
}
