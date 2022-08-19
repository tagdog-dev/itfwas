package com.itf.was.model.enums;

@SuppressWarnings("unused")
public enum ResultStatus {

	// COMMON
	// 이상 없음
	SUCCESS( 200, "E200-0000", " Success " ),
	// 잘못된 요청 분류
	INVALID_INPUT_VALUE( 400, "E400-0000", " Invalid Input Value " ),
	EMAIL_DUPLICATION( 400, "E400-1001", " Email Value Duplication " ),
	// 허용되지 않은 인증 분류
	ACCESS_DENIED( 401, "E401-0000", " Access is Denied " ),
	LOGIN_REQUIRED( 401, "E401-0001", " Login is Required " ),
	// 결제 필요 분류
	IS_NOT_PAID_CALL( 402, "E402-0000", " Access is Denied " ),
	// 허용되지 되지 않은 인가 분류
	HANDLE_ACCESS_DENIED( 403, "E403-0000", " Access is Denied " ),
	// 잘못된 URL, URI
	ILLEGAL_REQUEST( 404, "E404-0000", " Illegal Request " ),
	DEVELOP_NOT_YET( 901, "E404-1001", " develop not yet" ),
	// 허용되지 않은 메소드 분류
	METHOD_NOT_ALLOW( 405, "E405-0000", " Invalid Input Value " ),
	// SYSTEM ERROR
	SYSTEM_ERROR( 424, "E424-0000", " System Error "),
	// 이상
	FAILED( 500, "E500-0000", " Failed" )
	;

	private final String code;
	private final String message;
	private final int status;

	ResultStatus( final int status, final String code, final String message ) {

		this.status = status;
		this.message = message;
		this.code = code;

	}

	public String code() {
		return this.code;
	}

	public String message() {
		return this.message;
	}

	public int status() {
		return this.status;
	}

}
