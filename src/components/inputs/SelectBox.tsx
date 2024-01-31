import React, { useMemo, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';

interface SelectBoxProps {
  options: string[]; 
  size: string
}

const createSelectedOptionAtom = (initialValue: string) => atom<string>(initialValue);

const SelectBox: React.FC<SelectBoxProps> = ({ options, size }) => {
  const selectedOptionAtom = useMemo(() => createSelectedOptionAtom(options[0]), [options]);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);
  const isMounted = useRef(false); 
  const selectBoxRef = useRef<HTMLDivElement>(null); 

  const handleOptionClick = (selected: string) => {
    setSelectedOption(selected);
    setIsOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  useEffect(() => {
    if (isMounted.current) {
      console.log('Currently selected option:', selectedOption);
    } else {
      isMounted.current = true;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
        setIsOptionsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedOption]);

  
  return (
    <div>
      <div ref={selectBoxRef} className={`custom-select selected-option ${size === 'lg' ? 'w-full' : 'w-[120px]'} bg-bg01 text-md text-gray00 h-8 pl-4 pr-2 py-0.5 rounded border-2 border-solid border-border relative select-none hover:border-primary flex justify-between cursor-pointer`} onClick={toggleOptionsVisibility}>
        <div>{selectedOption}</div>
        <span className="material-symbols-outlined text-gray01">{isOptionsVisible ? 'expand_less' : 'expand_more'}</span>
        {isOptionsVisible && (
          <ul className="w-full max-h-52 options-list bg-bg01 text-md text-gray00 rounded py-2 border-2 border-solid border-border absolute top-[30px] left-0 z-10 select-none overflow-y-auto">
            {options.map((option, index) => (
              <li className="px-3 py-1.5 hover:bg-bg00" key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectBox;