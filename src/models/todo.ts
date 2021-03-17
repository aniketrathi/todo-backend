import { BaseModel } from "./base-model";
import { LooseObject } from "@typings";

export class TodoItem extends BaseModel {
  title: string;

  constructor(json?: LooseObject) {
    super(json);
    if (json) {
      this.title = json.title;
    }
  }

  public serialize(): LooseObject {
    return {
      id: this._id,
      title: this.title,
    };
  }
}
