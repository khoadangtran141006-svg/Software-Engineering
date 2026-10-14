# BrewLite

BrewLite là ứng dụng đặt đồ uống cho đồ án môn Công Nghệ Phần Mềm. Luồng chính: xem menu → chọn món → giỏ hàng → đăng nhập → tạo đơn → thanh toán mô phỏng → xác nhận → lịch sử đơn hàng.

## Chạy bằng Docker Compose

1. Sao chép `.env.example` thành `.env` ở thư mục gốc. Đổi `DB_PASSWORD` và `JWT_SECRET` thành giá trị riêng.
2. Chạy `docker compose up --build`.
3. Mở giao diện tại `http://localhost:3000`; API tại `http://localhost:3001`.

PostgreSQL được lưu trong volume `brewlite-data`. Backend tự áp dụng migration và nạp/cập nhật dữ liệu sản phẩm mẫu khi khởi động.

## Chạy để phát triển

Yêu cầu Node.js 22+ và PostgreSQL 16+.

1. Tạo database `brewlite_db`; sao chép `backend/.env.example` thành `backend/.env`, điền thông tin kết nối và đặt `JWT_SECRET` đủ dài.
2. Trong `backend`, chạy `npm ci`, `npm run db:migrate`, `npm run db:seed`, rồi `npm run start:dev`.
3. Trong `frontend`, tạo `.env.local` với `NEXT_PUBLIC_API_URL=http://localhost:3001`, chạy `npm ci`, rồi `npm run dev`.

API tài khoản: `POST /auth/register`, `POST /auth/login`. Đơn hàng yêu cầu bearer token: `POST /orders`, `GET /orders/me`. Thanh toán mô phỏng dùng `POST /payments` cùng header `Idempotency-Key`. Mã khuyến mãi demo: `BREW10`; token thanh toán `decline` mô phỏng giao dịch thất bại.

Quên mật khẩu dùng `POST /auth/forgot-password` và `POST /auth/reset-password`. Token đặt lại được băm khi lưu, chỉ dùng một lần và hết hạn sau 15 phút. Ở môi trường phát triển, API trả token để demo; ở production cần cấu hình `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` để gửi liên kết qua email.

## 10 task

- T1: cấu trúc monorepo và khởi tạo ứng dụng.
- T2: danh sách/chi tiết sản phẩm và dữ liệu mẫu.
- T3: trang chủ, menu, điều hướng và trạng thái tải/lỗi.
- T4: chi tiết sản phẩm, chọn size/topping và tính giá.
- T5: giỏ hàng, cập nhật số lượng, xóa món và lưu trên trình duyệt.
- T6: tạo đơn, kiểm tra giá/tồn kho và gắn đơn với tài khoản.
- T7: đăng ký, đăng nhập bcrypt/JWT và bảo vệ API.
- T8: thanh toán mô phỏng cho QR/ví, kết quả thành công/thất bại.
- T9: xác nhận đơn, lịch sử đơn và hướng dẫn chạy bằng Docker.
- T10: chuyển trạng thái đơn, idempotency thanh toán, giữ tồn kho đồng thời, mã giảm giá và điểm thưởng.

## Kiểm tra

Trong `backend`, chạy `npm test`, `npm run test:e2e` và `npm run build`. Trong `frontend`, chạy `npm run build`.

## Ghi chú

Backend dùng TypeORM cho tài khoản/đơn/thanh toán và Prisma migrations cho bảng sản phẩm. Không đưa `.env`, mật khẩu thật hoặc JWT secret vào Git.
