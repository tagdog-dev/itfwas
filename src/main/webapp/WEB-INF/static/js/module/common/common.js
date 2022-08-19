(function() {
	let me = window.common = {
		contextPath : null
		,
		//<%-- Function : Ajax 공통 --%>
		call: function( _type, _url, _dataType, _data, _sync, _callBackFunc ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				contentType: "application/json; charset=UTF-8",
				traditional : true,
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					me.hideLoading();

					if ( jqXHR.status == 403 ) {
						alert("로그인 정보가 올바르지 않습니다.");
						location.href = me.getContextPath() + '/login/login.do';
					} else {

						alert('오류가 발생하였습니다. 관리자에게 문의하세요.');
					}
//					if(jqXHR.status == 403){
//						callAlert('fail', getMessage('fail.common.login'), function(){
//							location.reload();
//						});
//					}else if(jqXHR.status == 200 && textStatus == 'parsererror' && jqXHR.responseText.indexOf('fn_Loginvalidation') != -1){
//						callAlert('fail', getMessage('fail.common.login'), function(){
//							location.reload();
//						});
//					} else{
//						callAlert('fail', jqXHR.statusText );
//					}
					console.log( jqXHR );
				},
			});

		},
		//<%-- Function : Ajax call with 로딩바 --%>
		callWithShowLoading: function( _type, _url, _dataType, _data, _sync, _showLoding, _callBackFunc ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
					if (_showLoding == true) {
						me.showLoading();
					}
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				contentType: "application/json; charset=UTF-8",
				traditional : true,
				success: function( result, textStatus, jqXHR ) {
					if (_showLoding == true) {
						me.hideLoading();
					}
					_callBackFunc( result );
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					me.hideLoading();

					if ( jqXHR.status == 403 ) {
						alert("로그인 정보가 올바르지 않습니다.");
						location.href = me.getContextPath() + '/login/login.do';
					} else {

						alert('오류가 발생하였습니다. 관리자에게 문의하세요.');
					}
//					if(jqXHR.status == 403){
//						callAlert('fail', getMessage('fail.common.login'), function(){
//							location.reload();
//						});
//					}else if(jqXHR.status == 200 && textStatus == 'parsererror' && jqXHR.responseText.indexOf('fn_Loginvalidation') != -1){
//						callAlert('fail', getMessage('fail.common.login'), function(){
//							location.reload();
//						});
//					} else{
//						callAlert('fail', jqXHR.statusText );
//					}
					console.log( jqXHR );
				},
			});

		},
		//<%-- Function : Ajax 공통 --%>
		callWithBeforeSend: function( _type, _url, _dataType, _data, _sync, _callBackFunc, _beforeSendFunc , _contextType) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				contentType: (me.isEmpty(_contextType)?"application/json; charset=UTF-8":_contextType),
				beforeSend: function (xhr){
					_beforeSendFunc(xhr);
				},
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					callAlert('fail', jqXHR.statusText );
//					console.log( jqXHR );
				},
			});
		},
		// <%-- Function : Ajax 공통 --%>
		callWithComplete: function( _type, _url, _dataType, _data, _sync, _callBackFunc, _beforeSendFunc, _completeFunc, _contextType ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				contentType: (me.isEmpty(_contextType)?"application/json; charset=UTF-8":_contextType),
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				beforeSend: function (xhr){
					_beforeSendFunc(xhr);
				},
				complete : function(xhr) {
					_completeFunc(xhr);
				}
			});
		},
		// <%-- Function : Ajax 공통 --%>
		callWithError: function( _type, _url, _dataType, _data, _sync, _callBackFunc, _beforeSendFunc, _completeFunc, _errorFunc, _contextType ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				contentType: (me.isEmpty(_contextType)?"application/json; charset=UTF-8":_contextType),
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				beforeSend: function (xhr){
					_beforeSendFunc(xhr);
				},
				complete : function(xhr) {
					_completeFunc(xhr);
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					_errorFunc(jqXHR, textStatus, errorThrown);
				}
			});
		},
		//<%-- Function : Ajax 공통 --%>
		callMultipartRequst: function( _type, _url, _dataType, _data, _sync, _callBackFunc ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
//				dataType: _dataType,
				type: _type,
				data: _data,
//				async: _sync,
				encType: 'multipart/form-data',
				contentType: false,
				processData : false,
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					alert( jqXHR.statusText );
//					console.log( jqXHR );
				},
			});
		},
		//<%-- Function : Ajax 공통 --%>
		callSearch: function( _type, _url, _dataType, _data, _sync, _callBackFunc ) {
			$.ajax ({
				beforeSend : function(jqXHR) {
					jqXHR.setRequestHeader("AJAX", true);
				},
				url: _url,
				dataType: _dataType,
				type: _type,
				data: _data,
				async: _sync,
				crossDomain: true,
				processData: false,
				contentType: "application/json; charset=UTF-8",
				success: function( result, textStatus, jqXHR ) {
					_callBackFunc( result );
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					callAlert('fail', jqXHR.statusText );
//					console.log( jqXHR );
				},
			});
		},
		//<%-- Function : Ajax 공통 --%>
		loadHtml: function( el, url, callBackFunc ) {
			$.ajax ({
				url: url,
				dataType: 'html',
				async: false,
				success: function( result ) {
					if (typeof el == 'string') $( '#' + el ).html( result );
					else if (typeof el == 'object') el.html( result );
					if(!common.isEmpty(callBackFunc)) callBackFunc();
				}
			});

		},

		//<%-- Function : JSON 호출 --%>
		loadJSON: function( url ) {
			let data = "";
			//Ajax 호출 : 데이터
			common.call( 'GET', url, 'json', null, false, function ( result ) {
				data = result;
			} );
			return data;
		},

		//<%-- Function : 통신 결과 체크 --%>
		chkResult: function( _data ) {

			if ( 'SUCCESS' === _data.status ) {

				return true;
			}else if ( 'ACCESS_DENIED' === _data.status ) {
				if(typeof callAlert === 'function'){
					callAlert('fail', '로그인 정보가 올바르지 않습니다.', function() {
						location.href = me.getContextPath() + '/login/login.do';
					}, false);
				}
				return false;

			} else {

//				console.log( _data.status );
				//callAlert('fail',  "error : " + _data.status );
				return false;

			}

		},

		//<%-- Function : 통신 결과 체크 --%>
		chkValid: function( _data ) {

			if ( 'SUCCESS' === _data.status ) {

				return true;
			}else if ( 'ACCESS_DENIED' === _data.status ) {
				if(typeof callAlert === 'function'){
					callAlert('fail', '로그인 정보가 올바르지 않습니다.', function() {
						location.href = me.getContextPath() + '/login/login.do';
					}, false);
				}
				return false;
			} else {

//				console.log( _data.status );
				var data = me.exportData( _data ).resultMsg;
				//callAlert('fail',  data );

				return false;
			}

		},

		//<%-- Function : 통신 결과 Model 추출 --%>
		exportData: function( _data ) {

			return me.nvl( _data.data, "" );

		},

		//<%-- Function : Context Path 추출 --%>
		getContextPath: function() {

			// me.contextPath = "";

			// if (me.contextPath == null) {

			// 	me.call('GET', '/getContextPath.do', 'json', null, false, function (result) {
			// 		//<%-- 호출 결과 체크 --%>
			// 		if (common.chkResult(result)) {
			// 			//<%-- data 주입 --%>
			// 			me.contextPath = common.exportData(result).contextPath

			// 		}
			// 	});

			// }

			// return me.contextPath;

			var hostIndex = location.href.indexOf(location.host) + location.host.length;
			return location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

		},

		limitMaxSize: function( _obj ) {

			if ( _obj.val().length > _obj.maxLength )
				return _obj.val().slice( 0, _obj.maxLength )
			else
				return _obj.val();

		},

		//<%-- Function : 빈 문자열 체크 --%>
		isEmpty: function( _str ) {

			if( typeof _str == 'boolean' )
				return false;
			else if( typeof _str == 'undefined' || _str == null || _str == "" )
				return true;
			else if (typeof _str == 'string' && $.trim(_str).length > 0)
				return false;
			else if (typeof _str == 'object' && _str.length && _str.length > 0 )
				return false;
			else
				return false;

		},
		//<%-- Function : 빈 문자열 체크 --%>
		isNotEmpty: function( _str ) {
				return !me.isEmpty(_str);

		},

		//<%-- Function : NVL --%>
		nvl: function( _str, _defaultStr ) {

			return me.isEmpty( _str ) ? _defaultStr : _str;

		},

		/* elId를 활용한 DatePicker Setting */
		setDatepicker: function ( id ){
			if(me.isEmpty( id )){
				return null;
			}
			$( '#' + id ).datepicker({
				dateFormat: "yy-mm-dd",
				changeMonth: true,
				changeYear: true,
				showMonthAfterYear: true,
				dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			});
		},
		/* jquerySelector를 활용한 DatePicker Setting */
		setDatepickerWidthJquerySelector: function ( jquerySelector ){
			if(me.isEmpty( jquerySelector )){
				return null;
			}
			$( jquerySelector ).datepicker({
				dateFormat: "yy-mm-dd",
				changeMonth: true,
				changeYear: true,
				showMonthAfterYear: true,
				dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			});
		},

		/* 날짜 포맷 함수*/
		formatDate: function (_date){
			if(me.isEmpty( _date)){
				return null;
			}
			var d = new Date(_date);
			var year = d.getFullYear();
			var month = ''+(d.getMonth()+1);
			var day = ''+d.getDate();

			if (month.length <2) month = '0'+month;
			if (day.length < 2) day = '0'+day;

			return [year, month, day].join('-');
		},

		/* 날짜 시간 포맷 함수*/
		formatDatetime: function (_datetime, _secYn){
			if(me.isEmpty( _datetime)){
				return null;
			}
			var d = new Date(_datetime);
			var year = d.getFullYear();
			var month = ''+(d.getMonth()+1);
			var day = ''+d.getDate();
			var hh = ('0'+''+d.getHours()).slice(-2);
			var mm = ('0'+''+d.getMinutes()).slice(-2);
			var ss = ('0'+''+d.getSeconds()).slice(-2);

			if (month.length <2) month = '0'+month;
			if (day.length < 2) day = '0'+day;

			if (me.isEmpty(_secYn) || _secYn == 'Y') return [year, month, day].join('-') + ' ' + [hh, mm, ss].join(':');
			else if (!me.isEmpty(_secYn) && _secYn == 'N') return [year, month, day].join('-') + ' ' + [hh, mm].join(':');

		},
		/**
		 * 오브젝트와 타입을 받아서 일자 또는 일시 문자열 반환
		 * _obj: jsonObject : 객체 오브젝트 내부에 registDt 와 updtDt 객제를 가지고 있어야 한다. 없으면 null 반환
		 * _type: 문자열로 표출할 형식 ('date':년월일(YYYY-MM-DD), 'datetime':년월일시분(YYYY-MM-DD HH24:MI), 기본값 'date')
		 *
		 */
		getLastUpdtDt: function(_obj, _type){

			_type = (_type?_type:'date')
			//_obj 확인
			if(! _obj){
				return null;
			}

			//_type 확인
			if(_type == 'datetime'){
				//일시 표출
				if(_obj.updtDt){
					return me.formatDatetime(_obj.updtDt);
				}else if(_obj.registDt){
					return me.formatDatetime(_obj.registDt);
				}else{
					//updtDt 와 registDt 모두 없을 경우 null 반환
					return null;
				}
			}else{
				//일자 표출
				if(_obj.updtDt){
					return me.formatDate(_obj.updtDt);
				}else if(_obj.registDt){
					return me.formatDate(_obj.registDt);
				}else{
					//updtDt 와 registDt 모두 없을 경우 null 반환
					return null;
				}
			}
		},

		// 그룹코드를 기반으로 상세 코드 목록을 가져오는 함수
		getUrl: function( key ){
			if( common.isEmpty( key) ){
				//그룹 코드
				throw 'getUrl:잘못된 접근입니다.';
			}
			var url = "";
			me.call('GET',me.getContextPath()+'/getUrl.do?key='+key, 'json', null, false, function( result ){
				//<%-- 호출 결과 체크 --%>
				if ( common.chkResult( result ) ) {
					//<%-- data 주입 --%>
					url = common.exportData( result ).url;
				}
			});
			return url;
		},

		// 그룹코드를 기반으로 상세 코드 목록을 가져오는 함수
		getCodeList: function( groupCode ){
			if(me.isEmpty(groupCode)){
				//그룹 코드
				throw 'getCodeData:잘못된 접근입니다.';
			}
			if(me.codeList == undefined){
				me.codeList = {};
			}
			if(me.codeList[groupCode]){
				return me.codeList[groupCode];
			}

        	me.call("POST", me.getContextPath()+"/cmm/selectCmmCodeList.do", "json", JSON.stringify({ codeClcd : groupCode }), false, function(result) {
        		me.codeList[groupCode] = result;
		    });

			return me.codeList[groupCode];
		},

		// 그룹코드를 기반으로 상세 코드 목록을 가져오는 함수
		getCodeName: function( groupCode, detailCode ){

			if( me.isEmpty( groupCode ) || me.isEmpty( detailCode ) ) throw 'getCodeData:잘못된 접근입니다.';

			var name = "";
			var tempList = [];

			if(me.codeList == undefined){
				me.codeList = {};
			}

			if(!me.codeList[groupCode]){
				me.codeList[groupCode] = me.getCodeList(groupCode);
			}

			for (var i in me.codeList[groupCode]){
				if (me.codeList[groupCode][i]['code'] == detailCode) {
					name = me.codeList[groupCode][i]['codeValue'] ;
					break;
				}
			}

			return name;
		},

		//HTML tag encode(XSS)
		//htmlEncode('<'); -> '&lt;'
		htmlEncode: function(str) {
			var txt = document.createTextNode(str);
			var p = document.createElement('p');

			p.appendChild(txt);

			return p.innerHTML;
		},

		//HTML tag decode(XSS)
		//htmlDecode('&lt;'); -> '<'
		htmlDecode: function(str) {
			var doc = new DOMParser().parseFromString(str, 'text/html');
			return doc.documentElement.textContent;

		},

		//정수 천 단위 comma 함수
		numberFormat: function(param) {
			if (me.isEmpty(param))
				return param;
			var str = param.toString();
			return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},

		//이메일 패턴 정규식 (javascript)
		isEmail: function ( str ) {

			var regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			if ( !regex.test( str ) ) {
				return false;
			} else {
				return true;
			}

		},

		//전화번호 패턴 정규식 (javascript)
		isMobileNumber: function ( str ) {

			var regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
			if ( !regex.test( str ) ) {
				return false;
			} else {
				return true;
			}

		},

		//전화번호 패턴 정규식 (markup) // html5가 아니라서 적용
		checkMobileNumber: function ( obj ) {
			obj.value = obj.value.replace(/[^0-9]/g,"");
			if ( obj.value.length > obj.max ) {
				obj.value = obj.value.slice(0, obj.max );
			}
		},

		/* 임시 파라미터 가져오는 함수.*/
		getParam: function (param){

			var requestParam ='';
			var url = unescape(decodeURI(location.href));
			var paramArr = (url.substring(url.indexOf('?')+1,url.length)).split('&');

			for(var i = 0 ; i < paramArr.length ; i++){

				var temp = paramArr[i].split('=');
				if(temp[0].toUpperCase() == param.toUpperCase()){
					requestParam = paramArr[i].split('=')[1];
					break;
				}

			}

			return requestParam;
		},

		getAllParam: function(){

			let url = new URL( unescape( decodeURI( location.href ) ) );
			let params = new URLSearchParams( url.search );

			// params.append( 'test', 'test' );
			// params.toString(); -> return String
			// params.get( 'test' ); -> return String
			// params.has( 'test' ); -> return boolean
			me.param = params;
			return params;

		},

		//<%-- Function : 페이지 클릭 이벤트 발생시 현재 페이지를 param 대입 --%>
		replaceParam: function( key, value ) {
//			var renewURL  = location.href;
//			var regexp = new RegExp( '&' + data.paginationPolicy.currentPageParamKey + '=([0-9]+)', 'gi' );
//			renewURL = renewURL.replace( regexp, '' );
//			renewURL += '&' + data.paginationPolicy.currentPageParamKey + '=' + data.pagination.currentPageNo;
//			history.pushState( null, null, renewURL );
			me.param = me.getAllParam();
			if ( typeof( history.pushState ) == 'function' ) {
				me.param.set( key, value );
				me.refreshParam();
			}
		},

		refreshParam: function() {
			var url = location.protocol + '//' + location.host + location.pathname + '?' + me.param.toString();
			if(url.charAt(url.length-1) =='?' ){
				url = url.substr(0, url.length-1);
			}
			history.pushState( null, null, url );
		},
		removeParam: function(key){
			me.param = me.getAllParam();
			if ( typeof( history.pushState ) == 'function' ) {
				me.param.delete(key);
				me.refreshParam();
			}
		},

		openPop : function (obj) {

			$("#" + obj.id).remove();
			var divPop = document.createElement('div');
			var data = {};

			divPop.id = obj.id;

			if(obj.data != 'undefined' && obj.data != null && obj.data != "") {
				data = obj.data;
			}

			document.body.appendChild(divPop);

			me.call('post', obj.url, 'text', JSON.stringify( data ), false, function( result ) {

				$("#" + obj.id).html(result);

				//common.js에 있는 팝업 닫기 이벤트
				$('[data-popup-close]').on('click', function(e)  {
					var targeted_popup_class = jQuery(this).attr('data-popup-close');
					$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
					e.preventDefault();
			    });

				if( typeof obj.callBackFunc === "function" ) {

					divPop.addEventListener('resultEvent', function (e) {
						obj.callBackFunc(e);
						e.stopPropagation();

						divPop.removeEventListener('resultEvent', arguments.callee, false);
					}, false);
				}
			});
		},

		getLoginInfo : function () {
			let url = '/cmm/selectLoginInfo.do';
			var loginInfo;

			me.call('post', url, 'text', null, false, function( result ) {

				if ( result == null || result == '') {
					location.href = me.getContextPath() + '/login/login.do';
				} else {
					loginInfo = result;
				}

			});

			return JSON.parse(loginInfo);
		},

		showLoading : function () {
			$(".loader-wrap").show();
		},

		hideLoading : function () {
			$(".loader-wrap").hide();
		},

		formatJibun: function( jibun1, jibun2, san ) {
			let jibun = Number( jibun1 ).toString();
			jibun += ( '' === jibun1 || '0000' === jibun2 ? '' : '-' ) + ( 0 === Number( jibun2 ) ? '' : Number( jibun2 ).toString() );
			return ( '2' === san ? '산' : '' ) + jibun;
		},

		/**
		 * 익스플로러 브라우저 버전 확인
		 * @return : 없음
		 */
		getInternetExplorerVersion: function () {
			var rv = -1;

			if (navigator.appName == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
					rv = parseFloat(RegExp.$1);
			}
			return rv;
		},

		getChromeVersion: function () {
			var raw = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
			if (raw == null || raw.length != 5) {
				return undefined;
			}
			raw = raw.map(function (raw) { return parseInt(raw, 10) });
			return raw[1];
		},

		/**
		 * 브라우저 명 조회
		 * @return : 없음
		 */
		getBrowserNm: function (){
			var agt = navigator.userAgent.toLowerCase();
			var trident = navigator.userAgent.match(/Trident\/(\d)/i);

			if (agt.indexOf("chrome") != -1) return 'Chrome';
			if (agt.indexOf("opera") != -1) return 'Opera';
			if (agt.indexOf("staroffice") != -1) return 'Star Office';
			if (agt.indexOf("webtv") != -1) return 'WebTV';
			if (agt.indexOf("beonex") != -1) return 'Beonex';
			if (agt.indexOf("chimera") != -1) return 'Chimera';
			if (agt.indexOf("netpositive") != -1) return 'NetPositive';
			if (agt.indexOf("phoenix") != -1) return 'Phoenix';
			if (agt.indexOf("firefox") != -1) return 'Firefox';
			if (agt.indexOf("safari") != -1) return 'Safari';
			if (agt.indexOf("skipstone") != -1) return 'SkipStone';
			if (agt.indexOf("msie") != -1 || trident != null) return 'Internet Explorer';
			if (agt.indexOf("netscape") != -1) return 'Netscape';
			if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';

		 	return "";
		},

		browserCheck: function () {
			var bNm = "";

			bNm = me.getBrowserNm();

			//크롬과 IE가 아닐경우
			if (bNm != "" && bNm != "Chrome" && bNm != "Internet Explorer") {
				return false;
			}

			//익스플로러일경우 버전확인
			if (bNm == "Internet Explorer") {
				var trident = navigator.userAgent.match(/Trident\/(\d)/i);

				var version = me.getInternetExplorerVersion();

				if (trident != null && navigator.appName == 'Netscape') version = 11;

				if (version <= 11) {
					return false;
				}
			} else if (bNm == "Chrome") {
				var version = me.getChromeVersion();
				if (version < 80) {
					return false;
				}
			}

			return true;
		},

		noting: null

	};

})();