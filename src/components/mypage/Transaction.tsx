import React, { useEffect, useState } from "react";
import {
  TransactionCardProps,
  TransactionData,
  TransactionGet,
} from "../../api/Server/Customer";
import { List, Divider, Card, Grid, CardContent } from "@mui/material";
const InternalCard = ({ transaction }: TransactionCardProps) => {
  return (
    <>
      <Grid item>
        <CardContent>
          <List>
            <h3>Items:</h3>
            <ul>
              {transaction.items.map((item, index) => (
                <li key={index}>
                  Item ID: {item.ItemID}, Quantity: {item.Quantity},Name:
                  {item.ItemName}
                </li>
              ))}
            </ul>
            <p>購入金額: ¥{transaction.TotalAmount} -</p>
            <Divider />
            <p>Status: {transaction.status}</p>
            <p>ShipID:{transaction.ShipID}</p>
          </List>
        </CardContent>
      </Grid>
    </>
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
  if (data.TransactionLists !== null) {
    return (
      <div>
        <Grid item sx={{ p: 1 }}>
          {data.TransactionLists.map((transaction, index) => {
            const transactionData = getTransactionByTransactionID(
              transaction.TransactionID
            );

            if (transactionData) {
              return <InternalCard key={index} transaction={transactionData} />;
            }

            return null;
          })}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <h1>取引履歴がありません</h1>
      </div>
    );
  }
};

function TransactionLists() {
  return (
    <div>
      <h1>Transaction Card List</h1>
      <Grid container spacing={2}>
        {" "}
        <CardList />
      </Grid>
    </div>
  );
}

export default TransactionLists;
