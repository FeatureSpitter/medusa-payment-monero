import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus, TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm";
import monerojs from "monero-javascript";
import { MoneroPayment } from "../models/monero-payment";
import { MoneroPaymentRepository } from "../repositories/monero-payment";


class MoneroPaymentService extends AbstractPaymentService {
    protected manager_: EntityManager;
    protected transactionManager_: EntityManager;

    private moneroPaymentRepository: MoneroPaymentRepository;

    private daemonProviderUrl: string;
    private daemonProviderUser: string;
    private daemonProviderPassword: string;
    private merchantPaymentAddress: string;

    private daemon: any = null;
    private wallet: any = null;

    constructor(
        {
            moneroPaymentRepository
        },
        options
    ) {
        super(
            {
                moneroPaymentRepository
            },
            options
        );

        this.moneroPaymentRepository = moneroPaymentRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.merchantPaymentAddress = options.merchantPaymentAddress;
    }

    private async connect() {
        if (this.daemon == null) {
            // connect to daemon
            this.daemon = await monerojs.connectToDaemonRpc(
                this.daemonProviderUrl,
                this.daemonProviderUser,
                this.daemonProviderPassword
            );

            // https://github.com/monero-ecosystem/monero-javascript/blob/04a1df09247ac72eae7b5597dbfd616e24953227/docs/developer_guide/getting_started_p1.md
            this.wallet = await monerojs.createWalletKeys({
                networkType: "mainnet", // TODO: Allow test mode
            });
        }
    }

    async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
        await this.connect();

        const moneroPayment = new MoneroPayment();
        moneroPayment.cart_id = paymentSession.cart_id;
        moneroPayment.total_amount = paymentSession.cart.total!;
        moneroPayment.user_email = paymentSession.cart.email;
        moneroPayment.virtual_wallet_addr = this.wallet.getAddress(0, 0);
        moneroPayment.virtual_wallet_pkey = this.wallet.getPrivateSpendKey();
        moneroPayment.virtual_wallet_vkey = this.wallet.getPrivateViewKey();
        await this.moneroPaymentRepository.save(moneroPayment);

        return {
            "paymentAddress": moneroPayment.virtual_wallet_addr
        };
    }
    async updatePaymentData(paymentSessionData: Data, data: Data): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async createPayment(cart: Cart): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async retrievePayment(paymentData: Data): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async updatePayment(paymentSessionData: Data, cart: Cart): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async authorizePayment(paymentSession: PaymentSession, context: Data): Promise<{ data: Data; status: PaymentSessionStatus; }> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async capturePayment(payment: Payment): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async refundPayment(payment: Payment, refundAmount: number): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async cancelPayment(payment: Payment): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async deletePayment(paymentSession: PaymentSession): Promise<void> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async getStatus(data: Data): Promise<PaymentSessionStatus> {
        await this.connect();

        throw new Error("Method not implemented.");
    }

}

export default MoneroPaymentService;