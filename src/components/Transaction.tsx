import React, { useEffect, useState } from "react";
import {
  TransactionCardProps,
  TransactionData,
  TransactionGet,
} from "../lib/Server/Customer";

const Card = ({ transaction }: TransactionCardProps) => {
  return (
    <div className="card">
      <h2>Transaction ID: {transaction.TransactionID}</h2>
      <p>Name: {transaction.Name}</p>
      <p>Total Amount: {transaction.TotalAmount}</p>
      <p>Address: {transaction.Address}</p>
      <p>Phone Number: {transaction.PhoneNumber}</p>
      <p>Transaction Time: {transaction.TransactionTime}</p>
      <p>Stripe ID: {transaction.StripeID}</p>
      <p>Status: {transaction.status}</p>
      <h3>Items:</h3>
      <ul>
        {transaction.items.map((item, index) => (
          <li key={index}>
            Item ID: {item.InfoID}, Quantity: {item.Quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CardList = () => {
  const [data, setData] = useState<TransactionData>({
    TransactionLists: [],
    Transactions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TransactionGet();
        console.log(data);
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getTransactionByTransactionID = (transactionID: string) => {
    const transaction = data.TransactionLists.find(
      (item) => item.TransactionID === transactionID
    );

    if (transaction) {
      const transactionItems = data.Transactions.find(
        (items) => items[0].TransactionID === transactionID
      );

      if (transactionItems) {
        return { ...transaction, items: transactionItems };
      }
    }

    return null;
  };

  return (
    <div className="card-container">
      {data.TransactionLists.map((transaction, index) => {
        const transactionData = getTransactionByTransactionID(
          transaction.TransactionID
        );

        if (transactionData) {
          return <Card key={index} transaction={transactionData} />;
        }

        return null;
      })}
    </div>
  );
};

function TransactionLists() {
  return (
    <div>
      <h1>Transaction Card List</h1>
      <CardList />
    </div>
  );
}

export default TransactionLists;
