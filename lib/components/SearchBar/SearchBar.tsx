import React, { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { Search, Loader2 } from "lucide-react";

// Типы для вариантов компонента
export type SearchBarVariant = "default" | "glass" | "minimal";

// Интерфейс пропсов для SearchBar
export interface SearchBarProps {
	/** Плейсхолдер для инпута */
	placeholder?: string;
	/** Коллбек для обработки поиска */
	onSearch?: (query: string) => void;
	/** Состояние загрузки */
	loading?: boolean;
	/** Дополнительные CSS классы */
	className?: string;
	/** Вариант стилизации */
	variant?: SearchBarVariant;
	/** Значение по умолчанию */
	defaultValue?: string;
	/** Контролируемое значение */
	value?: string;
	/** Коллбек для изменения значения */
	onChange?: (value: string) => void;
	/** Отключить компонент */
	disabled?: boolean;
	/** Максимальная длина запроса */
	maxLength?: number;
	/** Коллбек для очистки поиска */
	onClear?: () => void;
	/** Автофокус при монтировании */
	autoFocus?: boolean;
	/** ID для accessibility */
	id?: string;
	/** Aria-label для accessibility */
	"aria-label"?: string;
}

// Типы для стилей вариантов
type VariantStyles = Record<SearchBarVariant, string>;

export const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = "Type...",
	onSearch,
	loading = false,
	className = "",
	variant = "default",
	defaultValue = "",
	value,
	onChange,
	disabled = false,
	maxLength,
	autoFocus = false,
	id,
	"aria-label": ariaLabel,
}) => {
	// Состояние для неконтролируемого режима
	const [internalValue, setInternalValue] = useState<string>(defaultValue);

	// Определяем текущее значение (контролируемый vs неконтролируемый)
	const currentValue = value !== undefined ? value : internalValue;
	const isControlled = value !== undefined;

	// Обработчик изменения значения
	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const newValue = e.target.value;

		if (!isControlled) {
			setInternalValue(newValue);
		}

		onChange?.(newValue);
	};

	// Обработчик отправки поиска
	const handleSubmit = (): void => {
		const trimmedValue = currentValue.trim();
		if (trimmedValue && onSearch && !disabled && !loading) {
			onSearch(trimmedValue);
		}
	};

	// Обработчик нажатия Enter
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
		}
	};

	// Стили для разных вариантов
	const variantStyles: VariantStyles = {
		default: `rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white`,
		glass: `rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 text-white`,
		minimal: `rounded-lg bg-gray-50 hover:bg-gray-100 border-0`,
	};

	const variatsStyleButton: VariantStyles = {
		default: "rounded-r-xl",
		glass: "rounded-r-2xl",
		minimal: "rounded-r-lg",
	};

	const wrapperStyles = `
	relative flex items-center w-full max-w-md transition-all duration-300 ease-out
	will-change-transform
	${variantStyles[variant]}
	${className}
`;
	// Определяем, показывать ли кнопку поиска как активную
	const canSearch = currentValue.trim().length > 0 && !loading && !disabled;

	return (
		<div className={wrapperStyles}>
			{/* Search Icon */}
			<div className="absolute left-4 z-10">
				{loading ? (
					<Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
				) : (
					<Search
						className={
							"h-5 w-5 transition-colors duration-200 text-blue-500"
						}
					/>
				)}
			</div>

			{/* Input Field */}
			<input
				id={id}
				type="text"
				value={currentValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={disabled || loading}
				maxLength={maxLength}
				autoFocus={autoFocus}
				aria-label={ariaLabel || placeholder}
				className={`
	w-full h-12 pl-12 pr-20 focus:outline-none bg-transparent
	placeholder:text-gray-400 text-gray-700
	
	focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
	transition duration-200 ease-in-out
	${variant === "glass" ? "text-white placeholder:text-white/60" : ""}
	disabled:opacity-50 disabled:cursor-not-allowed
	${variatsStyleButton[variant]?.replace("rounded-r", "rounded")}
`}
			/>

			{/* Search Button */}
			<button
				type="button"
				onClick={handleSubmit}
				disabled={!canSearch}
				aria-label="Realize search"
				className={`
	absolute right-0 h-12 w-20 flex items-center justify-center
	will-change-transform font-medium text-sm transition duration-200
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
	${variatsStyleButton[variant]}
	${
		canSearch
			? "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md"
			: "bg-gray-100 text-gray-400 cursor-not-allowed"
	}
	disabled:transform-none
`}
			>
				{loading ? "..." : "Search"}
			</button>
		</div>
	);
};
