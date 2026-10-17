/** Email phải có phần tên miền kết thúc bằng ít nhất 2 chữ cái (a@b.c bị từ chối). */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

const DOMAIN_TYPOS: Record<string, string> = {
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.comm": "gmail.com",
  "gmail.vn": "gmail.com",
  "gmai.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlook.co": "outlook.com",
  "outlook.con": "outlook.com",
  "icloud.co": "icloud.com",
  "icloud.con": "icloud.com",
};

/** Gợi ý địa chỉ đúng nếu tên miền của các nhà cung cấp phổ biến bị gõ sai (ví dụ gmail.co). */
export function suggestEmailFix(email: string): string | null {
  const value = email.trim().toLowerCase();
  const at = value.lastIndexOf("@");
  if (at < 1) return null;
  const fixed = DOMAIN_TYPOS[value.slice(at + 1)];
  return fixed ? `${value.slice(0, at)}@${fixed}` : null;
}
