import Deserializable from './deserializeable.interface';

export class ParentModel implements Deserializable {
  constructor(data) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  init(data?: any) {
    return Object.assign(this, data);
  }

  fromJSON(json: any): this {
    return Object.assign(this, json);
  }

  // toJSON() {
  //   return JSON.stringify(this);
  // }

  clone() {
    return Object.assign({}, this);
  }
}
