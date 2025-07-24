import React, {FC, ReactNode, SelectHTMLAttributes, useId, useState} from 'react';
import {useSelect} from 'downshift';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {MdArrowDropDown} from 'react-icons/md';

import {Icon} from '../..';
import './FormSelect.scss';

type SelectOption = { label: string, value: string , meta?: string};

type FormMultiselectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: ReactNode;
    name: string;
    placeholder?: string;
    hideLabel?: boolean;
    options: SelectOption[];
    selectedOptions?: SelectOption[];
    onSelectionChange?: (selection: SelectOption[] | null) => void;
    mode?: 'dropdown' | 'static';
    selectAllEnabled?: boolean;
};

const FormMultiselect: FC<FormMultiselectProps> = ({
                                                       label,
                                                       hideLabel,
                                                       options = [],
                                                       disabled,
                                                       placeholder,
                                                       defaultValue,
                                                       selectedOptions = [],
                                                       onSelectionChange,
                                                       mode = 'dropdown',
                                                       selectAllEnabled = false,
                                                       name,
                                                       ...rest
                                                   }) => {
    const id = useId();
    const {t} = useTranslation();
    const [selectedItems, setSelectedItems] = useState<SelectOption[]>(selectedOptions);
    const selectClasses = clsx('select', disabled && 'select--disabled');
    const placeholderValue = placeholder || t('global.choose');
    const areAllSelected = options.length > 0 && selectedItems.length === options.length;
    const displayOptions = selectAllEnabled && options.length > 0
        ? [{ label: t('global.selectAll') as string, value: 'selectAll' }, ...options]
        : options;


    const handleToggle = (option: SelectOption) => {
        if (option.value === 'selectAll') {
            handleSelectAllToggle();
            return;
        }
        const isSelected = selectedItems.some((item) => item.value === option.value);
        const newSelection = isSelected
            ? selectedItems.filter((item) => item.value !== option.value)
            : [...selectedItems, option];

        setSelectedItems(newSelection);
        onSelectionChange?.(newSelection);
    };

    const {
        isOpen,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = mode === 'dropdown'
        ? useSelect({
            items: options,
            stateReducer: (state, actionAndChanges) => {
                const {changes, type} = actionAndChanges;
                if (type === useSelect.stateChangeTypes.ItemClick) {
                    return {
                        ...changes,
                        isOpen: true,
                        highlightedIndex: state.highlightedIndex,
                    };
                }
                return changes;
            },
            selectedItem: null,
            onSelectedItemChange: ({selectedItem}) => {
                if (!selectedItem) return;
                handleToggle(selectedItem);
            },
        })
        : {
            isOpen: false,
            getToggleButtonProps: () => ({}),
            getLabelProps: () => ({}),
            getMenuProps: () => ({}),
            highlightedIndex: -1,
            getItemProps: () => ({}),
        };

    const handleSelectAllToggle = () => {
        const newSelection = areAllSelected ? [] : [...options];
        setSelectedItems(newSelection);
        onSelectionChange?.(newSelection);
    };

    return (
        <div className={selectClasses} style={rest.style}>
            {label && !hideLabel && (
                <label htmlFor={id} className='select__label' {...getLabelProps()}>
                    {label}
                </label>
            )}

            {mode === 'static' ? (
                <div className='select__static-list'>
                    {displayOptions.map((option) => (
                        <label key={option.value} className='select__option'>
                            <input
                                type='checkbox'
                                value={option.value}
                                checked={
                                    option.value === 'selectAll'
                                        ? areAllSelected
                                        : selectedItems.some((item) => item.value === option.value)
                                }
                                onChange={() => handleToggle(option)}
                                disabled={disabled}
                                name={name}
                            />
                            <span style={{ width: '45%' }}>{option.label}</span>
                            {option.meta && option.value !== 'selectAll' && (
                                <span style={{ fontSize: '16px', color: 'grey' }}>{option.meta}</span>
                            )}
                        </label>
                    ))}
                </div>
            ) : (
                <div className='select__wrapper'>
                    <div
                        className="select__trigger"
                        {...getToggleButtonProps()}
                    >
                        {selectedItems.length > 0
                            ? `${placeholder ?? t('global.chosen')} (${selectedItems.length})`
                            : placeholderValue}
                        <Icon label="Dropdown icon" size="medium" icon={<MdArrowDropDown color="#5D6071"/>}/>
                    </div>

                    {isOpen && (
                        <ul className='select__menu' {...getMenuProps()}>
                            {displayOptions.map((item, index) => (
                                <li
                                    key={`${item.label}-${index}`}
                                    className={clsx('select__option', {
                                        'select__option--selected': highlightedIndex === index,
                                    })}
                                    {...getItemProps({
                                        item,
                                        index,
                                    })}
                                >
                                    <input
                                        type='checkbox'
                                        checked={
                                            item.value === 'selectAll'
                                                ? areAllSelected
                                                : selectedItems.some((s) => s.value === item.value)
                                        }
                                        value={item.value}
                                        onChange={() => null}
                                        disabled={disabled}
                                    />
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormMultiselect;
