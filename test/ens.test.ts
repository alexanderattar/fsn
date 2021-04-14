import { ethers } from 'hardhat';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ENS__factory, ENS } from '../typechain';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('ENS', () => {
  let ens: ENS;

  beforeEach(async () => {
    // 1
    const signers = await ethers.getSigners();

    // 2
    const ensFactory = (await ethers.getContractFactory(
      'ENS',
      signers[0]
    )) as ENS__factory;
    ens = await ensFactory.deploy('test.eth');
    await ens.deployed();
    const initialName = await ens.getENSName();

    // 3
    expect(initialName).to.eq('test.eth');
    expect(ens.address).to.properAddress;
  });

  // 4
  describe('ENSName', async () => {
    it('should get the current ens name', async () => {
      await ens.getENSName();
      let name = await ens.getENSName();
      expect(name).to.eq('test.eth');
    });

    it('should set a new ens name', async () => {
      await ens.setENSName('new.eth');
      const name = await ens.getENSName();
      expect(name).to.eq('new.eth');
    });
  });
});
