import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Promotions } from "./Promotions";

@Index("promotion_products_pkey", ["idPromoProduct"], { unique: true })
@Entity("promotion_products", { schema: "public" })
export class PromotionProducts {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_promo_product" })
  idPromoProduct: number;

  @ManyToOne(() => Products, (products) => products.promotionProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;

  @ManyToOne(() => Promotions, (promotions) => promotions.promotionProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_promo", referencedColumnName: "idPromo" }])
  idPromo: Promotions;
}
