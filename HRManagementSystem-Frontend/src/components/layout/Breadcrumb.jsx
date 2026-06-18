import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link to={item.href} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};