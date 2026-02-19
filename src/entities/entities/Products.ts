import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./CartItem";
import { PromotionProducts } from "./PromotionProducts";
import { UserViews } from "./UserViews";

@Index("products_pkey", ["idProduct"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_product" })
  idProduct: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("numeric", { name: "price", precision: 15, scale: 2 })
  price: string;

  @Column("character varying", { name: "brand", nullable: true, length: 100 })
  brand: string | null;

  @Column("character varying", {
    name: "category",
    nullable: true,
    length: 100,
  })
  category: string | null;

  @Column("character varying", { name: "purpose", nullable: true, length: 100 })
  purpose: string | null;

  @Column("integer", {
    name: "stock_quantity",
    nullable: true,
    default: () => "0",
  })
  stockQuantity: number | null;

  @OneToMany(() => CartItem, (cartItem) => cartItem.idProduct)
  cartItems: CartItem[];

  @OneToMany(
    () => PromotionProducts,
    (promotionProducts) => promotionProducts.idProduct
  )
  promotionProducts: PromotionProducts[];

  @OneToMany(() => UserViews, (userViews) => userViews.idProduct2)
  userViews: UserViews[];
}
