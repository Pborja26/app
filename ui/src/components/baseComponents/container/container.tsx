import { ContainerProps } from "./container.types";

const Container = ({ children, onCLick, ...props }: ContainerProps) => {
	const handleClick = () => {
		if (!onCLick) return;
		onCLick();
	};

	return (
		<div
			style={{
				...props,
				display: "flex",
				flex: 1,
			}}
			onClick={() => handleClick()}
		>
			{children}
		</div>
	);
};

export default Container;
