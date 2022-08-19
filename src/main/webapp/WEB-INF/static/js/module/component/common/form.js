function form() {

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
				throw 'form 영역이 없습니다.';
			}

		},

		setVariables: function(args) {

			// <%-- 모델링 --%>
			me.data = {

				elId: 'form',

				htmlUrl: args.htmlUrl,

			};

			// <%-- 모델 초기값 세팅 --%>
			if (typeof args != 'undefined' && args != null && args != "") {
				me.data.elId = common.nvl(args.elId, me.data.elId);
			}

		},

		setEvents: function() {

		},

		initialize: function() {

		},

		// <%-- Function : 사용자 입력 데이터 갱신 --%>
		setInputData: function() {

			for (type in me.data.el.form) {

				var formType = me.data.el.form[type];

				// <%-- null 제외 --%>
				if (common.isEmpty(formType)) continue;

				for (target in formType) {

					// <%-- { 해당 폼 ID (key) : 사용자 입력 값 (value), ... } 형태로 저장 --%>
					if (type == 'text') {
						me.data.inputData[formType[target].prop('id')] = formType[target].val();
					} else if (type == 'select') {
						me.data.inputData[formType[target].prop('id')] = $(formType[target].selector + ' option:selected').val();
					} else if (type == 'checkbox') {
						me.data.inputData[formType[target].prop('id')] = formType[target].is(':checked') ? 'Y' : 'N';
					} else if (type == 'radio') {
						me.data.inputData[formType[target].prop('name')] = $(formType[target].selector + ':checked').val();
					}

				}

			}

		},

		// <%-- Function : 전체/특정 사용자 입력 데이터 갱신 후 가져오기 --%>
		getInputData: function(str) {
			me.setInputData();
			return (common.isEmpty(str)) ? (me.data.inputData) : (me.data.inputData[str]);
		},

		// <%-- Function : 사용자 입력 데이터 유효성 검사 --%>
		validationCheck: function() {

			// Editor
			// File
			// Date
			// ...

		},

		// <%-- Function : 등록 --%>
		submit: function() {

			me.setInputData();

			me.validationCheck();

			if (confirm('등록하시겠습니까?')) {

				alert('입력한 데이터: ' + JSON.stringify(me.data.inputData));
				me.go(me.data.url.view.list);

			}

		},

		// <%-- Function : 취소 --%>
		cancel: function() {

			if (confirm('취소하시겠습니까?')) {
				me.go(me.data.url.view.list);
			}

		},

		// <%-- Function : 페이지 리다이렉트 --%>
		go: function(url) {
			location.href = me.data.contextPath + url;
		},

		noting: null

	};

	return me;
}