export enum PaymentStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAIL = "fail"
}

export interface Billet {
    uuid?: string,
    billet: string,
    amount: number,
    paymentStatus: PaymentStatus,
    transactionId: string,
    createdDate: Date,
    updatedDate: Date
}

export interface BilletRequestModel {
    billet: string,
    amount: number,
}

export interface BilletResponseModel extends Omit<Billet, "billet"> {}