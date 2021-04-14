import useSWR, { mutate } from 'swr';
import { EnsName } from './types';
import { ethers } from 'ethers';
import { phoneNumbers } from './utils/phoneNumbers';
import { sendTwilioMessage } from './utils/twilio';
const abi = require('../contracts/build/ENS.json');
const ensPath = '/api/ens';
export const useEnsNames = () => useSWR<EnsName[]>(ensPath);
const CONTRACT_ADDRESS = '0x468cE82433c6739d6A36a58F771824C33A656edA';

/**
 * Create a new ENS domain in the database and on the ethereum network
 * @param  {string} text
 */
export const createEns = async (text: string) => {
  // TODO: Better validation of inputs
  if (!text.includes('.eth')) {
    alert(
      `ENS names must have the .eth top-level domain. Change your input to ${text}.eth`
    );
    return;
  }

  // Note: Browser must have an ethereum wallet installed such as MetaMask
  // TODO: More advanced handling in the UI for when MetaMask isn't installed
  if (window.ethereum === undefined) {
    alert('MetaMask is not installed');
    return;
  }

  // Check if the ENS name has already been registered
  // If it already has been it should not be registered again and no notifications should be sent
  const response = await fetch(`${ensPath}?ensName=${text}`, { method: 'GET' });
  const body = await response.text();
  if (body !== '' && JSON.parse(body).text === text) {
    alert('Notifications have already been sent for this registered ENS name');
    return;
  }

  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  // TODO: Add handling to not add the new name to the db if the tx doesn't confirm
  await contract.functions.setENSName(text);
  await fetch(ensPath, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });

  // Send the notifications
  for (let phoneNumber of phoneNumbers) {
    console.log(
      `Notifying ${phoneNumber} that the ENS domain ${text} has been registered`
    );

    await sendTwilioMessage(`A new ENS name has been registered at ${text}`);
  }

  mutate(ensPath, (ensNames) => [{ text, id: 'new-ens' }], false);
  mutate(ensPath);
};

/**
 * Deletes the ENS domain from the database, but not from on chain
 * @param  {string} id
 */
export const deleteEns = async (id: string) => {
  mutate(ensPath, (ensNames) => ensNames.filter((t) => t.id !== id), false);
  await fetch(`${ensPath}?ensNameId=${id}`, { method: 'DELETE' });
  mutate(ensPath);
};
