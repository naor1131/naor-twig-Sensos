import React from "react";

interface ICardProps {
  backgroundColor?: string;
  children?: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return <div className="card bg-white rounded-2xl shadow-md p-6">{children}</div>;
};

export default Card;
