angular.module('bb', ['ionic'])

.controller('bbCtrl', function($scope, $http) {
    $scope.get = function(){
      return $http({
        method : "GET",
        url : "json/data.json"
    }).then(function mySucces(response) {
        $scope.data = response.data;

    }, function myError(response) {
        $scope.data = response.statusText;
    });
  };

  $scope.get().then(function(){
    $scope.verify = $scope.data;

    // var premiumPosts = angular.element(document.getElementById("premiumPosts"));
    // var post, i;
    // for(i = 1; i < 0; i--){
    //   post = '<a class="PremiumPosts item item-avatar" href="announcement_details.html">\
    //     <img src="'+$scope.data.announcements[i].attachment+'">\
    //     <h2>'+$scope.data.announcements[i].title+'</h2>\
    //     <p>'+$scope.data.announcements[i].description+'</p>\
    //   </a>';

    //   premiumPosts.prepend(post);
    // }
    
  });
  
  
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})