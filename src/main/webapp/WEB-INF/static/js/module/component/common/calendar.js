function calendar() {
	var me = {

		startup : function() {
			me.setView(arguments[0]);
		},

		setView: function(args) {

			if (common.isNotEmpty(args.elId) && $('#' + args.elId).length > 0 && common.isNotEmpty(args.htmlUrl)) {

				common.loadHtml(args.elId, args.htmlUrl, function() {

					// <%-- 변수 초기화 --%>
					me.setVariables(args);

					// <%-- 이벤트 초기화 --%>
					me.setEvents();

					// <%-- 모듈 초기화 --%>
					me.initialize();

				});

			} else {
				// <%-- exception --%>
				throw 'calendar 영역이 없습니다.';
			}

		},

		setVariables: function(args) {

			//<%-- 모델링 --%>
			me.data = {
				parentElId: '',
				elId: args.elId,
				htmlUrl: args.htmlUrl,
				calContainerId: 'cal',

				useCreationPopup: false,
				useDetailPopup: false,
				timezones: {},
				calendars: [],
				initSettings: false,
				obj: {},
			};

			// 모델 초기값 세팅
			if (typeof args != 'undefined' && args != null && args != "") {
				me.data.parentElId = me.nvl(args.parentElId, me.data.parentElId);
				me.data.calContainerId = me.nvl(args.calContainerId, me.data.calContainerId);

				me.data.useCreationPopup = me.nvl(args.useCreationPopup, me.data.useCreationPopup);
				me.data.useDetailPopup = me.nvl(args.useDetailPopup, me.data.useDetailPopup);
				me.data.timezones = me.nvl(args.timezones, me.data.timezones);
				me.data.calendars = me.nvl(args.calendars, me.data.calendars);
			}

		},

		setEvents: function() {

		},

		initialize: function() {
			me.setCalendar();
		},

		setCalendar: function() {

			var container = document.getElementById(me.data.calContainerId);
			var options = {
				defaultView: me.data.defaultView,
				useCreationPopup: me.data.useCreationPopup,
				useDetailPopup: me.data.useDetailPopup,
				timezones: me.data.timezones,
				calendars: me.data.calendars
			};

			me.data.obj = new tui.Calendar(container, options);

			// 초기 세팅 완료
			me.data.initSettings = true;

		},

		//<%-- Function : 숫자 0 -> '' --%>
		chkZeroValidNumber: function(value) {
			return value == 0 ? '' : value;
		},

		//<%-- Function : 빈 문자열 체크 --%>
		chkValidNumber: function(value, maxlen) {
			let val = value;
			if (!me.isEmpty(maxlen))
				val = me.setMaxLength(value, maxlen);
			val = Number(val.replace(/[^0-9]/g, ''));
			return val == 0 ? "" : val.toString();
		},

		//<%-- Function : 문자열 길이 유효성 체크 --%>
		setMaxLength: function(value, maxlen) {
			return value.substring(0, maxlen);
		},

		//<%-- Function : 빈 문자열 체크 --%>
		isEmpty: function(_str) {
			if (typeof _str == 'undefined' || _str == null || _str == "")
				return true;
			else if (typeof _str == 'string' && $.trim(_str).length > 0)
				return false;
			else if (typeof _str == 'object' && _str.length && _str.length > 0)
				return false;
			else
				return false;
		},

		//<%-- Function : NVL --%>
		nvl: function(_str, _defaultStr) {
			return me.isEmpty(_str) ? _defaultStr : _str;
		},

		noting: null

	};

	return me;
}