function tree() {
	let me = {

		startup: function() {

			//<%-- 변수 초기화 --%>
			me.setVariables( arguments[0] );

			//<%-- 이벤트 초기화 --%>
			me.setEvents();

			//<%-- DOM 초기화 --%>
			me.initialize();

		},

		setVariables: function( args ) {

			//<%-- 모델링 --%>
			me.data = {
				tree: {
					elId: 			"gridDiv" 		// <%-- 그리드 영역 ID --%>
					, container: 		null 			// <%--  --%>
					, provider: 			null
					, treeView : 		null
				}
				, set: {
					fields: 			null 			// <%--  --%>
					, columns: 			null 			// <%--  --%>
					, columnLayout: 	null 			// <%--  --%>
					, rows: 			null 			// <%--  --%>
					, option: 			null 			// <%--  --%>
					, code:			null
				}
				, initSettings : false 					// <%-- 초기 세팅 상태 --%>
			};

			// 모델 초기값 세팅
			if ( typeof args != 'undefined' && args != null && args != "" ) {
				me.data.tree.elId 			= me.nvl( args.elId, 			me.data.tree.elId );
				me.data.set.fields 			= me.nvl( args.fields, 			me.data.set.fields );
				me.data.set.columns 		= me.nvl( args.columns, 		me.data.set.columns );
				me.data.set.columnLayout 	= me.nvl( args.columnLayout, 	me.data.set.columnLayout );
				me.data.set.rows 			= me.nvl( args.rows, 			me.data.set.rows );
			}

		},

		setEvents: function() {

		},

		initialize: function() {
			me.data.tree.container = document.getElementById( me.data.tree.elId );
			//<%-- Function : 리얼 그리드 : treeView 초기화 --%>
			me.data.tree.provider = new RealGrid.LocalTreeDataProvider( false )
			me.data.tree.treeView = new RealGrid.TreeView( me.data.tree.container );
			me.data.tree.treeView.setDataSource( me.data.tree.provider );


			//<%-- Function : 리얼 그리드 : 필드 생성 --%>
			if ( !this.isEmpty( me.data.set.fields ) ) {
				me.setFields( me.data.set.fields );
			}
			//<%-- Function : 리얼 그리드 : 컬럼 생성 --%>
			if ( !this.isEmpty( me.data.set.columns ) ) {
				me.setColumns( me.data.set.columns );
			}
			//<%-- Function : 리얼 그리드 : 컬럼 레이아웃 --%>
			if ( !this.isEmpty( me.data.set.columnLayout ) ) {
				me.setColumnLayout( me.data.set.columnLayout );
			}
			//<%-- Function : 리얼 그리드 : 데이터 입력 --%>
			if ( !this.isEmpty( me.data.set.rows ) && !this.isEmpty( me.data.set.option ) ) {
				me.setRows( me.data.set.rows, me.data.set.option );
			}

			//<%-- Function : 공통코드 조회 --%>
			me.getGridCodeList();

			//<%-- renderer 설정 --%>
			me.setRenderer();

			// 초기 세팅 완료
			me.data.initSettings = true;

		},

		getContainer: function () {
			return me.data.tree.container;
		},

		getProvider: function () {
			return me.data.tree.provider;
		},

		getTreeView: function () {
			return me.data.tree.treeView;
		},

		//<%-- Function : set fields --%>
		setFields: function ( data ) {
			// data = [
			// 	{
			// 		fieldName: "KorName"
			// 		, dataType: "text"
			// 	}
			// 	, {
			// 		fieldName: "Age"
			// 		, dataType: "number"
			// 	}
			// ];
			if ( me.data.initSettings ) {
				// <%-- 초기 세팅 시에는 param를 대입, 차후에는 매개변수 대입. --%>
				me.data.set.fields = data;
			}
			me.data.tree.provider.setFields( data );
		},

		//<%-- Function : set columns --%>
		setColumns: function ( data ) {
			// data = [
			// 	{
			// 		  name: "KorNameColumn" // gridView.column.pk
			// 		, fieldName: "KorName" // provider.field.pk
			// 		, type: "data"
			// 		, width: "70"
			// 		, header: {
			// 			text: "이름"
			// 		}
			// 	}
			// 	, {
			// 		  name: "AgeColumn"
			// 		, fieldName: "Age"
			// 		, type: "data"
			// 		, width: "70"
			// 		, header: {
			// 			text: "테스트"
			// 		}
			// 	}
			// ];
			if ( me.data.initSettings ) {
				// <%-- 초기 세팅 시에는 param를 대입, 차후에는 매개변수 대입. --%>
				me.data.set.columns = data;
			}
			me.data.tree.treeView.setColumns( data );
		},

		//<%-- Function : set column layout --%>
		setColumnLayout: function ( data ) {
			// data = [
			//	 "기관"
			//	, "업무구분"
			//	, {
			//		  name: "연간목표그룹"
			//		, direction: "horizontal"
			//		, items: [
			//			  "수량"
			//			, "금액"
			//		]
			//		, header: {
			//			text: "연간목표"
			//		}
			// 	}
			// ];
			if ( me.data.initSettings ) {
				// <%-- 초기 세팅 시에는 param를 대입, 차후에는 매개변수 대입. --%>
				me.data.set.columnLayout = data;
			}

			me.data.tree.treeView.setColumnLayout( data );
		},

		//<%-- Function : set rows --%>
		setRows: function ( data, option ) {
			//TODO 차후 변경 필요
			// data = [
			// 	  { KorName: "가나다", Age: 11 }
			// 	, { KorName: "라마바", Age: 22 }
			// ];
			if ( this.isEmpty( option ) ) {
				option = { fillMode: "set" };
			}
			if ( me.data.initSettings ) {
				// <%-- 초기 세팅 시에는 param를 대입, 차후에는 매개변수 대입. --%>
				me.data.set.rows = data;
				me.data.set.option = option;
			}

			me.data.tree.provider.setObjectRows( {"ROWS":data}, "ROWS", "", "") ;
		},

		//<%-- Function : TreeView Export --%>
		exportGrid: function(fileName, callBackFunc){
			me.data.tree.treeView.exportGrid({
				type: "excel",
				target: "local",
				fileName: fileName,
				footer: "hidden",
				lookupDisplay: true,
				done: function () {  //내보내기 완료 후 실행되는 함수
					callBackFunc();
				}
			});
		},

		//<%-- Function : get new field name --%>
		getNewFieldName: function( fieldName ) {
			let newFieldName = fieldName.replace( ' ', '_' );
			const index = me.data.tree.provider.getFieldIndex( newFieldName );
			if ( index === -1 ) return newFieldName;
			return this.getNewFieldName( newFieldName.concat( '1' ) );
		},

		//<%-- Function : has columns --%>
		hasColumns: function() {
			return me.data.tree.treeView.getColumns().length > 0 && me.data.tree.provider.getFields().length > 0;
		},

		//<%-- Function : has data --%>
		hasData: function() {
			return me.data.tree.provider.getRowCount() > 0;
		},

		//<%-- Function : check data --%>
		checkData: function() {
			if ( this.hasColumns() && !this.hasData() ) {
				me.data.tree.provider.setRowCount(10);
			}
		},

		//<%-- add column --%>
		addColumn: function( colName, valueType, editor, renderer ) {
			const fieldName = this.getNewFieldName( colName );
			me.data.tree.provider.addField({
				fieldName: fieldName,
				dataType: valueType,
			});
			me.data.tree.treeView.addColumn({
				name: fieldName,
				fieldName: fieldName,
				width: 130,
				header: {
					text: colName,
				},
				editor: editor,
				renderer: renderer,
			});
			this.checkData();
			return fieldName;
		},

		//<%-- Function : 빈 문자열 체크 --%>
		isEmpty: function( _str ) {
			if( typeof _str == 'undefined' || _str == null || _str == "" )
				return true;
			else if (typeof _str == 'string' && $.trim(_str).length > 0)
				return false;
			else if (typeof _str == 'object' && _str.length && _str.length > 0 )
				return false;
			else
				return false;
		},

		//<%-- Function : NVL --%>
		nvl: function( _str, _defaultStr ) {
			return me.isEmpty( _str ) ? _defaultStr : _str;
		},

		getGridCodeList: function() {
			common.call('post', '/cmm/selectGridCodeList.do', 'json', JSON.stringify(me.data.set.fields), false, function(result){
				if(result !=null) {
					me.data.set.code = result;
				}
			});
		},

		setRenderer: function() {
			//<%-- 공통코드 renderer --%>
			me.data.tree.treeView.registerCustomRenderer("renderer_cmmCode", {
				initContent : function (parent) {
					var span = this._span = document.createElement("span");
					span.className = "custom_render_span";
					parent.appendChild(span);
				},

				canClick : function() {
					return true;
				},

				clearContent : function(parent) {
					parent.innerHTML = "";
				},

				render : function(grid, model, width, height, info) {
					var span = this._span;
					let codeNm = '';

					span.textContent = ''; //초기화
					if(model.value != 'undefined' && model.value != null && model.value !='') {
						span.textContent = me.data.set.code["cmmCode"][this.index.column.fieldName][model.value];
					}
				},

				click : function(event) {}
			});

			//<%-- 기관(본부/지사/소관청)코드 renderer --%>
			me.data.tree.treeView.registerCustomRenderer("renderer_insttCode", {
				initContent : function (parent) {
					var span = this._span = document.createElement("span");
					span.className = "custom_render_span";
					parent.appendChild(span);
				},

				canClick : function() {
					return true;
				},

				clearContent : function(parent) {
					parent.innerHTML = "";
				},

				render : function(grid, model, width, height, info) {
					var span = this._span;
					let codeNm = '';

					span.textContent = ''; //초기화

					if(model.value != 'undefined' && model.value != null && model.value !='') {
						span.textContent = me.data.set.code["insttCode"][model.value];
					}
				},

				click : function(event) {}
			});

			//<%-- UI공통코드 renderer --%>
			me.data.tree.treeView.registerCustomRenderer("renderer_cmmUiCode", {
				initContent : function (parent) {
					var span = this._span = document.createElement("span");
					span.className = "custom_render_span";
					parent.appendChild(span);
				},

				canClick : function() {
					return true;
				},

				clearContent : function(parent) {
					parent.innerHTML = "";
				},

				render : function(grid, model, width, height, info) {
					var span = this._span;
					let codeNm = '';

					span.textContent = ''; //초기화

					if(model.value != 'undefined' && model.value != null && model.value !='') {
						span.textContent = me.data.set.code["cmmUiCode"][this.index.column.fieldName][model.value];
					}
				},

				click : function(event) {}
			});

		},

		noting: null

	};
	return me;
}