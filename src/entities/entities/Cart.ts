import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { CartItem } from "./CartItem";

@Index("cart_pkey", ["idCart"], { unique: true })
@Index("cart_id_user_key", ["idUser"], { unique: true })
@Entity("cart", { schema: "public" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_cart" })
  idCart: number;

  @Column("integer", { name: "id_user", nullable: true, unique: true })
  idUser: number | null;

  @OneToOne(() => Users, (users) => users.cart, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: Users;

  @OneToMany(() => CartItem, (cartItem) => cartItem.idCart)
  cartItems: CartItem[];
}
