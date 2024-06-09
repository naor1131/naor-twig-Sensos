import React from "react";

interface WithTitleProps {
  title: string;
  children: React.ReactNode;
}
const WithTitle = ({ title, children }: WithTitleProps) => {
  return (
    <main className="flex min-h-screen flex-col justify-start px-10 py-20 bg-gray-100">
      <div className="title mb-3 text-2xl font-bold bg-gray-100">{title}</div>
      <div className="line w-full h-0.5 bg-gray-200 mb-5"></div>
      {children}
    </main>
  );
};

export default WithTitle;
