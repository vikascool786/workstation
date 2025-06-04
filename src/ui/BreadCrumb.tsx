// src/components/common/InputField.tsx
import React, { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

interface Crumb {
  label: string;
  href?: string;
}
interface breadcrumbProps {
  items: Crumb[];
}
const BreadCrumb: React.FC<breadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Breadcrumb.Item active key={index}>
            {item.label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item href={item.href} key={index}>
            {item.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
