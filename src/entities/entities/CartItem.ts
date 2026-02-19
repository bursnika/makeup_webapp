import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Products } from "./Products";

@Index("cart_item_pkey", ["idItem"], { unique: true })
@Entity("cart_item", { schema: "public" })
export class CartItem {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_item" })
  idItem: number;

  @Column("integer", { name: "quantity", nullable: true, default: () => "1" })
  quantity: number | null;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_cart", referencedColumnName: "idCart" }])
  idCart: Cart;

  @ManyToOne(() => Products, (products) => products.cartItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct: Products;
}
