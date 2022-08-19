function search() {

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
				throw 'search 영역이 없습니다.';
			}

		},

		setVariables: function(args) {

			// <%-- 모델링 --%>
			me.data = {

				parentElId: '',

				// <%-- 검색 영역 id --%>
				elId: args.elId,

				// <%-- 검색 옵션 --%>
				searchOption: {
					string: null,
					code: null,
					date: null,
					dateRange: null,
					nullableYn: null,
					yn: null,
					score: null,
				},

				// <%-- 현재 입력된 검색 조건 --%>
				currentSearchParam: {},

				// <%-- 버튼 id --%>
				buttonId: 'searchButton',

				// <%-- datePicker 클래스 명 --%>
				datePickerClass: 'cal',

				// <%-- 서브 창에서 페이지 이동 시 param에 페이지 번호 적재 방지 --%>
				isSubPage: false,

				onClickBtn: null,

			};

			// <%-- 모델 초기값 세팅 --%>
			if (typeof args != 'undefined' && args != null && args != "") {
				me.data.parentElId = common.nvl(args.parentElId, me.data.parentElId);

				me.data.buttonId = common.nvl(args.buttonId, me.data.buttonId);
				me.data.searchOption = common.nvl(args.searchOption, me.data.searchOption);
				me.data.isSubPage = common.nvl(args.isSubPage, me.data.isSubPage);

				me.data.onClickBtn = common.nvl(args.onClickBtn, me.data.onClickBtn);
			}

		},

		setEvents: function() {

			// <%-- 검색 버튼 이벤트 --%>
			$('#' + me.data.elId).on('click', '#' + me.data.buttonId, function() {

				me.onClickBtn();

			});

			// <%-- enter key 이벤트 --%>
			$(document).on('keyup', '#' + me.data.elId + ' input[type="text"]', function() {

				if (window.event.keyCode == 13 && !$(this).prop('readonly')) {

					me.onClickBtn();

				}

			});

			// <%-- dateRange checkBox 이벤트 --%>
			$(document).on('change', '#' + me.data.elId + ' input[type="checkbox"]', function() {

				if ($(this).is(':checked')) {

					$(this).siblings('input[type="text"]').addClass(me.data.datePickerClass);
					me.setDatePicker(me.data.elId, me.data.datePickerClass);

				} else {

					$(this).siblings('input[type="text"]').val('');
					$(this).siblings('input[type="text"]').removeClass(me.data.datePickerClass);

				}

				$(this).siblings('input[type="text"]').prop('disabled', !($(this).is(':checked')));

			});

		},

		initialize: function() {

			// <%-- 검색 영역 세팅 함수 --%>
			me.setSearchOptions();

		},

		onClickBtn: function() {

			// <%-- URL 파라미터 갱신 --%>
			me.refreshUrl();

			// <%-- 현재 입력된 검색 조건 모델 갱신 --%>
			me.setCurrentSearchParam();

			// <%-- me.data.onClickBtn 이벤트 발행 --%>
			if(common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.onClickBtn)) {
				document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(me.data.onClickBtn, { detail : { 'currentPageNo': 1 } } ));
			}

		},

		// <%-- Function : datePicker 세팅 --%>
		setDatePicker: function(selector, classNm) {

			var target = (common.isEmpty(classNm)) ? ($('#' + selector)) : ($('#' + selector).find('.' + classNm));

			target.datepicker({
				dateFormat: "yy-mm-dd",
				monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
				showMonthAfterYear: true,
				yearSuffix: "년"
			});

		},

		// <%-- Function : 검색 영역 세팅 --%>
		setSearchOptions: function() {

			// <%-- Loop : search startup 파라미터로 전달받은 type ( string, code, date, ... ) --%>
			for (type in me.data.searchOption) {

				// <%-- key(type)에 대한 value(div id) --%>
				var targetId = me.data.searchOption[type];

				// <%-- null 제외 --%>
				if (common.isEmpty(targetId)) continue;

				for (var i = 0; i < targetId.length; i++) {

					if (!common.isEmpty(common.getParam(targetId[i]))) {

						if (type == 'string') {

							$('#' + targetId[i]).children('input[type="text"]').val(common.getParam(targetId[i]).replace(/\\\\/ig, '\\').replace(/\\%/ig, '%').replace(/\\_/ig, '_'));

						} else if (type == 'date') {

							me.setDatePicker(targetId[i], me.data.datePickerClass);
							$('#' + targetId[i]).children('input[type="text"]').val(common.getParam(targetId[i]));

						} else if (type == 'dateRange') {

							if (common.getParam(targetId[i]).indexOf(',') != -1) {

								$('#' + targetId[i]).children('input[type="checkbox"]').prop('checked', true);
								$('#' + targetId[i]).children('input[type="text"]').prop('disabled', false);

								$('#' + targetId[i]).children('input[type="text"]').addClass(me.data.datePickerClass);
								me.setDatePicker(targetId[i], me.data.datePickerClass);

								$('#' + targetId[i]).children('input[type="text"]').eq(0).val(common.getParam(targetId[i]).split(',')[0]);
								$('#' + targetId[i]).children('input[type="text"]').eq(1).val(common.getParam(targetId[i]).split(',')[1]);

							}

						} else if (type == 'code' || type == 'nullableYn' || type == 'yn' || type == 'score') {

							$('#' + targetId[i]).children('select').val(common.getParam(targetId[i]));

						} else {
							// <%-- exception --%>
							throw type + ' 검색 모듈에서 사용되는 타입이 아닙니다.';
						}

					} else {

						if (type == 'date') {
							me.setDatePicker(targetId[i], me.data.datePickerClass);
						}

					}

				}

			}

		},

		// <%-- Function : 사용자가 입력한 검색 조건을 URL에 갱신하는 함수 --%>
		refreshUrl: function() {

			if (me.data.isSubPage || !common.browserCheck()) {
				return false;
			}

			// <%-- Loop : search startup 파라미터로 전달받은 type ( String, Code, Date, ... ) --%>
			for (type in me.data.searchOption) {

				// <%-- key(type)에 대한 value(div id) --%>
				var targetId = me.data.searchOption[type];

				// <%-- null 제외 --%>
				if (common.isEmpty(targetId)) continue;

				for (var i = 0; i < targetId.length; i++) {

					if (type == 'string' || type == 'date') {

						var searchValue = $('#' + targetId[i]).children('input[type="text"]').val();

						if (!common.isEmpty(searchValue)) {
							common.replaceParam(targetId[i], searchValue);
						} else {
							common.removeParam(targetId[i]);
						}

					} else if (type == 'dateRange') {

						var tempStartDt = $('#' + targetId[i]).children('input[type="text"]').eq(0).val();
						var tempEndDt = $('#' + targetId[i]).children('input[type="text"]').eq(1).val();

						if (common.isEmpty(tempStartDt) && common.isEmpty(tempEndDt)) {

							common.removeParam(targetId[i]);

						} else if (common.isEmpty(tempStartDt)) {

							// <%-- 시작 데이터가 없음 --%>
							alert('시작일을 입력해주세요.');// TODO alert form
							throw 'StartDateNullException';

						} else if (common.isEmpty(tempEndDt)) {

							// <%-- 종료 기간이 없음 --%>
							alert('종료일을 입력해주세요.');// TODO alert form
							throw 'EndDateNullException';

						} else {

							var tempStartDtObj = new Date(tempStartDt);
							var tempEndDtObj = new Date(tempEndDt);

							if (tempStartDtObj > tempEndDtObj) {

								// <%-- 시작 날짜가 더 큼 --%>
								alert('종료일이 시작일보다 빠른 날짜일 수 없습니다.');// TODO alert form
								throw 'DateRangeSelectException';

							} else {
								common.replaceParam(targetId[i], tempStartDt + ',' + tempEndDt);
							}

						}
					} else if (type == 'code' || type == 'nullableYn' || type == 'yn' || type == 'score') {

						var searchValue = $('#' + targetId[i]).children('select').val();

						if (!common.isEmpty(searchValue)) {
							common.replaceParam(targetId[i], searchValue);
						} else {
							common.removeParam(targetId[i]);
						}

					}

				}

			}

		},

		// <%-- Function : 사용자가 입력한 검색 조건을 URL 파라미터 기준으로 갱신하는 함수 --%>
		setCurrentSearchParam: function() {

			// <%-- Loop : search startup 파라미터로 전달받은 type ( String, Code, Date, ... ) --%>
			for (type in me.data.searchOption) {

				// <%-- key(type)에 대한 value(div id) --%>
				var targetId = me.data.searchOption[type];

				for (var i = 0; i < targetId.length; i++) {

					me.data.currentSearchParam[targetId[i]] = common.getParam(targetId[i]);

				}

			}

		},

		noting: null

	};

	return me;
}