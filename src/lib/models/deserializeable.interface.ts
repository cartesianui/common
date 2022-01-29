interface Deserializable {
  init(input: any): this;
  fromJSON(input: any): this;
  // toJSON(): this;
  clone(): this;
}

export default Deserializable;
