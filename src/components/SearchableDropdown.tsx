import React, { useState, useRef, useEffect } from "react";
import { Form, Dropdown, InputGroup } from "react-bootstrap";
import { Board } from "../types/board";
import { X } from "react-bootstrap-icons";

interface SearchableDropdownProps {
    options: Board[];
    placeholder?: string;
    onSelect: (value: Board) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    options,
    placeholder = "Type to search...",
    onSelect,
}) => {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (value: Board) => {
        setQuery(value.name);
        setShowDropdown(false);
        setHighlightedIndex(-1);
        onSelect(value);
    };

    const handleClear = () => {
        setQuery("");
        setShowDropdown(false);
        setHighlightedIndex(-1);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                handleSelect(filteredOptions[highlightedIndex]);
            }
        } else if (e.key === "Escape") {
            setShowDropdown(false);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Delay to allow item click to register
        setTimeout(() => {
            if (!dropdownRef.current?.contains(document.activeElement)) {
                setShowDropdown(false);
            }
        }, 150);
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            const el = document.getElementById(`option-${highlightedIndex}`);
            el?.scrollIntoView({ block: "nearest" });
        }
    }, [highlightedIndex]);
    return (
        <div style={{ position: "relative" }} ref={dropdownRef}>
            <InputGroup>
                <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowDropdown(true);
                        setHighlightedIndex(-1);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                {query && (
                    <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={handleClear}
                        aria-label="Clear"
                    >
                        <X />
                    </InputGroup.Text>
                )}
            </InputGroup>

            {showDropdown && filteredOptions.length > 0 && (
                <Dropdown.Menu
                    show
                    style={{
                        position: "absolute",
                        width: "100%",
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {filteredOptions.map((option, index) => (
                        <Dropdown.Item
                            id={`option-${index}`}
                            key={option.id}
                            active={highlightedIndex === index}
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            )}
        </div>
    );
};

export default SearchableDropdown;
