import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("user")
export class UserView {
  @ViewColumn()
  uid: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  password: string;

  @ViewColumn()
  username: string;

  @ViewColumn()
  fullname: string;

  @ViewColumn()
  description: string | null;

  @ViewColumn({ name: "picture_profile" })
  pictureProfile: string | null;

  @ViewColumn({ name: "code_country" })
  codeCountry: string | null;
}