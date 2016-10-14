angular.module('bb', ['ionic'])

.controller('bbCtrl', function($scope, $http) {
    $scope.get = function(){
      return $http({
        method : "GET",
        url : "json/data.json"
    }).then(function mySucces(response) {
        $scope.data = response.data;
		$scope.statuscode = response.status;
		$scope.statustext  = response.statustext;
		console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.data = response.statusText;
    });
  };

  $scope.get().then(function(){
    $scope.verify = $scope.data;

    // var premiumPosts = angular.element(document.getElementById("premiumPosts"));
    // var post, i;
    // for(var i = 1; i < 0; i--){
    //   post = '<a class="PremiumPosts item item-avatar" href="announcement_details.html">\
    //     <img src="'+$scope.data.announcements[i].attachment+'">\
    //     <h2>'+$scope.data.announcements[i].title+'</h2>\
    //     <p>'+$scope.data.announcements[i].description+'</p>\
    //   </a>';

    //   premiumPosts.prepend(post);
    // }
    
  });

  // Mini Filter that toggles if button is clicked
  $scope.filterBooks = function(){
	$scope.booksFilter = true;
	$scope.housingFilter = false;
	$scope.eventFilter = false;
	$scope.mentoringFilter = false;
	$scope.otherFilter = false;
	$scope.allFilters = false;
  }
  $scope.filterHousing = function(){
	$scope.booksFilter = false;
	$scope.housingFilter = true;
	$scope.eventFilter = false;
	$scope.mentoringFilter = false;
	$scope.otherFilter = false;
	$scope.allFilters = false;
  }
  $scope.filterEvents = function(){
	$scope.booksFilter = false;
	$scope.housingFilter = false;
	$scope.eventFilter = true;
	$scope.mentoringFilter = false;
	$scope.otherFilter = false;
	$scope.allFilters = false;
  }
  $scope.filterMentoring = function(){
    $scope.booksFilter = false;
	$scope.housingFilter = false;
	$scope.eventFilter = false;
	$scope.mentoringFilter = true;
	$scope.otherFilter = false;
	$scope.allFilters = false;
  }
  $scope.filterOther = function(){
    $scope.booksFilter = false;
	$scope.housingFilter = false;
	$scope.eventFilter = false;
	$scope.mentoringFilter = false;
	$scope.otherFilter = true;
	$scope.allFilters = false;
  }
  $scope.showAll = function(){
    $scope.booksFilter = true;
	$scope.housingFilter = true;
	$scope.eventFilter = true;
	$scope.mentoringFilter = true;
	$scope.otherFilter = true;
	$scope.allFilters = true;
  }
  $scope.showAll();
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