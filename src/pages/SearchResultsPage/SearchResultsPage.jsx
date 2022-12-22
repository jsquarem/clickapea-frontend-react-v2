import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import databaseService from '../../utils/databaseService';

export default function SearchResultsPage() {
  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    console.log('here1');
    databaseService.populateImported();
    console.log('here2');
  };

  return (
    <Container className="pt-5 pb-5" data-testid="recipe-import-container">
      <p>Running Operation...</p>
    </Container>
  );
}
