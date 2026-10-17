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

API tài khoản: `POST /auth/register`, `POST /auth/login`. Đơn hàng yêu cầu bearer token: `POST /orders`, `GET /orders/me`. Thanh toán mô phỏng dùng `POST /payments` cùng header `Idempotency-Key`. Quy tắc kiểm tra dữ liệu thanh toán (backend kiểm tra lại, không chỉ frontend): **Thẻ ngân hàng** cần 16–19 chữ số (`cardNumber`); **Ví điện tử** cần chọn ví (MoMo/ZaloPay/ShopeePay), số điện thoại di động Việt Nam 10 số và mã OTP 6 chữ số (OTP demo `123456` thành công, mã khác bị từ chối). Email đăng ký bị từ chối nếu gõ sai tên miền phổ biến (ví dụ `gmail.co`, `gmail.con`). Số lượng trong giỏ không thể vượt tồn kho của sản phẩm (tồn kho tính chung cho mọi size/topping).

Mã khuyến mãi demo: `BREW10` (giảm 10%, kiểm tra trước bằng `GET /promotions/validate?code=BREW10&subtotal=100000`). Giao dịch mô phỏng thất bại khi token là `decline` hoặc số thẻ test `4000 0000 0000 0002`; số thẻ `4242 4242 4242 4242` luôn thành công. `GET /auth/me` trả thông tin tài khoản kèm điểm thưởng (1 điểm cho mỗi 10.000đ sau khi đơn PAID).

Quên mật khẩu dùng `POST /auth/forgot-password` và `POST /auth/reset-password`. Token đặt lại được băm khi lưu, chỉ dùng một lần và hết hạn sau 15 phút. Ở môi trường phát triển, API trả token để demo; ở production cần cấu hình `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` để gửi liên kết qua email.

## Tài khoản nhân viên (barista) để demo

Đặt `STAFF_EMAIL` và `STAFF_PASSWORD` trong `.env` rồi khởi động lại backend; tài khoản STAFF được tạo tự động. Đăng nhập bằng `POST /auth/login` để lấy token, sau đó đổi trạng thái đơn bằng `PATCH /orders/:id/status` với body `{ "status": "PREPARING" }` (lần lượt `PREPARING` → `READY` → `COMPLETED`; `CANCELLED` sẽ hoàn lại tồn kho). Chuyển trạng thái sai sẽ bị từ chối với lỗi 400.

## 10 task

- T1: cấu trúc monorepo và khởi tạo ứng dụng.
- T2: danh sách/chi tiết sản phẩm và dữ liệu mẫu.
- T3: trang chủ, menu, điều hướng và trạng thái tải/lỗi.
- T4: chi tiết sản phẩm, chọn size/topping và tính giá.
- T5: giỏ hàng, cập nhật số lượng, xóa món và lưu trên trình duyệt.
- T6: tạo đơn, kiểm tra giá/tồn kho và gắn đơn với tài khoản.
- T7: đăng ký, đăng nhập bcrypt/JWT và bảo vệ API.
- T8: thanh toán mô phỏng cho QR/ví/thẻ ngân hàng, kết quả thành công/thất bại.
- T9: xác nhận đơn, lịch sử đơn và hướng dẫn chạy bằng Docker.
- T10: chuyển trạng thái đơn, idempotency thanh toán, giữ tồn kho đồng thời, mã giảm giá và điểm thưởng.

## Kiểm tra

Trong `backend`, chạy `npm test`, `npm run test:e2e` và `npm run build`. Trong `frontend`, chạy `npm run build`.

`test/business.e2e-spec.ts` là integration test chạy trên PostgreSQL thật để chứng minh Task 10: chặn chuyển trạng thái sai, Idempotency-Key (kể cả gửi đồng thời), không bán quá tồn kho khi đặt đồng thời, hoàn kho khi hủy đơn, khuyến mãi và điểm thưởng. Test dùng một database riêng (mặc định `brewlite_test` trên `localhost:5432`, user `postgres`) và **xóa sạch schema của database đó mỗi lần chạy**. Tạo database bằng `createdb brewlite_test` hoặc `docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`, rồi đặt `TEST_DB_PASSWORD` (và `TEST_DB_HOST`, `TEST_DB_PORT`, `TEST_DB_USER`, `TEST_DB_NAME` nếu khác mặc định).

## Ghi chú

Backend dùng TypeORM cho tài khoản/đơn/thanh toán và Prisma migrations cho bảng sản phẩm. Không đưa `.env`, mật khẩu thật hoặc JWT secret vào Git.
