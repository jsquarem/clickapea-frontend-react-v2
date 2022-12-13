import React from 'react';

export default function ErrorMessage({ error }) {
  return <span className="error text-danger">{error}</span>;
}
