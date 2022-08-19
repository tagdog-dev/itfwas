package com.itf.was.common.util;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

public class ObjectCheck {

	/**
	 * Object type 변수가 비어있는지 체크
	 *
	 * @param obj 체크할 object
	 * @return 비어있으면 true, 비어있지 않으면 false
	 */
	public static Boolean empty( Object obj ) {
		if ( obj instanceof String ) return "".equals( obj.toString().trim() );
		else if ( obj instanceof Integer ) return (Integer) obj == 0;
		else if ( obj instanceof Long ) return (Long) obj == 0L;
		else if ( obj instanceof List ) return ( ( List<?> ) obj ).isEmpty();
		else if ( obj instanceof Map) return ( ( Map<?, ?> ) obj ).isEmpty();
		else if ( obj instanceof Object[] ) return Array.getLength(obj) == 0;
		else return obj == null;
	}

	/**
	 * Object type 변수가 비어있지 않은지 체크
	 *
	 * @param obj 체크할 object
	 * @return 비어있지 않으면 true, 비어있으면 false
	 */
	public static Boolean notEmpty( Object obj ) {
		return !empty( obj );
	}

	/**
	 * 문자열이 같은지 체크
	 *
	 * @param str1 비교할 첫번재 문자열
	 * @param str2 비교할 두번째 문자열
	 * @return 두 문자열이 같으면 true, 다르면 false
	 */
	public static Boolean equals( String str1, String str2 ) {
		return !empty(str1) && !empty(str2) && str1.equals(str2);
	}

	/**
	 * 문자열이 다른지 체크
	 *
	 * @param str1 비교할 첫번재 문자열
	 * @param str2 비교할 두번째 문자열
	 * @return 두 문자열이 다르면 true, 같으면 false
	 */
	public static Boolean notEquals( String str1, String str2 ) {
		return !empty(str1) && !empty(str2) && !str1.equals(str2);
	}

	/**
	 * Array size 0인지 체크
	 *
	 * @param arr 체크할 목록
	 * @return 목록 size가 0이면 true, 아니면 false
	 */
	public static Boolean zero( List<Object> arr ) {
		return !empty(arr) && arr.size() == 0;
	}

	/**
	 * Array size 0이 아닌지 체크
	 *
	 * @param arr 체크할 목록
	 * @return 목록 size가 0이 아니면 true, 0이면 false
	 */
	public static Boolean notZero( List<Object> arr ) {
		return !empty(arr) && arr.size() != 0;
	}

	/**
	 * Y인지 체크
	 *
	 * @param str Y인지 체크할 문자열
	 * @return Y이면 true, 아니면 false
	 */
	public static Boolean atY( String str ) {
		return !empty(str) && str.equals("Y");
	}

	/**
	 * N인지 체크
	 *
	 * @param str N인지 체크할 문자열
	 * @return N이면 true, 아니면 false
	 */
	public static Boolean atN( String str ) {
		return !empty(str) && str.equals("N");
	}

	/**
	 * 포함되었는지 체크
	 *
	 * @param list 체크할 문자열 목록
	 * @param str 체크 문자열
	 * @return 포함이 되었으면 true, 아니면 false
	 */
	public static Boolean contains(List<String> list, String str ) {
		return list.size() > 0 && list.contains(str);
	}

}
