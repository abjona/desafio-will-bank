export enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAIL = "fail"
}

export interface BilletUpdated {
    transactiondId: string,
    paymentStatus: PaymentStatus,
    updatedDate: Date;
}