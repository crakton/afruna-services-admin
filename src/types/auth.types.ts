export type TSuccessResponse<X> = {
success: boolean;
message: string;
data: X;
};



export type TUnAuthorized = {
	success: false;
	message: "jwt expired";
	error: {
		name: "TokenExpiredError";
		message: "jwt expired";
		expiredAt: string;
	};
};

export type TErrorResponse = {
	success: boolean;
	message: string;
	error: {
		statusCode: number;
		data: [] | string | null;
		message: string;
	};
};