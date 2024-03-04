// Import the necessary packages
import {
  LocalAccountSigner,
  type SmartAccountSigner,
  sepolia,
} from "@alchemy/aa-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import * as dotenv from "dotenv";
dotenv.config();

// Import the environment variables
const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const PAYMASTER_POLICY_ID = process.env.PAYMASTER_POLICY_ID!;

// Define the constants
const chain = sepolia;
const signer: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
  `0x${PRIV_KEY}`
);

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */

// Client with the Gas Manager to sponsor gas.
// Find your Gas Manager policy id at: dashboard.alchemy.com/gas-manager/policy/create
export const smartAccountClient = await createModularAccountAlchemyClient({
  apiKey: ALCHEMY_API_KEY,
  chain,
  signer, // or any SmartAccountSigner
  gasManagerConfig: {
    policyId: PAYMASTER_POLICY_ID,
  },
});
