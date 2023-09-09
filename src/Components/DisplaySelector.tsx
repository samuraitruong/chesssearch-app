import { CgDisplayGrid, CgList, CgMenuCheese } from 'react-icons/cg';

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
        className="cursor-pointer text-xl mr-2"
      />
      <CgList
        onClick={() => onChange('list')}
        className="cursor-pointer text-xl  mr-2 "
        color={mode === 'list' ? 'green' : ''}
      />

      <CgMenuCheese
        onClick={() => onChange('table')}
        className="cursor-pointer text-lg"
        color={mode === 'table' ? 'green' : ''}
      />
    </>
  );
}
