import React from 'react';
import { CgDisplayGrid, CgList } from 'react-icons/cg';
import { GrTable } from 'react-icons/gr';

interface IDisplaySelectorProps {
  mode: 'list' | 'card' | 'table';
  onChange: (type: 'list' | 'card' | 'table') => void;
}

export function DisplaySelector({ onChange, mode }: IDisplaySelectorProps) {
  return (
    <>
      <CgDisplayGrid
        onClick={() => onChange('card')}
        color={mode === 'card' ? 'green' : ''}
        className="cursor-pointer text-xl"
      />
      <CgList
        onClick={() => onChange('list')}
        className="cursor-pointer text-xl"
        color={mode === 'list' ? 'green' : ''}
      />

      <GrTable
        onClick={() => onChange('table')}
        className="cursor-pointer text-lg"
        color={mode === 'table' ? 'green' : ''}
      />
    </>
  );
}
