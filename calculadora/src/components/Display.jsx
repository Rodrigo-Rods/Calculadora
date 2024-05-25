import React from "react";
import "./Display.css";

let Display = (props) => {
	let value =
		typeof props.value === "number" ? props.value.toFixed(9) : props.value;
	let values = props.values;
	return (
		<div className="display">
			<span className="blink-text">{value}</span>
		</div>
	);
};

export default Display;
