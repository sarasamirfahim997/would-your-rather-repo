import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div>
			<h3>Not Found</h3>
			<p>Page doesn't exist</p>
			<Link to="/home">Home</Link>.
		</div>
	);
}
