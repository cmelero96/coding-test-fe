/// <reference types="cypress" />

import { FILTER_COLUMNS } from '../../src/constants/table-data'

beforeEach(() => {
    cy.visit('/');
  })
  
  describe('App data', () => {
    it('should have a table of matches', () => {
    });

    it('should have a filter', () => {
      
    });

    describe('Game Table component', () => {
      it('should have a header with the correct column values', () => {
        
      });

      it('should display the matches received from the API', () => {
        
      });

      it('should display a message while the data is loading', () => {
        
      });

      it('should display a message when there is a network error', () => {
        
      });

      it('should update the scores using the WebSocket client messages', () => {
        
      });
    });

    describe('Filter component', () => {
      it('should contain all the filter-valid field options, and a no-filter option', () => {
        
      });

      it('should do no filter with a no-filter option selected regardless of text input', () => {
        
      });

      it('should do no filter with empty text input regardless of field option', () => {
        
      });

      describe('Filtering functionality', () => {
        FILTER_COLUMNS.forEach(filterColumn => {
          it(`should filter by ${column}`, () => {
            
          });
        })
      })
    });
  })