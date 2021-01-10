import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Index("follow_pkey", ["followUidUser", "uidUser"], { unique: true })
@Entity("follow", { schema: "posthoop_user" })
export class Follow {
  @Column("uuid", { primary: true, name: "uid_user" })
  uidUser: string;

  @Column("uuid", { primary: true, name: "follow_uid_user" })
  followUidUser: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.follows)
  @JoinColumn([{ name: "follow_uid_user", referencedColumnName: "uid" }])
  followUidUser2: User;

  @ManyToOne(() => User, (user) => user.follows2)
  @JoinColumn([{ name: "uid_user", referencedColumnName: "uid" }])
  uidUser2: User;
}
