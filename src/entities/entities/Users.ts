import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Orders } from "./Orders";
import { UserViews } from "./UserViews";

@Index("users_pkey", ["idUser"], { unique: true })
@Index("users_login_email_key", ["loginEmail"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_user" })
  idUser: number;

  @Column("character varying", {
    name: "login_email",
    unique: true,
    length: 100,
  })
  loginEmail: string;

  @Column("character varying", { name: "first_name", length: 50 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 50 })
  lastName: string;

  @Column("character varying", {
    name: "patronymic",
    nullable: true,
    length: 50,
  })
  patronymic: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 20,
  })
  phoneNumber: string | null;

  @OneToOne(() => Cart, (cart) => cart.idUser2)
  cart: Cart;

  @OneToMany(() => Orders, (orders) => orders.idUser)
  orders: Orders[];

  @OneToMany(() => UserViews, (userViews) => userViews.idUser2)
  userViews: UserViews[];
}
