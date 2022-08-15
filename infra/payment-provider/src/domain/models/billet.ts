export enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAIL = "fail"
}

export interface BilletUpdated {
    transactionId: string,
    paymentStatus: PaymentStatus,
    updatedDate: Date;
}