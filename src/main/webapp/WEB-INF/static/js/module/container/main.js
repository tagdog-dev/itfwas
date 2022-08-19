(function() {

    let me = window.main = {

        startup: function() {

            // <%-- 변수 초기화 --%>
            me.setVariables(arguments[0]);

            // <%-- 이벤트 초기화 --%>
            me.setEvents();

            // <%-- 모듈 초기화 --%>
            me.initialize();

        },

        setVariables: function(args) {

            // <%-- tiles --%>
            me.header = new header();
            me.footer = new footer();

            // <%-- component --%>
            me.mainSkillListMain = new mainSkillListMain();

            // <%-- context path --%>
            me.contextPath = common.getContextPath();

            // <%-- 데이터 모델링 --%>
            me.data = {

                elId: 'main',

                // <%-- url --%>
                url: {
                    api: {

                    },
                    html: {

                    },
                },

                // <%-- HTML 요소 --%>
                el: {

                },

            }

            // <%-- 모델 초기값 세팅 --%>
            if (typeof args != 'undefined' && args != null && args != "") {
            }

        },

        setEvents: function() {

        },

        initialize: function() {

            // <%-- tiles --%>
            me.setTiles();

            // <%-- component --%>
            me.setMainSkillListMain();

        },

        // <%-- Function : 타일 영역 세팅 --%>
        setTiles: function() {
            me.header.startup({
                elId: 'header', // DIV ID
            });

            me.footer.startup({
                elId: 'footer', // DIV ID
            });
        },

        // <%-- Function : 메인 스킬 컴포넌트 영역 세팅 --%>
        setMainSkillListMain: function() {
            me.mainSkillListMain.startup({
                elId: 'mainSkillListMain', // DIV ID
            });
        },

        // <%-- Function : 페이지 리다이렉트 --%>
        go: function(url) {

            location.href = url;
            //window.open( url );

        },

        close: function(targetElId) {
            $('#' + targetElId).hide();
        },

        find: function(targetElId) {
            return $('#' + me.data.elId).find(targetElId);
        },

        noting: null

    };

})();