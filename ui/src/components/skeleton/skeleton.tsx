import { StyledSkeleton } from "./skeleton.styled";
import { BaseStyleProps } from "../../utils/baseTypes.types";

const Skeleton = ({ ...props }: BaseStyleProps) => {
	return (
		<StyledSkeleton
			style={{ ...props, flex: 1, height: "100%", borderRadius: 12 }}
		/>
	);
};

export default Skeleton;
