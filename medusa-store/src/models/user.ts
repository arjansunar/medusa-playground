// TODO: modify user module to include reference to Store
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User as MedusaUser } from "@medusajs/medusa";
import { Store } from "./store";

// Update User model to have a relationship to a store
// Here user means a part of the store and not the customer
@Entity()
export class User extends MedusaUser {
  @Index("UserStoreId")
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.members)
  @JoinColumn({ name: "store_id", referencedColumnName: "id" })
  store?: Store;
}
