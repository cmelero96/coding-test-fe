import React, {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import { FILTER_COLUMNS } from '../constants/table-data';
import { InputWrapper } from './styled';

const GameFilter = ({onFilter}) => {
  const [inputText, setInputText] = useState('');
  const [textFilter] = useDebounce(inputText, 300);
  const [field, setField] = useState();

  useEffect(() => {
    onFilter(field, textFilter);
  }, [textFilter, field, onFilter]);

  return (
    <InputWrapper>
      <select
        defaultValue=''
        onChange={(e) => setField(e.target.value)}
      >
        <option disabled hidden value="">
          Filter by:
        </option>
        <option value="">
          (No filter)
        </option>
        {FILTER_COLUMNS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        defaultValue=''
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
    </InputWrapper>
  );
};

export default GameFilter;
