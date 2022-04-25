/// <reference types="cypress" />

import {PROTOCOLS, BASE_URL, ENDPOINTS} from '../../src/constants/api';
import {TABLE_COLUMNS, FILTER_COLUMNS} from '../../src/constants/table-data';

import {extractTimeFromIso} from '../../src/utils/datetime';

const renderPage = (status = 'success') => {
  let triggerApiCall;
  let interceptArguments;

  if (status === 'loading') {
    const trigger = new Promise((resolve) => {
      triggerApiCall = resolve;
    });

    interceptArguments = (request) => trigger.then(() => request.reply())
  } else if (status === 'error') {
    interceptArguments = {
      statusCode: 404,
      fixture: 'error.json',
    }
  } else {
    interceptArguments = {
      statusCode: 200,
      fixture: 'matches.json',
    }
  }
  
  cy.intercept(
    'GET',
    `${PROTOCOLS.api}://${BASE_URL}/${ENDPOINTS.series}`,
    interceptArguments
  ).as('apiCall');

  cy.visit('/');

  return triggerApiCall;
}

describe('App', () => {
  describe.only('Success behaviour', () => {
    beforeEach(() => {
      renderPage();
      cy.wait('@apiCall');
    })

    describe('Match Table component', () => {
      beforeEach(() => {
        cy.get('[data-testid="match-table"]').as('table');
        cy.get('[data-testid="match-table-column"]').as('headerColumns');
        cy.get('[data-testid="match-table-row"]').as('contentRows');
      });
  
      it('should have a header with the correct column values', () => {
        TABLE_COLUMNS.forEach((column, i) => {
          cy.get('@headerColumns').eq(i).should('contain', column);
        });
      });
  
      it('should display the matches received from the API', () => {
        cy.fixture('matches').then((matches) => {
          matches.forEach(({title, tournament, teams, startTime}, i) => {
            cy.get('@contentRows').eq(i)
              .should('contain', title)
              .should('contain', tournament.name)
              .should('contain', teams[0].name)
              .should('contain', teams[1].name)
              .should('contain', extractTimeFromIso(startTime));
          })
        });
        cy.get('@table').find('[data-testid="match-table-row"]');
      });
  
      it('should update the scores using the WebSocket client messages', () => {});
    });
  
    describe('Filter component', () => {
      beforeEach(() => {
        cy.get('[data-testid="filter-wrapper"]').as('filter');
        cy.get('[data-testid="select-filter"]').as('select');
        cy.get('[data-testid="input-filter"]').as('input');
      });
  
      it('should contain all the filter-valid field options, and a no-filter option', () => {});
  
      it('should do no filter with a no-filter option selected regardless of text input', () => {});
  
      it('should do no filter with empty text input regardless of field option', () => {});
  
      describe('Filtering functionality', () => {
        FILTER_COLUMNS.forEach((column) => {
          it(`should filter by ${column}`, () => {});
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('should display a message while the data is loading', () => {
      // Make the API call an unresolved promise to simulate a loading state, check for the
      // element to display while loading, then resolve the promise to end the test.
      const triggerApiCall = renderPage('loading');

      cy.get('[data-testid="loading-msg"]').should('exist').then(() => {
        triggerApiCall();
      });

    });

    it('should display a message when there is a network error', () => {
      renderPage('error');

      cy.get('[data-testid="error-msg"]').should('exist');
    });
  })
  
});
