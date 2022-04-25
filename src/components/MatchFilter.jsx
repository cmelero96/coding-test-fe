import React, {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import { FILTER_COLUMNS, FILTER_DEBOUNCE_TIME } from '../constants/table-data';
import { InputWrapper } from './styled';

const GameFilter = ({onFilter}) => {
  const [inputText, setInputText] = useState('');
  const [textFilter] = useDebounce(inputText, FILTER_DEBOUNCE_TIME);
  const [field, setField] = useState();

  useEffect(() => {
    onFilter(field, textFilter);
  }, [textFilter, field, onFilter]);

  return (
    <InputWrapper data-testid="filter-wrapper">
      <select
        data-testid="select-filter"
        defaultValue={null}
        onChange={(e) => setField(e.target.value)}
      >
        <option data-testid="filter-option-initial" disabled hidden value="">
          Filter by:
        </option>
        <option data-testid="filter-option-empty" value="">
          (No filter)
        </option>
        {FILTER_COLUMNS.map((option) => (
          <option data-testid="filter-option" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        data-testid="input-filter"
        defaultValue=''
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
    </InputWrapper>
  );
};

export default GameFilter;
