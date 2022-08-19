function commonPagination() {

	let me = {

		startup: function() {

			// <%-- 변수 초기화 --%>
			me.setVariables(arguments[0]);

			// <%-- 이벤트 초기화 --%>
			me.setEvents();

			// <%-- 모듈 초기화 --%>
			me.initialize();

		},

		setVariables: function(args) {

			// <%-- 모델링 --%>
			me.data = {

				parentElId: '',

				// <%-- 페이지네이션 폼 id --%>
				elId: 'pagination',

				// <%-- 버튼 class 명 --%>
				buttonClass: {
					first: 'first',
					prev: 'prev',
					active: 'active',
					next: 'next',
					last: 'last'
				},

				// <%-- 인피니티스크롤 사용 여부 --%>
				isInfinity: false,

				// <%-- 서브 창에서 페이지 이동 시 param에 페이지 번호 적재 하는 것을 막기 위한 함수 --%>
				isSubPage: false,

				// <%-- 현재 페이지 번호 --%>
				currentPageNo: common.nvl(Number(common.getParam('currentPageNo')), 1),

				// <%-- 페이지당 레코드 개수 --%>
				recordCountPerPage: 10,

				// <%-- 페이지 목록에 표출될 페이지 개수 --%>
				pageSize: 10,

				// <%-- 총 레코드 개수 --%>
				totalRecordCount: 0,

				// <%-- 총 페이지 개수 --%>
				totalPageCount: 0,

				// <%-- 블록의 첫번째 페이지 번호 --%>
				firstPageNoOnPageList: null,

				// <%-- 블록의 마지막 페이지 번호 --%>
				lastPageNoOnPageList: null,

				// <%-- 첫번째 레코드 인덱스 : firstIndex --%>
				firstRecordIndex: 0,

				// <%-- 마지막레코드 인덱스 : lastIndex, 실제 행 개수와 인덱스 번호가 다를 수 있기 때문에 별도 변수로 지정 --%>
				lastRecordIndex: 0,

				onClickBtn: null,

			};

			// <%-- 모델 초기값 세팅 --%>
			if (typeof args != 'undefined' && args != null && args != "") {
				me.data.parentElId = common.nvl(args.parentElId, me.data.parentElId);
				me.data.elId = common.nvl(args.elId, me.data.elId);
				me.data.buttonClass = common.nvl(args.buttonClass, me.data.buttonClass);

				me.data.isInfinity = common.nvl(args.isInfinity, me.data.isInfinity);
				me.data.isSubPage = common.nvl(args.isSubPage, me.data.isSubPage);

				me.data.totalRecordCount = (typeof (args.totalRecordCount) == "undefined" || args.totalRecordCount == null) ? me.data.totalRecordCount : (typeof (args.totalRecordCount) == 'number' ? args.totalRecordCount : Number(args.totalRecordCount.replace('#', '')));

				me.data.recordCountPerPage = common.isEmpty(args.recordCountPerPage) ? me.data.recordCountPerPage : (typeof (args.recordCountPerPage) == 'number' ? args.recordCountPerPage : Number(args.recordCountPerPage.replace('#', '')));
				me.data.currentPageNo = !args.isSubPage ? (common.isEmpty(args.currentPageNo) ? me.data.currentPageNo : (typeof (args.currentPageNo) == 'number' ? args.currentPageNo : Number(args.currentPageNo.replace('#', '')))) : 1;
				me.data.pageSize = common.isEmpty(args.pageSize) ? me.data.pageSize : (typeof (args.pageSize) == 'number' ? args.pageSize : Number(args.pageSize.replace('#', '')));

				me.data.onClickBtn = common.nvl(args.onClickBtn, me.data.onClickBtn);
			}

		},

		setEvents: function() {

			$('#' + me.data.elId).on("click", ' .' + me.data.buttonClass.first, function() {
				me.onClickBtn();
			});

			$('#' + me.data.elId).on("click", ' .' + me.data.buttonClass.prev, function() {
				me.onClickBtn();
			});

			$('#' + me.data.elId).on("click", ' .' + me.data.buttonClass.next, function() {
				me.onClickBtn();
			});

			$('#' + me.data.elId).on("click", ' .' + me.data.buttonClass.last, function() {
				me.onClickBtn();
			});

			$('#' + me.data.elId).on("click", '.inactive', function() {
				me.onClickBtn();
			});

		},

		initialize: function() {

			// <%-- 페이지네이션에 필요한 값들을 계산하기 위한 함수 --%>
			me.calAllParams();

			// <%-- 페이지 목록 생성 함수 --%>
			me.setPagination();

		},

		onClickBtn: function() {

			me.refreshUrl($(event.target).data('page'));

			me.move($(event.target).data('page'));

			// <%-- 이벤트 발행 --%>
			if(common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.onClickBtn)) {
				document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(me.data.onClickBtn, { detail : { 'currentPageNo': $(event.target).data('page') } } ));
			}

		},

		// <%-- Function : 페이지 목록 생성 --%>
		setPagination: function() {

			// <%-- 페이지네이션 출력 div 확인 --%>
			var temp = $('#' + me.data.elId);
			var html = '';

			if (!(me.data.isInfinity)) {

				// <%-- 이전 페이지 블록 출력 --%>
				if (me.data.firstPageNoOnPageList != 1) {
					html += '<button data-page="1" type="button" class="' + me.data.buttonClass.first + '"><span class="hidden">처음으로</span></button>';
					html += '<button data-page="' + (me.data.firstPageNoOnPageList - 1 < 1 ? 1 : me.data.firstPageNoOnPageList - 1) + '" type="button" class="' + me.data.buttonClass.prev + '"><span class="hidden">이전</span></button>';
				}

				// <%-- 블록 내 페이지 목록 출력 --%>
				for (var i = me.data.firstPageNoOnPageList; i <= me.data.lastPageNoOnPageList; i++) {
					if (i == me.data.currentPageNo) {
						html += '<a href="javascript:void(0)" data-page="' + i + '" onclick="return false;" class="' + me.data.buttonClass.active + '">' + i + '</a>';
					} else {
						html += '<a href="javascript:void(0)" data-page="' + i + '" onclick="return false;" class="inactive">' + i + '</a>';
					}
				}

				// <%-- 다음 페이지 블록 출력 --%>
				if (me.data.lastPageNoOnPageList != me.data.totalPageCount) {
					html += ''
						+ '<button data-page="' + ((me.data.lastPageNoOnPageList + 1) > me.data.totalPageCount ? me.data.totalPageCount : (me.data.lastPageNoOnPageList + 1)) + '" type="button" class="' + me.data.buttonClass.next + '" ><span class="hidden">다음</span></button>'
						+ '<button data-page="' + me.data.totalPageCount +'" type="button" class="' + me.data.buttonClass.last + '" ><span class="hidden">마지막으로</span></button>';
				}

			} else {

				if (me.data.totalPageCount == me.data.currentPageNo) {
					// <%-- 기존 버튼이 안나오는 조건 : 데이터가 마지막일 때 & 데이터가 없을 때 --%>
					html += '<button>더 이상 페이지를 호출 할 수 없습니다.</button>';
				} else {
					html += '<button onclick="javascript:' + me.move + '( ++pagination.data.currentPageNo );">데이터 더 가져오기</button>';
				}

			}

			// <%-- html 삽입 --%>
			temp.html(html);

		},

		// <%-- Function : currentPageNo 페이지 정보 변경 및 이동하는 함수 --%>
		setCurrentPageNo: function(pageNo) {

			me.data.currentPageNo = pageNo;

			me.refreshUrl(pageNo);

			me.move(pageNo);

		},

		// <%-- Function : currentPage, pageUnit, pagiSize 를 url 파라미터로 보낼수 있도록 문자열로 변경하여 반환 하는 함수 --%>
		getParamString: function() {
			var resultString = '';

			// <%-- 현재 페이지 번호 --%>
			if (!common.isEmpty(me.data.currentPageNo)) {
				resultString += '&currentPageNo=' + me.data.currentPageNo;
			}

			// <%-- 페이지당 레코드 개수 : pageUnit --%>
			if (!common.isEmpty(me.data.recordCountPerPage)) {
				resultString += '&recordCountPerPage=' + me.data.recordCountPerPage;
			}

			// <%-- 페이지 목록에 표출될 페이지 개수 --%>
			if (!common.isEmpty(me.data.pageSize)) {
				resultString += '&pageSize=' + me.data.pageSize;
			}

			return resultString;

		},

		// <%-- Function : 총 페이지 개수, 페이지네이션 첫번호, 페이지네이션 끝번호, 페이지 첫 레코드 번호, 페이지 마지막 레코드 번호 계산 --%>
		calAllParams: function() {

			// <%-- totalRecordCount가 0으로 게시글이 하나도 없는 경우도 있기 때문에 검증 대상에서 제외 --%>
			if (common.isEmpty(me.data.recordCountPerPage) || common.isEmpty(me.data.currentPageNo) || common.isEmpty(me.data.pageSize)) {
				throw "페이지네이션에 필요한 값들이 부족합니다.";
			}

			if (typeof (me.data.totalRecordCount) == "undefined" || me.data.totalRecordCount == null) {
				throw "페이지네이션에 필요한 값들이 부족합니다.";
			}

			// <%-- calTotalPageCount Method --%>
			me.data.totalPageCount = (Math.trunc((me.data.totalRecordCount - 1) / me.data.recordCountPerPage) + 1);

			// <%-- 호출 페이지가 페이지 개수를 초과한 경우 예외 처리 --%>
			if (me.data.totalPageCount < me.data.currentPageNo) {
				if (common.getParam('currentPageNo') == me.data.currentPageNo) {
					me.refreshUrl(me.data.totalPageCount);
				}
				me.data.currentPageNo = me.data.totalPageCount;
			}

			// <%-- calFirstRecordIndex Method --%>
			me.data.firstPageNoOnPageList = (Math.trunc((me.data.currentPageNo - 1) / me.data.pageSize) * me.data.pageSize + 1);

			// <%-- calLastPageNoOnPageList Method --%>
			var tempLastPageNoOnPageList = me.data.firstPageNoOnPageList + me.data.pageSize - 1;

			if (tempLastPageNoOnPageList > me.data.totalPageCount) {
				tempLastPageNoOnPageList = me.data.totalPageCount;
			}

			me.data.lastPageNoOnPageList = tempLastPageNoOnPageList;

			// <%-- calFirstRecordIndex Method --%>
			me.data.firstRecordIndex = ((me.data.currentPageNo - 1) * me.data.recordCountPerPage);

			// <%-- calLastRecordIndex Method --%>
			me.data.lastRecordIndex = (me.data.currentPageNo * me.data.recordCountPerPage);

		},

		// <%-- Function : 페이지 이동 --%>
		move: function(paramTargetPage) {

			// <%-- 현재 페이지 대입 --%>
			me.data.currentPageNo = paramTargetPage;

			// <%-- 페이지네이션에 필요한 값들을 계산하기 위한 함수 --%>
			me.calAllParams();

			// <%-- 현재 페이지가 마지막 페이지보다 크면 마지막 페이지로 대체 하여 재 호출 --%>
			if (me.data.currentPageNo > me.data.lastPageNoOnPageList) {
				me.data.currentPageNo = me.data.lastPageNoOnPageList
				me.move(me.data.currentPageNo);
				return;
			}

			// <%-- 페이지네이션 생성 --%>
			me.setPagination();

		},

		// <%-- Fuction : 새로고침 --%>
		reload: function(paramTotalRecordCount, paramCurrentPageNo, paramRecordCountPerPage, paramPageSize) {

			// <%-- 매개변수 점검 및 미입력 시 기본값 사용 --%>
			me.data.totalRecordCount = common.isEmpty(paramTotalRecordCount) ? me.data.totalRecordCount : Number(paramTotalRecordCount);
			me.data.currentPageNo = common.isEmpty(paramCurrentPageNo) ? me.data.currentPageNo : Number(paramCurrentPageNo);
			me.data.recordCountPerPage = common.isEmpty(paramRecordCountPerPage) ? me.data.recordCountPerPage : Number(paramRecordCountPerPage);
			me.data.pageSize = common.isEmpty(paramPageSize) ? me.data.pageSize : Number(paramPageSize);

			// <%-- refresh된 페이지로 이동 --%>
			me.move(me.currentPageNo);

		},

		// <%-- Function : URL 갱신 --%>
		refreshUrl: function(paramPageNo) {

			if (me.data.isSubPage) {
				return false;
			}

			if (!common.isEmpty(paramPageNo)) {
				common.replaceParam('currentPageNo', paramPageNo);
			} else {
				common.removeParam('currentPageNo');
			}

		},

		noting: null

	};

	return me;
}