import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("follow")
export class FollowView {
  @ViewColumn({ name: "uid_user" })
  uidUser: string;

  @ViewColumn({ name: "follow_uid_user" })
  followUidUser: string;

  @ViewColumn({ name: "created_at" })
  createdAt: Date | null;
}