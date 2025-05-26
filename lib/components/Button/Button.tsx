import React from "react";
import style from "./button.module.css";
import clsx from "clsx";

/**
 * Button component for React applications.
 *
 * @param {ButtonProps} props - The properties for the button component.
 * @returns {JSX.Element} The rendered button element.
 *
 * @example
 * <Button variant="primary" size="lg">Click Me</Button>
 */

export type ButtonVariant =
	| "default"
	| "primary"
	| "secondary"
	| "danger"
	| "success"
	| "ghost"
	| "warning";

export type SizeVariant = "sm" | "md" | "lg";

type BaseProps = {
	children?: React.ReactNode;
	variant?: ButtonVariant;
	size?: SizeVariant;
	loading?: boolean;
	loadIndicator?: React.JSX.Element;
	type?: "button" | "submit" | "reset";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type IconModeProps =
	| {
			iconOnly: true;
			icon: React.ReactNode;
			children?: never;
	  }
	| {
			iconOnly?: false;
			icon?: React.ReactNode;
			children?: React.ReactNode;
	  };

export type ButtonProps = BaseProps & IconModeProps;

export const Button = ({
	children,
	type,
	icon,
	iconOnly,
	size = "md",
	variant = "ghost",
	loading = false,
	loadIndicator,

	...props
}: ButtonProps) => {
	const variants: Record<ButtonVariant, string> = {
		default: style.default,
		ghost: style.ghost,
		primary: style.primary,
		secondary: style.secondary,
		danger: style.danger,
		success: style.success,
		warning: style.warning,
	};

	const sizes: Record<SizeVariant, string> = {
		sm: style.sm,
		md: style.md,
		lg: style.lg,
	};

	return (
		<button
			type={type}
			className={clsx(style.button, props.className, sizes[size], {
				[variants[variant]]: variant,
				[style.iconGap]: icon && !iconOnly,
				[style.icon]: iconOnly,
				[style.loading]: loading,
			})}
			disabled={loading || props.disabled}
			{...(icon ? { "data-has-icon": true } : {})}
			{...props}
		>
			{/* Loader поверх всего, но контент остаётся в DOM для сохранения размеров */}
			{loading && ((loadIndicator && <div className={style.absolute} >{loadIndicator}</div>) || <div className={style.spinner} aria-hidden="true" />)}

			{/* Визуально скрываем контент, но он остаётся для размера */}
			
				{icon && icon}
				{!iconOnly && children}
			
		</button>
	);
};
