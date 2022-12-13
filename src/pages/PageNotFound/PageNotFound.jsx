import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PageNotFound() {
  return (
    <Container className="pt-5">
      <div className="mt-5 pt-5 text-center">
        <h1>404 - Page Not Found</h1>
        <p className="mt-5 text-danger h2">
          Please double check your link is correct. If you found this page
          through a link on this site, please email us at clickapea@gmail.com so
          we can hunt down that nasty bug.
        </p>
      </div>
    </Container>
  );
}
