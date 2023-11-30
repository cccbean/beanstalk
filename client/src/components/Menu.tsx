function Menu() {
	return (
		<ul className="h-full border-r border-base-content flex flex-col justify-between p-2">
			<div className="flex flex-col gap-2">
				<li className="tooltip tooltip-right" data-tip="Chat">
					<button className="btn">C</button>
				</li>
				<li className="tooltip tooltip-right" data-tip="Friends">
					<button className="btn">F</button>
				</li>
			</div>

			<div className="flex flex-col gap-2">
				<li className="tooltip tooltip-right" data-tip="Profile">
					<button className="btn">P</button>
				</li>
				<li className="tooltip tooltip-right" data-tip="Expand">
					<button className="btn">E</button>
				</li>
			</div>
		</ul>
	);
}

export default Menu;
