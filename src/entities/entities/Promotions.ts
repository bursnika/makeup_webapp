import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PromotionProducts } from "./PromotionProducts";

@Index("promotions_pkey", ["idPromo"], { unique: true })
@Entity("promotions", { schema: "public" })
export class Promotions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_promo" })
  idPromo: number;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("date", { name: "end_date", nullable: true })
  endDate: string | null;

  @OneToMany(
    () => PromotionProducts,
    (promotionProducts) => promotionProducts.idPromo
  )
  promotionProducts: PromotionProducts[];
}
