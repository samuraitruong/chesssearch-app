import React from 'react';
import { CgDisplayGrid, CgList } from 'react-icons/cg';

interface IDisplaySelectorProps {
  mode: 'list' | 'card';
  onChange: (type: 'list' | 'card') => void;
}
export function DisplaySelector({ onChange, mode }: IDisplaySelectorProps) {
  return (
    <>
      <CgDisplayGrid
        onClick={() => onChange('card')}
        color={mode === 'card' ? 'green' : ''}
        className="cursor-pointer"
      />
      <CgList
        onClick={() => onChange('list')}
        className="cursor-pointer"
        color={mode === 'list' ? 'green' : ''}
      />
    </>
  );
}
