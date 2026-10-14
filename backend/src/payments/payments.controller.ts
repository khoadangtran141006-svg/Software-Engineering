import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentsService } from './payments.service.js';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post()
  pay(@Body() body: CreatePaymentDto, @Headers('idempotency-key') key: string | undefined, @Req() request: Request & { user: { id: number } }) {
    return this.payments.pay(body, key ?? '', request.user.id);
  }
}
