import { BigInt, ens } from '@graphprotocol/graph-ts';
import { SetENSNameCall, SetENSName } from '../generated/ENS/ENS';
import { ENSName } from '../generated/schema';

export function handleSetENS(call: SetENSNameCall): void {
  let id = call.transaction.hash.toHex();
  let ensName = new ENSName(id);
  ensName.ensName = call.inputs._ensName;
  ensName.save();
}

export function handleSetENSName(event: SetENSName): void {
  let ensName = new ENSName(event.params.name);
  ensName.id = event.transaction.hash.toHex();
  ensName.ensName = event.params.name;
  ensName.save();
}
