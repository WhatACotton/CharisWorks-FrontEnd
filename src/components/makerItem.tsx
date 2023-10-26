import React, { useEffect, useState } from "react";
import { ItemData } from "../lib/Server/ItemAPI";
import { MakerItemGet } from "../lib/Server/Maker";

const Card = ({ Item }: { Item: ItemData }) => {
  return (
    <div className="card border-1">
      <p>ItemID: {Item.ItemID}</p>
      <p>Status: {Item.Status}</p>
      <p>Name: {Item.Name}</p>
      <p>Price: {Item.Price}</p>
      <p>Stock: {Item.Stock}</p>
      <p>Color: {Item.Color}</p>
      <p>Series: {Item.Series}</p>
      <p>Size: {Item.Size}</p>
      <p>Description: {Item.Description}</p>
    </div>
  );
};

const MakerItem = () => {
  const [Items, setItems] = useState<ItemData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MakerItemGet();
        if (data) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="card-container">
        {Items.map((item, index) => (
          <Card key={index} Item={item} />
        ))}
      </div>
    </div>
  );
};

export default MakerItem;
