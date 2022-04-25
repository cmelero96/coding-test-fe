/// <reference types="cypress" />

import {PROTOCOLS, BASE_URL, ENDPOINTS} from '../../src/constants/api';
import {TABLE_COLUMNS, FILTER_COLUMNS, FILTER_DEBOUNCE_TIME} from '../../src/constants/table-data';

import {extractTimeFromIso} from '../../src/utils/datetime';

const renderPage = (status = 'success') => {
  let triggerApiCall;
  let interceptArguments;

  if (status === 'loading') {
    const trigger = new Promise((resolve) => {
      triggerApiCall = resolve;
    });

    interceptArguments = (request) => trigger.then(() => request.reply());
  } else if (status === 'error') {
    interceptArguments = {
      statusCode: 404,
      fixture: 'error.json',
    };
  } else {
    interceptArguments = {
      statusCode: 200,
      fixture: 'matches.json',
    };
  }

  cy.intercept('GET', `${PROTOCOLS.api}://${BASE_URL}/${ENDPOINTS.series}`, interceptArguments).as(
    'apiCall'
  );

  cy.visit('/');

  return triggerApiCall;
};

const setFilter = (text = '', field = '') => {
  // If field is undefined/null use the default (hidden) option; if '' use the (No filter) option.
  if (field != null) cy.get('@select').select(field || 1);

  cy.get('@input').type(`{selectAll}{del}${text}`);

  cy.wait(FILTER_DEBOUNCE_TIME);
};

describe('App', () => {
  describe('Success behaviour', () => {
    beforeEach(() => {
      renderPage();
      cy.wait('@apiCall');

      cy.get('[data-testid="match-table"]').as('table');
      cy.get('[data-testid="match-table-column"]').as('headerColumns');
      cy.get('[data-testid="match-table-row"]').as('contentRows');
      cy.get('[data-testid="filter-wrapper"]').as('filter');
      cy.get('[data-testid="select-filter"]').as('select');
      cy.get('[data-testid="input-filter"]').as('input');
    });

    describe('Match Table component', () => {
      it('should have a header with the correct column values', () => {
        TABLE_COLUMNS.forEach((column, i) => {
          cy.get('@headerColumns').eq(i).should('contain', column);
        });
      });

      it('should display the matches received from the API', () => {
        cy.fixture('matches').then((matches) => {
          matches.forEach(({title, tournament, teams, startTime}, i) => {
            cy.get('@contentRows')
              .eq(i)
              .should('contain', title)
              .should('contain', tournament.name)
              .should('contain', teams[0].name)
              .should('contain', teams[1].name)
              .should('contain', extractTimeFromIso(startTime));
          });
        });
        cy.get('@table').find('[data-testid="match-table-row"]');
      });

      it('should update the scores using the WebSocket client messages', () => {});
    });

    describe('Filter component', () => {
      it('should contain all the valid field options, and a no-filter option', () => {
        cy.get('@select').should('have.value', '');
        cy.get('[data-testid="filter-option-initial"]').should('exist').should('have.value', '');

        FILTER_COLUMNS.forEach((column, i) => {
          cy.get('[data-testid="filter-option"]').eq(i).should('contain', column);
        });
      });

      it('should do no filter with a no-filter option selected regardless of text input', () => {
        cy.get('@contentRows')
          .its('length')
          .then((rows) => {
            const rowsBefore = rows;

            // Test with initial option 'Filter by:'
            setFilter('sample text');
            cy.get('@contentRows')
              .its('length')
              .then((rowsAfter) => cy.wrap(rowsBefore).should('equal', rowsAfter));
              
            // Test with no filter option
            setFilter('sample text', '');
            cy.get('@contentRows')
              .its('length')
              .then((rowsAfter) => cy.wrap(rowsBefore).should('equal', rowsAfter));
          });
      });

      it('should do no filter with empty text input regardless of field option', () => {
        cy.get('@contentRows')
          .its('length')
          .then((rows) => {
            const rowsBefore = rows;

            FILTER_COLUMNS.forEach(column => {
              setFilter('', column);
              cy.get('@contentRows')
                .its('length')
                .then((rowsAfter) => cy.wrap(rowsBefore).should('equal', rowsAfter));
            });
          });
      });

      describe('Filtering functionality', () => {
        const filterMapping = {
          title: 'csgo',
          tournament: 'blast',
        };

        FILTER_COLUMNS.forEach((column) => {
          it(`should filter by ${column}`, () => {
            const text = filterMapping[column];
            const noElementsText = '_foo!bar-.';

            // Check filtering some elements
            setFilter(text, column);
            cy.get('@contentRows').each((row) => {
              cy.wrap(row).contains(text, {matchCase: false});
            });

            // Check filtering out everything; a no-content message should be displayed only
            setFilter(noElementsText, column);
            cy.get('@contentRows').should('not.exist');
            cy.get('[data-testid="match-table-empty-row"]');
          });
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('should display a message while the data is loading', () => {
      // Make the API call an unresolved promise to simulate a loading state, check for the
      // element to display while loading, then resolve the promise to end the test.
      const triggerApiCall = renderPage('loading');

      cy.get('[data-testid="loading-msg"]')
        .should('exist')
        .then(() => {
          triggerApiCall();
        });
    });

    it('should display a message when there is a network error', () => {
      renderPage('error');

      cy.get('[data-testid="error-msg"]').should('exist');
    });
  });
});
