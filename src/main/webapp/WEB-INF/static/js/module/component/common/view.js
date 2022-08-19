function view() {

	let me = {

		startup: function() {
			me.setView(arguments[0]);
		},

		setView: function(args) {

			if (!common.isEmpty(args.elId) && $('#' + args.elId).length > 0 && !common.isEmpty(args.htmlUrl)) {

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
				throw 'view 영역이 없습니다.';
			}

		},

		setVariables: function(args) {

			// <%-- 모델링 --%>
			me.data = {

				elId: 'view',

				htmlUrl: args.htmlUrl,

				viewData: null,

				viewTargetId: null,

				custom: null,

			};

			// <%-- 모델 초기값 세팅 --%>
			if (typeof args != 'undefined' && args != null && args != "") {
				me.data.elId = common.nvl(args.elId, me.data.elId);
				me.data.htmlUrl = common.nvl(args.htmlUrl, me.data.htmlUrl);
				me.data.viewData = common.nvl(args.viewData, me.data.viewData);
				me.data.viewTargetId = common.nvl(args.viewTargetId, me.data.viewTargetId);
				me.data.custom = common.nvl(args.custom, me.data.custom);
			}

		},

		setEvents: function() {

		},

		initialize: function() {

			me.setTable();

		},

		setTable: function() {

			// view 데이터 체크
			if (common.isEmpty(me.data.viewData)) return;

			// custom 정보 세팅
			var setCustom = function(paramKey, paramValue) {
				if (!common.isEmpty(me.data.custom)) {
					for (var i = 0; i < me.data.custom.length; i++) {
						if (me.data.custom[i].targetId == paramKey) {
							return me.data.custom[i].customFunc(paramValue);
						}
					}
				}
			}

			// 화면에 표출
			var html = function(paramKey, paramValue, paramCustom) {
				if (!common.isEmpty(paramCustom)) {
					me.find('#' + paramKey).html(paramCustom);
				} else {
					me.find('#' + paramKey).html(paramValue);
				}
			}

			// targetId 목록이 파라미터로 전달된 경우
			if (!common.isEmpty(me.data.viewTargetId)) {
				for (var i = 0; i < me.data.viewTargetId.length; i++) {
					var key = me.data.viewTargetId[i];
					var value = me.data.viewData[key];
					var custom = setCustom(key, value);
					html(key, value, custom);
				}
			} else {
				for (key in me.data.viewData) {
					var value = me.data.viewData[key];
					var custom = setCustom(key, value);
					html(key, value, custom);
				}
			}

		},

		getViewData: function () {
			return me.data.viewData;
		},

		// <%-- Function : 선택 영역 찾기 --%>
		find : function(targetElId) {
			return $('#' + me.data.elId).find(targetElId);
		},

		noting: null

	};

	return me;
}