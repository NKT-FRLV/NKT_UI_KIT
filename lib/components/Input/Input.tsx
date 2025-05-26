import { Input as ShadInput } from "../ui/input";
import { cn } from "@/lib/utils";
import style from "./style.module.css";

import React from 'react'

type InputVariant = "default" | "primary" | "secondary" | "danger" | "success" | "warning";

export type SizeVariant = "sm" | "md" | "lg";

export interface InputProps extends React.ComponentProps<"input"> {
	variant?: InputVariant;
	btnText?: string; // текст для кнопки, если она нужна
	btnAction?: () => void; // функция для действия, например, для кнопки
	icon?: React.ReactNode;
	className?: string; // дополнительные классы для стилизации
	sizeVariant ?: SizeVariant;
}

export const Input = ({
	variant = "default",
	sizeVariant  = "md",
	btnAction,
	btnText = "Action",
	icon,
	className,
	...props
}: InputProps) => {

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && btnAction) {
			e.preventDefault(); // предотвращаем стандартное поведение Enter
			btnAction(); // вызываем действие кнопки
		}
	}


	return (
		<div
			className={cn(
				style.container,
				style[sizeVariant], // если ты хочешь разные размеры
				style[variant], // если ты хочешь разные варианты обводки
				className
			)}
		>
			{icon && <span className={style.icon}>{icon}</span>}
			<ShadInput className={style.input} {...props} onKeyDown={btnAction ? (e) => handleKeyDown(e) : props.onKeyDown} />
			{btnAction && <button className={style.actionBtn} onClick={() => btnAction()}>{btnText}</button>}
		</div>
	);
};

