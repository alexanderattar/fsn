// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal,
} from '@graphprotocol/graph-ts';

export class ENSName extends Entity {
  constructor(id: string) {
    super();
    this.set('id', Value.fromString(id));
  }

  save(): void {
    let id = this.get('id');
    assert(id !== null, 'Cannot save ENSName entity without an ID');
    assert(
      id.kind == ValueKind.STRING,
      'Cannot save ENSName entity with non-string ID. ' +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set('ENSName', id.toString(), this);
  }

  static load(id: string): ENSName | null {
    return store.get('ENSName', id) as ENSName | null;
  }

  get id(): string {
    let value = this.get('id');
    return value.toString();
  }

  set id(value: string) {
    this.set('id', Value.fromString(value));
  }

  get ensName(): string {
    let value = this.get('ensName');
    return value.toString();
  }

  set ensName(value: string) {
    this.set('ensName', Value.fromString(value));
  }
}
