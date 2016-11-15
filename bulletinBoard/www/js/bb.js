angular.module('bb', ['ionic'])

.controller('homeCtrl', function($scope, $http, $window) {

  $scope.getAnnouncements = function(){
      return $http({
        method : "GET",
        url : "/db/get/announcements"
    }).then(function mySucces(response) {
        $scope.announcements = response.data;
    $scope.statuscode = response.status;
    $scope.statustext  = response.statustext;
    console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.data = response.statusText;
    });
  };
$scope.getAnnouncements();
$scope.getPremiumPosts = function(){
      return $http({
        method : "GET",
        url : "/db/get/premiumPosts"
    }).then(function mySucces(response) {
        $scope.premiumPosts = response.data;
    $scope.statuscode = response.status;
    $scope.statustext  = response.statustext;
    console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.data = response.statusText;
    });
  };
$scope.getPremiumPosts();


$scope.setTransfer = function(category,postID){
  sessionStorage.setItem('category',category);
  sessionStorage.setItem('postID',postID);
  $window.location.href = "announcement_details.html";
};

  // Mini Filter that toggles if button is clicked
  $scope.filterBooks = function(){
  	$scope.bFilter = true;
  	$scope.hFilter = false;
  	$scope.eFilter = false;
  	$scope.mFilter = false;
  	$scope.oFilter = false;
  	$scope.allFilters = false;
  }
  $scope.filterHousing = function(){
  	$scope.bFilter = false;
  	$scope.hFilter = true;
  	$scope.eFilter = false;
  	$scope.mFilter = false;
  	$scope.oFilter = false;
  	$scope.allFilters = false;
  }
  $scope.filterEvents = function(){
  	$scope.bFilter = false;
  	$scope.hFilter = false;
  	$scope.eFilter = true;
  	$scope.mFilter = false;
  	$scope.oFilter = false;
  	$scope.allFilters = false;
  }
  $scope.filterMentoring = function(){
    $scope.bFilter = false;
  	$scope.hFilter = false;
  	$scope.eFilter = false;
  	$scope.mFilter = true;
  	$scope.oFilter = false;
  	$scope.allFilters = false;
  }
  $scope.filterOther = function(){
    $scope.bFilter = false;
  	$scope.hFilter = false;
  	$scope.eFilter = false;
  	$scope.mFilter = false;
  	$scope.oFilter = true;
  	$scope.allFilters = false;
  }
  $scope.showAll = function(){
    $scope.bFilter = true;
  	$scope.hFilter = true;
  	$scope.eFilter = true;
  	$scope.mFilter = true;
  	$scope.oFilter = true;
  	$scope.allFilters = true;
  }
  $scope.showAll();
})

.controller('announcementDetailsCtrl', function($scope, $http) {

  $scope.transfer = {category:sessionStorage.getItem('category'),
  postID: sessionStorage.getItem('postID')};

  $scope.getAnnouncementsDetails = function(){
      return $http({
        method : "GET",
        url : "/db/get/"+$scope.transfer.category+"/"+$scope.transfer.postID+"/"
    }).then(function mySucces(response) {
        $scope.announcement = response.data;
    $scope.statuscode = response.status;
    $scope.statustext  = response.statustext;
    console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.transfer = response.statusText;
    });
  };
  $scope.getAnnouncementsDetails();

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