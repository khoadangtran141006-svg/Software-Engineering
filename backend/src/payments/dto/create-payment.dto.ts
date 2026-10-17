import { IsIn, IsInt, IsNotEmpty, IsString, Matches, Min, ValidateIf } from 'class-validator';

export const PAYMENT_METHODS = ['QR Code', 'Ví điện tử', 'Thẻ ngân hàng'] as const;
export const WALLET_PROVIDERS = ['MoMo', 'ZaloPay', 'ShopeePay'] as const;

/** Số điện thoại di động Việt Nam: 10 số, đầu 03/05/07/08/09. */
export const VN_MOBILE_REGEX = /^0(3|5|7|8|9)\d{8}$/;

const isCard = (o: CreatePaymentDto) => o.method === 'Thẻ ngân hàng';
const isWallet = (o: CreatePaymentDto) => o.method === 'Ví điện tử';
const isQr = (o: CreatePaymentDto) => o.method === 'QR Code';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  orderId!: number;

  @IsString()
  @IsIn([...PAYMENT_METHODS])
  method!: string;

  /** QR Code: token mô phỏng. */
  @ValidateIf(isQr)
  @IsString()
  @IsNotEmpty()
  token?: string;

  /** Thẻ ngân hàng: 16–19 chữ số. */
  @ValidateIf(isCard)
  @IsString()
  @Matches(/^\d{16,19}$/, { message: 'Số thẻ phải gồm 16–19 chữ số' })
  cardNumber?: string;

  /** Ví điện tử: ví, số điện thoại và mã OTP xác nhận. */
  @ValidateIf(isWallet)
  @IsIn([...WALLET_PROVIDERS], { message: 'Ví điện tử không được hỗ trợ' })
  walletProvider?: string;

  @ValidateIf(isWallet)
  @Matches(VN_MOBILE_REGEX, { message: 'Số điện thoại ví không hợp lệ' })
  walletPhone?: string;

  @ValidateIf(isWallet)
  @Matches(/^\d{6}$/, { message: 'Mã OTP phải gồm 6 chữ số' })
  otp?: string;
}
