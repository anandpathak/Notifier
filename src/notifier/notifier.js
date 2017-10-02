
/**
 * 
 * @name ui.notifier
 *
 * @description
 * Describe the Notifier component here.
 */
angular.module('notifier_template.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/notifier/notifier.html',
    '<style type=\'text/css\'>\n' +
    '   @import url(https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);\n' +
    '@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);\n' +
    '* {\n' +
    '  box-sizing: border-box;\n' +
    '}\n' +
    '\n' +
    '.Message {\n' +
    '  display: table;\n' +
    '  position: absolute;\n' +
    '  margin: 40px auto 0;\n' +
    '  width: 450px;\n' +
    '  background-color: #0074D9;\n' +
    '  color: #fff;\n' +
    '  -webkit-transition: all 0.2s ease;\n' +
    '  transition: all 0.2s ease;\n' +
    '  box-shadow: 3px -1px 5px 0px #000;\n' +
    '}\n' +
    '.left {\n' +
    '  left:10px; \n' +
    '}\n' +
    '.right {\n' +
    '  right : 10px\n' +
    '}\n' +
    '.top {\n' +
    '  top: 10px;\n' +
    '}\n' +
    '.bottom {\n' +
    '  bottom: 50px;\n' +
    '}\n' +
    '.Message.is-hidden {\n' +
    '  opacity: 0;\n' +
    '  height: 0;\n' +
    '  font-size: 0;\n' +
    '  padding: 0;\n' +
    '  margin: 0 auto;\n' +
    '  display: block;\n' +
    '}\n' +
    '\n' +
    '.Message--orange {\n' +
    '  background-color: #F39C12;\n' +
    '}\n' +
    '\n' +
    '.Message--red {\n' +
    '  background-color: #FF4136;\n' +
    '}\n' +
    '\n' +
    '.Message--green {\n' +
    '  background-color: #2ECC40;\n' +
    '}\n' +
    '\n' +
    '.Message-icon {\n' +
    '  display: table-cell;\n' +
    '  vertical-align: middle;\n' +
    '  width: 60px;\n' +
    '  padding: 30px;\n' +
    '  text-align: center;\n' +
    '  background-color: rgba(0, 0, 0, 0.25);\n' +
    '}\n' +
    '.Message-icon > i {\n' +
    '  width: 20px;\n' +
    '  font-size: 20px;\n' +
    '}\n' +
    '\n' +
    '.Message-body {\n' +
    '  display: table-cell;\n' +
    '  vertical-align: middle;\n' +
    '  padding: 10px 20px 10px 10px;\n' +
    '}\n' +
    '.Message-body > p {\n' +
    '  line-height: 1.2;\n' +
    '  margin-top: 6px;\n' +
    '}\n' +
    '\n' +
    '.Message-button {\n' +
    '  position: relative;\n' +
    '  margin: 15px 5px -10px;\n' +
    '  background-color: rgba(0, 0, 0, 0.25);\n' +
    '  box-shadow: 0 3px rgba(0, 0, 0, 0.4);\n' +
    '  border: none;\n' +
    '  padding: 10px 15px;\n' +
    '  font-size: 16px;\n' +
    "  font-family: 'Source Sans Pro';\n" +
    '  color: #fff;\n' +
    '  outline: none;\n' +
    '  cursor: pointer;\n' +
    '}\n' +
    '.Message-button:hover {\n' +
    '  background: rgba(0, 0, 0, 0.3);\n' +
    '}\n' +
    '.Message-button:active {\n' +
    '  background: rgba(0, 0, 0, 0.3);\n' +
    '  box-shadow: 0 0px rgba(0, 0, 0, 0.4);\n' +
    '  top: 3px;\n' +
    '}\n' +
    '\n' +
    '.Message-close {\n' +
    '  position: absolute;\n' +
    '  background-color: rgba(0, 0, 0, 0.3);\n' +
    '  color: #fff;\n' +
    '  border: none;\n' +
    '  outline: none;\n' +
    '  font-size: 20px;\n' +
    '  right: 5px;\n' +
    '  top: 5px;\n' +
    '  opacity: 0;\n' +
    '  cursor: pointer;\n' +
    '}\n' +
    '.Message:hover .Message-close {\n' +
    '  opacity: 1;\n' +
    '}\n' +
    '.Message-close:hover {\n' +
    '  background-color: rgba(0, 0, 0, 0.5);\n' +
    '}\n' +
    '\n' +
    '.u-italic {\n' +
    '  font-style: italic;\n' +
    '}\n' +
    '\n' +
    '</style>\n' +
    "<div  class=\"Message\" ng-class=\"{ '{{icons[type][1]}}' : 1, '{{X}}' : 1}\" ng-style=\"space\">\n" +
    '   <div class=\'Message-icon\'>\n' +
    '       <i class=\'fa\' ng-class=\'icons[type][0]\'></i>\n' +
    '   </div>\n' +
    '   <div class=\'Message-body\'>\n' +
    '       <p style=\'font-weight:bold\'>{{header}}</p>\n' +
    '       <p class=\'u-italic\'>{{message}}</p>\n' +
    '   </div>\n' +
    '   <button class=\'Message-close js-messageClose\' ng-click=\'$close($event)\'><i class=\'fa fa-times\'></i></button>\n' +
    '</div>');
}]);

angular.module('notifier', ['notifier_template.html'])
    .provider('Notify',function(){
            this.options = {
        maxCount: 0,
        timeout: 5000,
        startTop: 10,
        startRight: 10,
        horizontal: 'left',
        vertical: 'top',
        max_message:5,
    }
    this.configure=function(options){
        if(!angular.isObject(options)){
            throw "configuration must be object";
        }
        else{
            this.options=options;
        }
    }
    this.$get=function($timeout, $http, $compile, $templateCache, $rootScope, $injector, $sce, $q, $window){
        var options=this.options;
        var show= function(args){
            console.log(options.maxCount++);
            var scope=$rootScope.$new();
                scope.header=$sce.trustAsHtml(args.header || "");
                scope.message = $sce.trustAsHtml(args.message || "");
                scope.type= args.type || 'info';
                scope.X=args.X || "right";
                scope.Y=args.Y || "top";
                scope.icons= {
                   "info" :["fa-bell-o",""],
                   "warning": ["fa-exclamation" , "Message--orange"],
                   "success": ["fa-check", "Message--green"],
                   "error": ["fa-times", "Message--red"]
                }
                scope.height=40;
                var isMessage=document.getElementsByClassName("Message");
                angular.forEach(isMessage, function(DOM){
                    scope.height+=DOM.offsetHeight;
                });
                scope.space={};
                scope.space[scope["Y"]]= scope.height+"px";
                var template=$templateCache.get('template/notifier/notifier.html');
                var elem= $compile(template)(scope);
                var content=angular.element(document.querySelector('body')).append(elem);
                scope.$close=function(){
                    elem.remove();
                }
                $timeout(function(){
                    elem.remove();
                },options.timeout);

        }
        return show;
    }

});
