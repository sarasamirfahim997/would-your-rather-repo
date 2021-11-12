import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className=' card p-4'>
			<h3 className='justify-content-center d-flex text-light'>Not Found</h3>
			<p className='justify-content-center d-flex '>Page doesn't exist</p>
			<Link className='justify-content-center d-flex text-decoration-none btn-primary align-self-center w-25 btn-lg' to="/">Return To Dashboard</Link>.
		</div>
	);
}
