import path from "path";
import { readFileSync } from "fs";
import { Request, Response } from "express";
import {
  SignedDataVerifier,
  SendTestNotificationResponse,
  AppStoreServerAPIClient,
  Environment,
  ReceiptUtility,
  Order,
  ProductType,
  HistoryResponse,
  TransactionHistoryRequest,
} from "@apple/app-store-server-library";
import envConfig from "../env.config";

const { keyId, issuerId, bundleId, subKey } = envConfig;

// Construct the file path based on the project structure
const keyFileName = "SubscriptionKey_75SLDQ345A.p8";
const filePath = path.resolve(__dirname, "../..", keyFileName);
const encodedKey = readFileSync(filePath, "utf-8");
const environment = Environment.SANDBOX;

export const verifyTransaction = async (req: Request, res: Response) => {
  const { appReceipt } = req.body;
  try {
    const client = new AppStoreServerAPIClient(
      encodedKey,
      keyId,
      issuerId,
      bundleId,
      environment
    );

    // console.log(appReceipt);

    const receiptUtil = new ReceiptUtility();

    console.log("step 1");

    const transactionId =
      receiptUtil.extractTransactionIdFromAppReceipt(appReceipt);
    console.log("step 2");
    console.log(transactionId);
    console.log("step 3");
    if (transactionId != null) {
      const transactionHistoryRequest: TransactionHistoryRequest = {
        sort: Order.ASCENDING,
        revoked: false,
        productTypes: [ProductType.AUTO_RENEWABLE],
      };

      console.log(transactionHistoryRequest);
      let response: HistoryResponse | null = null;
      let transactions: string[] = [];

      do {
        const revisionToken =
          response !== null && response.revision !== undefined
            ? response.revision
            : null;
        response = await client.getTransactionHistory(
          transactionId,
          revisionToken,
          transactionHistoryRequest
        );
        if (response.signedTransactions) {
          transactions = transactions.concat(response.signedTransactions);
        }
      } while (response.hasMore);
      console.log(transactions);
      return res.status(200).json({ status: true, message: response });
    }
  } catch (err) {}
};

export const verify = async () => {
  const client = new AppStoreServerAPIClient(
    encodedKey,
    keyId,
    issuerId,
    bundleId,
    environment
  );

  try {
    console.log();
    const response: SendTestNotificationResponse =
      await client.requestTestNotification();
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};
