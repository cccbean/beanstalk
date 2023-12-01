import { User } from "../App";

type Props = {
  myUser: User;
}

function Menu({myUser}: Props) {
	return (
		<ul className="h-full border-r border-base-content menu menu-vertical p-2">
			<div className="flex flex-col gap-2 flex-1">
				<li className="tooltip tooltip-right" data-tip="Chat">
					<a>C</a>
				</li>
				<li className="tooltip tooltip-right" data-tip="Friends">
					<a>F</a>
				</li>
			</div>

			<div className="flex flex-col gap-2">
				<li className="tooltip tooltip-right" data-tip="Profile">
					<a>{myUser.username[0]}</a>
				</li>
				<li className="tooltip tooltip-right" data-tip="Expand">
					<a>E</a>
				</li>
			</div>
		</ul>
	);
}

export default Menu;
