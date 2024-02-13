import { Exclude } from "class-transformer";
import { Base } from "src/communBase/base.entity";
import { Column, Entity } from "typeorm";

@Entity("users")
export class User extends Base {
  @Column({ type: "varchar", length: 300, default: "" })
  firstName?: string;

  @Column({ type: "varchar", length: 300, default: "" })
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;
}
