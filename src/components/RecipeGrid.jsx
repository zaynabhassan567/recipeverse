import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes = [] }) => (
  <Container>
    <Row>
      {recipes.map((recipe) => (
        <Col key={recipe.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <RecipeCard {...recipe} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default RecipeGrid; 