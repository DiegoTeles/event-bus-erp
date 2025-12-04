'use client';

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import {
  Container,
  Input,
  Dropdown,
  DropdownItem,
  BranchLabel,
  BranchType,
} from './style';

interface BranchOption {
  value: string;
  label: string;
  isPilot: boolean;
}

interface BranchSelectProps {
  value: string;
  onChange: (value: string) => void;
  pilotBranches?: string[];
  required?: boolean;
  disabled?: boolean;
}

const DEFAULT_PILOT_BRANCHES = ['BRANCH-001', 'BRANCH-002', 'BRANCH-003'];

export function BranchSelect({
  value,
  onChange,
  pilotBranches = DEFAULT_PILOT_BRANCHES,
  required = false,
  disabled = false,
}: BranchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Criar lista de branches padrão
  const defaultBranches: BranchOption[] = pilotBranches.map((branch) => ({
    value: branch,
    label: `${branch} (Piloto)`,
    isPilot: true,
  }));

  // Filtrar branches baseado no input
  const filteredBranches = defaultBranches.filter((branch) =>
    branch.value.toLowerCase().includes(inputValue.toLowerCase()) ||
    branch.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Verificar se o valor atual é um branch piloto
  const currentBranch = defaultBranches.find((b) => b.value === value);
  const isCurrentPilot = currentBranch?.isPilot || false;

  // Se o input não corresponde a nenhum branch da lista, mostrar opção de criar novo
  const showCreateNew =
    inputValue &&
    !defaultBranches.some(
      (b) => b.value.toLowerCase() === inputValue.toLowerCase()
    );

  const options = [...filteredBranches];
  if (showCreateNew) {
    options.push({
      value: inputValue.toUpperCase(),
      label: `Criar "${inputValue.toUpperCase()}" (Legado)`,
      isPilot: false,
    });
  }

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(options[highlightedIndex].value);
    } else if (e.key === 'Enter' && highlightedIndex === -1 && options.length > 0) {
      e.preventDefault();
      handleSelect(options[0].value);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <Container ref={containerRef}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder="Digite ou selecione uma filial"
        required={required}
        disabled={disabled}
      />
      {isOpen && options.length > 0 && (
        <Dropdown>
          {options.map((option, index) => (
            <DropdownItem
              key={option.value}
              isHighlighted={index === highlightedIndex}
              isNew={!!(option.isPilot === false && showCreateNew)}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <BranchLabel>{option.value}</BranchLabel>
              <BranchType isPilot={option.isPilot}>
                {option.isPilot ? 'Piloto' : 'Legado'}
              </BranchType>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}

