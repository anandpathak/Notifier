angular.module('bootstrapDemoApp',['ui.notifier']).controller('NotifierDemoCtrl', function($scope,Notify) {
  $scope.demoControllerVar = 'I am a demo controller var';
});