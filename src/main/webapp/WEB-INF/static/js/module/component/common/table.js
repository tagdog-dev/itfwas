function table() {

	let me = {

		startup: function() {
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
				throw 'list 영역이 없습니다.';
			}

		},

		setVariables: function(args) {

			// <%-- 모델링 --%>
			me.data = {

				parentElId: '',

				elId: 'list',

				htmlUrl: args.htmlUrl,

				totalCount: 0,
				listData: null,
				columnList: null,

				className: {
					row: null,
					column: null,
				},
				style: {
					row: null,
					column: null,
				},

				el: {
					count: $('.count')
				},

				setCheckbox : null,
				setButton : null,
				setSelect : null,

				onClickTr : null,

			};

			// <%-- 모델 초기값 세팅 --%>
			if (typeof args != 'undefined' && args != null && args != "") {

				me.data.parentElId = common.nvl(args.parentElId, me.data.parentElId);
				me.data.elId = common.nvl(args.elId, me.data.elId);

				me.data.totalCount = common.nvl(args.totalCount, me.data.totalCount);
				me.data.listData = common.nvl(args.listData, me.data.listData);
				me.data.columnList = common.nvl(args.columnList, me.data.columnList);

				me.data.className = common.nvl(args.className, me.data.className);
				me.data.style = common.nvl(args.style, me.data.style);

				me.data.setCheckbox = common.nvl(args.setCheckbox, me.data.setCheckbox);
				me.data.setButton = common.nvl(args.setButton, me.data.setButton);
				me.data.setSelect = common.nvl(args.setSelect, me.data.setSelect);

				me.data.onClickTr = common.nvl(args.onClickTr, me.data.onClickTr);

			}

		},

		setEvents: function() {

			// <%-- th 체크박스 이벤트 발행 --%>
			if ( common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.setCheckbox) ) {
				$(document).on('change', '.th.' + me.data.setCheckbox.onChange, function(e) {
					if (me.find('.th.' + me.data.setCheckbox.onChange).is(':checked')) {
						me.find('input[name="' + me.data.setCheckbox.onChange + '"]').prop('checked', true);
					} else {
						me.find('input[name="' + me.data.setCheckbox.onChange + '"]').prop('checked', false);
					}
				});
			}

			// <%-- tr 체크박스 이벤트 발행 --%>
			if ( common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.setCheckbox) ) {
				$(document).on('change', '.tr.' + me.data.setCheckbox.onChange, function(e) {
					if (me.find('input[name="' + me.data.setCheckbox.onChange + '"]' + ':checked').length == me.find('input[name="' + me.data.setCheckbox.onChange + '"]').length) {
						me.find('.th.' + me.data.setCheckbox.onChange).prop('checked', true);
					} else {
						me.find('.th.' + me.data.setCheckbox.onChange).prop('checked', false);
					}
					document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(me.data.setCheckbox.onChange, { detail : { 'chkData': { row: me.getRowData($(this).closest('tr').index()), index: $(this).closest('tr').index(), selector: $(e.target) } } }));
				});
			}

			// <%-- 버튼 이벤트 발행 --%>
			if ( common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.setButton) ) {
				me.data.setButton.forEach(function(param) {
					$(document).on('click', '.' + param.onClick, function(e) {
						document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(param.onClick, { detail : { 'btnData': { row: me.getRowData($(this).closest('tr').index()), index: $(this).closest('tr').index(), selector: $(e.target) } } }));
					});
				});
			}

			// <%-- 셀렉트박스 이벤트 발행 --%>
			if ( common.isNotEmpty(me.data.parentElId) && common.isNotEmpty(me.data.setSelect) ) {
				me.data.setSelect.forEach(function(param) {
					$(document).on('change', '.' + param.onChange, function(e) {
						document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(param.onChange, { detail : { 'selectData': { value: $(e.target).val(), selector: $(e.target) } } }));
					});
				});
			}

			// <%-- TR 클릭 이벤트 발행 --%>
			if ( common.isNotEmpty(me.data.parentElId) ) {
				$(document).on('click', '.clickTr', function(e) {
					if ( common.isEmpty($(e.target).attr('type')) && $(e.target).children().length == 0 ) {
						document.getElementById(me.data.parentElId).dispatchEvent(new CustomEvent(me.data.onClickTr, { detail: { 'rowData' : { row: me.getRowData($(this).closest('tr').index()), index: $(this).closest('tr').index(), selector: $(this) } } }));
					}
				});
			}

		},

		initialize: function() {
			me.setTh();
			me.setTable();
		},

		setTh: function() {

			me.find('thead').empty();

			let html = '';

			html += '<tr>';

			// 체크박스 그리기
			if (common.isNotEmpty(me.data.setCheckbox)) {
				html += '<th scope="col">';
				html += '<input type="checkbox" class="th ' + me.data.setCheckbox.onChange + '" name="'+ me.data.setCheckbox.onChange +'"/>';
				html += '</th>';
			}

			// 컬럼 그리기
			me.data.columnList.forEach(function(column) {
				html += '<th scope="col">' + Object.values(column) + '</th>';
			});

			// 버튼 그리기
			if (common.isNotEmpty(me.data.setButton)) {
				me.data.setButton.forEach(function(param) {
					html += '<th scope="col">' + param.name + '</th>';
				});
			}

			html += '</tr>';

			me.find('thead').append(html);

		},

		setTable: function() {

			me.find('tbody').empty();

			var html = '';

			if (common.isEmpty(me.data.listData)) {

				html += '<tr>';
				html += '<td colspan="' + me.data.columnList.length + '">자료가 없습니다.</td>';
				html += '</tr>';

			} else {

				me.data.listData.forEach(function(row) {

					if (common.isEmpty(row)) return;

					html += '<tr class="clickTr">';

					// 체크박스 그리기
					if (common.isNotEmpty(me.data.setCheckbox)) {
						html += '<td><input type="checkbox" class="tr '+ me.data.setCheckbox.onChange +'" name="'+ me.data.setCheckbox.onChange +'"></td>';
					}

					// 컬럼 그리기
					me.data.columnList.forEach(function(column) {
						html += '<td';
						html += me.setClassName(row, column);// td class
						html += me.setStyle(row, column);// td css
						html += '>' + row[Object.keys(column)] + '</td>';// text
					});

					// 버튼 그리기
					if (common.isNotEmpty(me.data.setButton)) {
						me.data.setButton.forEach(function(param) {
							html += '<td><button type="button" class="'+ param.onClick +'">' + param.name + '</button></td>';
						});
					}

					html += '</tr>';

				});

			}

			me.find('tbody').append(html);

			me.find(me.data.el.count.selector).html(me.data.totalCount);

			// tr class
			if (common.isNotEmpty(me.data.className.row)) {
				me.find('tbody tr').addClass(me.data.className.row);
			}

			// tr css
			if (common.isNotEmpty(me.data.style.row)) {
				me.find('tbody tr').css(me.data.style.row);
			}

		},

		setClassName: function(row, column) {

			if ( common.isNotEmpty(me.data.className.column) ) {
				var target = me.data.className.column[Object.keys(column)];
				if ( common.isEmpty(target) ) return '';
				var columnValue = row[Object.keys(column)];
			} else {
				return '';
			}

			var className = ' class="';

			if (common.isNotEmpty(target)) {
				if (typeof (target) == 'function') {
					if (!common.isEmpty(columnValue)) {
						className += target(columnValue);
					}
				} else {
					className += target;
				}
			}

			className += '"';
			return className;

		},

		setStyle: function(row, column) {

			if ( common.isNotEmpty(me.data.style.column) ) {
				var target = me.data.style.column[Object.keys(column)];
				if ( common.isEmpty(target) ) return '';
				var columnValue = row[Object.keys(column)];
			} else {
				return '';
			}

			var style = ' style="';

			for (key in target) {
				if (typeof (target[key]) == 'function') {
					if (!common.isEmpty(columnValue)) {
						var valueFunc = target[key];
						style += key + ':' + valueFunc(columnValue) + ';';
					}
				} else {
					style += key + ':' + target[key] + ';';
				}
			}

			style += '"';
			return style;

		},

		getRowData: function(idx) {
			if (typeof (idx) == 'number' && idx == 0) return me.data.listData[0];
			return common.isEmpty(idx) ? me.data.listData : me.data.listData[idx];
		},

		reload: function(count, list) {
			me.data.totalCount = count;
			me.data.listData = list;
			me.setTable();
		},

		find : function(targetElId) {
			return $('#' + me.data.elId).find(targetElId);
		},

		noting: null

	};

	return me;
}