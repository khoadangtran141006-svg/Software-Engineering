import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { OrdersService } from './orders.service.js';

/**
 * Định kỳ hủy các đơn chưa thanh toán quá hạn để trả lại tồn kho đã giữ chỗ.
 * Cấu hình bằng biến môi trường:
 *   ORDER_EXPIRY_MINUTES (mặc định 15; đặt 0 để tắt)
 *   ORDER_EXPIRY_INTERVAL_SECONDS (mặc định 60)
 */
@Injectable()
export class OrderExpiryService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrderExpiryService.name);
  private timer?: NodeJS.Timeout;
  private running = false;

  constructor(private readonly orders: OrdersService) {}

  onModuleInit() {
    const minutes = Number(process.env.ORDER_EXPIRY_MINUTES ?? 15);
    if (!Number.isFinite(minutes) || minutes <= 0) return;
    const intervalMs = Math.max(5, Number(process.env.ORDER_EXPIRY_INTERVAL_SECONDS ?? 60)) * 1000;
    this.timer = setInterval(() => void this.sweep(minutes * 60_000), intervalMs);
    this.timer.unref?.();
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  private async sweep(maxAgeMs: number) {
    if (this.running) return;
    this.running = true;
    try {
      const expired = await this.orders.expireStaleOrders(maxAgeMs);
      if (expired > 0) this.logger.log(`Đã hủy ${expired} đơn chưa thanh toán quá hạn và hoàn kho`);
    } catch (error) {
      this.logger.error('Không thể dọn đơn quá hạn', error instanceof Error ? error.stack : String(error));
    } finally {
      this.running = false;
    }
  }
}
