import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { T_Input_Label_Number } from "@/types/input";

export function InputLabelNumber({
	headerTitle,
	getValue,
	placeholder,
	prefix,
	suffix,
}: T_Input_Label_Number) {
	const [input, setInput] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let val = parseInt(e.target.value);
		setInput(isNaN(val) ? 0 : val);
	}, []);
	const increment = useCallback(() => {
		if (inputRef.current) {
			let val = parseInt(inputRef.current.value);
			inputRef.current.value = String(isNaN(val) ? 0 + 1 : val + 1);
			setInput(isNaN(val) ? 1 : val + 1);
		}
	}, []);
	const decrement = useCallback(() => {
		if (
			inputRef.current &&
			(inputRef.current.value as unknown as number) >= 1
		) {
			let val = parseInt(inputRef.current.value) - 1;
			inputRef.current.value = String(val);
			setInput(val);
		}
	}, []);
	useMemo(() => getValue(input), [getValue, input]);
	return (
		<fieldset className="w-full">
			<h3 className="mb-1 text-sm font-semibold text-[#232F3E] leading-6">{headerTitle}</h3>
			<div className="flex justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 sm:text-sm sm:leading-6 px-3">
				{prefix && <span>$</span>}
				<input
					ref={inputRef}
					onChange={inputChange}
					value={inputRef.current?.value}
					type="number"
					placeholder={placeholder}
					className="w-full px-1"
				/>
				{suffix ? (
					<div className="flex flex-col items-center gap-[0.4rem]">
						<button
							className="relative  px-[3px] top-2"
							onClick={increment}
						>
							<RxChevronUp size={18} />
						</button>
						<button
							className="relative  px-[3px] bottom-2"
							onClick={decrement}
						>
							<RxChevronDown size={18} />
						</button>
					</div>
				) : null}
			</div>
		</fieldset>
	);
}
