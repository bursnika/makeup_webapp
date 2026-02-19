import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("orders_pkey", ["idOrder"], { unique: true })
@Entity("orders", { schema: "public" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_order" })
  idOrder: number;

  @Column("timestamp without time zone", {
    name: "order_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  orderDate: Date | null;

  @Column("numeric", {
    name: "total_amount",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  totalAmount: string | null;

  @Column("character varying", {
    name: "payment_method",
    nullable: true,
    length: 50,
  })
  paymentMethod: string | null;

  @Column("text", { name: "delivery_address", nullable: true })
  deliveryAddress: string | null;

  @Column("character varying", { name: "status", nullable: true, length: 50 })
  status: string | null;

  @ManyToOne(() => Users, (users) => users.orders, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}
