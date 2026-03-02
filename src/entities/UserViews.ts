import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Products } from "./Products";
import { Users } from "./Users";

@Index("user_views_pkey", ["idProduct", "idUser", "viewDate"], { unique: true })
@Entity("user_views", { schema: "public" })
export class UserViews {
  @Column("integer", { primary: true, name: "id_user" })
  idUser: number;

  @Column("integer", { primary: true, name: "id_product" })
  idProduct: number;

  @Column("timestamp without time zone", {
    primary: true,
    name: "view_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  viewDate: Date;

  @ManyToOne(() => Products, (products) => products.userViews, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_product", referencedColumnName: "idProduct" }])
  idProduct2: Products;

  @ManyToOne(() => Users, (users) => users.userViews, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: Users;
}
