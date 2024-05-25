import React, { useState } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
	displayValue: "0",
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0,
};

const Calculator = () => {
	const [state, setState] = useState({ ...initialState });

	function clearMemory() {
		setState({ ...initialState });
	}

	function setOperation(operation) {
		if (state.current === 0) {
			setState({ ...state, operation, current: 1, clearDisplay: true });
		} else {
			const equals = operation === "=";
			const currentOperation = state.operation;

			const values = [...state.values];
			try {
				values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);

				if (isNaN(values[0]) || !isFinite(values[0])) {
					this.clearMemory();
					return;
				}
			} catch (e) {
				values[0] = state.values[0];
			}

			if (equals) {
				values[1] = values[0] - state.values[0];
			}

			let displayValue = values[0].toString();
			if (displayValue.length > 9) {
				displayValue = parseFloat(displayValue).toFixed(9);
			}

			setState({
				...state,
				displayValue: values[0],
				operation: equals ? currentOperation : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values,
			});
		}
	}

	function addDigit(n) {
		const clearDisplay = state.displayValue === "0" || state.clearDisplay;
		const currentValue = clearDisplay ? "" : state.displayValue;
		let displayValue = currentValue + n;

		if (displayValue.length > 9) {
			displayValue = parseFloat(displayValue).toFixed(9);
		}

		setState({
			...state,
			displayValue,
			clearDisplay: false,
			values:
				state.current === 0
					? [displayValue, state.values[1]]
					: [state.values[0], displayValue],
		});
	}

	return (
		<div className="calculator-case">
			<div className="calculator">
				<Display value={state.displayValue} className="blinking" />
				<Button label="AC" triple click={clearMemory} />
				<Button label="/" operation click={() => setOperation("/")} />
				<Button label="7" click={() => addDigit("7")} />
				<Button label="8" click={() => addDigit("8")} />
				<Button label="9" click={() => addDigit("9")} />
				<Button label="*" operation click={() => setOperation("*")} />
				<Button label="4" click={() => addDigit("4")} />
				<Button label="5" click={() => addDigit("5")} />
				<Button label="6" click={() => addDigit("6")} />
				<Button label="-" operation click={() => setOperation("-")} />
				<Button label="1" click={() => addDigit("1")} />
				<Button label="2" click={() => addDigit("2")} />
				<Button label="3" click={() => addDigit("3")} />
				<Button label="+" operation click={() => setOperation("+")} />
				<Button label="0" double click={() => addDigit("0")} />
				<Button label="." click={() => addDigit(".")} />

				<Button label="=" operation click={() => setOperation("=")} />
			</div>
		</div>
	);
};

export default Calculator;
