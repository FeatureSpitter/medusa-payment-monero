import { MoneroPayment } from "../models/monero-payment";
import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { flatten, groupBy, map, merge } from "lodash";

@EntityRepository(MoneroPayment)
export class MoneroPaymentRepository extends Repository<MoneroPayment> {
    public async findByCartId(cartId: string): Promise<MoneroPayment> {
        return await this.findOne({
            where: {
                cart_id: cartId,
            },
        }
        );
    }
}