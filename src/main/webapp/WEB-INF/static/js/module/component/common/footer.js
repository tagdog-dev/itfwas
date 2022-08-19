//<%-- 메인 헤더 컴포넌 --%>
function footer() {
	let me = {

		startup: function() {
			me.setView( arguments[0] );
		},

		setView: function ( args ) {
			if ( !common.isEmpty( args.elId ) ) {
				common.loadHtml( args.elId, '/html/footer/mainFooter.html', function() {
					// <%-- 변수 초기화 --%>
					me.setVariables( args );
					// <%-- 이벤트 초기화 --%>
					me.setEvents();
					// <%-- 모듈 초기화 --%>
					me.initialize();
				} );
			}
		},

		setVariables: function ( args ) {

			//<%-- 모델링 --%>
			me.data = {
				  elId 					: 'mainFooter'
				, el 					: null

				, url: { 													// <%-- URL --%>
				}
				, el: {														// <%-- HTML 요소 --%>
					btn 				: $( '#btn' ) 						// <%-- 버튼 --%>
				}
			};

			//<%-- component model --%>

			// 모델 초기값 세팅
			if ( typeof args != 'undefined' && args != null && args !== "" ) {
				me.data.elId 			= common.nvl( args.elId, 			me.data.elId );
				me.data.el	 			= common.nvl( args.el, 				me.data.el );
			}

		},

		setEvents: function () {

			//<%-- 버튼 클릭 --%>
			me.data.el.btn.on( 'click', function () {
				me.test();
			} );

			//<%-- setter 커스터마이징 : flex binding 기능 --%>
			Object.defineProperty( me.data, 'elId', {
				set: function ( value ) {
					me.data._elId = value;
					me.data._el = $( '#' + me.data._elId );
				}
				, get: function () {
					return me.data._elId;
				}
			} );
			me.data.elId = me.data.elId;

			Object.defineProperty( me.data, 'el', {
				set: function ( value ) {
					me.data._el = value;
					me.data._elId = me.data._el.attr( 'id' );
				}
				, get: function () {
					return me.data._el;
				}
			} );
			me.data.el = me.data.el;

		},

		initialize: function () {
			me.test();
		},

		//<%-- Function : test --%>
		test: function(  ) {
			console.log( 'main footer 세팅 완료' );
		},

		noting: null

	};
	return me;
}