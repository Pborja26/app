import React from "react";

export type BaseStyleProps = {
	[k in keyof React.CSSProperties]?: React.CSSProperties[k];
};
