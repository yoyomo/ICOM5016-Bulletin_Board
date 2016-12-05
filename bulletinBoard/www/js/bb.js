angular.module('bb', ['ionic'])

.controller('homeCtrl', function($scope, $http, $window) {
	
	$scope.uid = sessionStorage.getItem('uid');
	$scope.username = sessionStorage.getItem('username');
	$scope.email = sessionStorage.getItem('email');

	if(!$scope.username){
		$scope.loggedIn = false;
	}
	else{
		$scope.loggedIn = true;
	}

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

$scope.transferAnnouncement = function(category,postID){
  sessionStorage.setItem('category',category);
  sessionStorage.setItem('postID',postID);
  $window.location.href = "announcement_details.html";
};

$scope.search = function(searchText){
  $scope.master = {};
  $scope.master = angular.copy(searchText);
  if($scope.master){
    return $http({
        method : "GET",
        url : "/db/get/search/"+$scope.master
        }).then(function mySucces(response) {
            $scope.announcements = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");

        }, function myError(response) {
            $scope.data = response.statusText;
        });
    }
    else{
      return $scope.getAnnouncements();
    }
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

.controller('announcementDetailsCtrl', function($scope, $http, $window) {

  $scope.uid = sessionStorage.getItem('uid');
  $scope.username = sessionStorage.getItem('username');
  $scope.email = sessionStorage.getItem('email');

  if(!$scope.username){
    $scope.loggedIn = false;
  }
  else{
    $scope.loggedIn = true;
  }

  $scope.transfer = {category:sessionStorage.getItem('category'),
  postID: sessionStorage.getItem('postID')};

  $scope.getAnnouncementsDetails = function(){
      return $http({
        method : "GET",
        url : "/db/get/announcement/"+$scope.transfer.category+"/"+$scope.transfer.postID+"/"
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

  $scope.transferMessage = function(){
    sessionStorage.setItem('messageuser',$scope.announcement.uid);
    $window.location.href = "messages.html";
  }

  $scope.transferPayment = function(){
    sessionStorage.setItem('sellerid',$scope.announcement.uid);
    sessionStorage.setItem('category',$scope.announcement.category);
    sessionStorage.setItem('postid', $scope.announcement.postid);
    $window.location.href = "payment.html";
  }

  $scope.transferReport = function(){
    sessionStorage.setItem('category',$scope.announcement.category);
    sessionStorage.setItem('postid', $scope.announcement.postid);
    $window.location.href = "report.html";
  }

})

.controller('messageCtrl', function($scope, $http, $window) {
  $scope.uid = sessionStorage.getItem('uid');
  $scope.username = sessionStorage.getItem('username');
  $scope.email = sessionStorage.getItem('email');

  $scope.transfer = {
    messageUser:sessionStorage.getItem('messageuser'),
    loggedInUser: sessionStorage.getItem('uid')
  };

  $scope.getMessageDetails = function(){
      return $http({
        method : "GET",
        url : "/db/get/messages/"+$scope.transfer.loggedInUser+"/"
        +$scope.transfer.messageUser+"/"
    }).then(function mySucces(response) {
        $scope.messages = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.transfer = response.statusText;
    });
  };
  $scope.getMessageDetails();

  $scope.sendMessage = function(text){
    $scope.master = {};
    $scope.master.text = angular.copy(text);

    if($scope.master.text){
      $http({
          method : "GET",
          url : "/db/insert/message/"+$scope.messages[0].chatid+"/"+
          $scope.transfer.loggedInUser+"/"
          +$scope.transfer.messageUser+"/"+
          $scope.master.text+""
      }).then(function mySucces(response) {

      }, function myError(response) {
          $scope.transfer = response.statusText;
      });

      $scope.getMessageDetails();
      $window.location.href = "messages.html";
    }


  };

})

.controller('loginCtrl', function($scope, $http,$window) {
$http({
      method : "GET",
      url : "/db/get/existingUsers"
  }).then(function mySucces(response) {
      $scope.users = response.data;
      $scope.statuscode = response.status;
      $scope.statustext  = response.statustext;
      console.log($scope.statuscode, "Data Retrieved.");

      
  }, function myError(response) {
      $scope.error = response.statusCode + ": User not found";
});

  $scope.login = function(user){
    $scope.master = {};
    $scope.master = angular.copy(user);

    if($scope.master.email && $scope.master.password){
      $http({
          method : "GET",
          url : "/db/get/login/"+$scope.master.email+"/"+$scope.master.password+"/"
      }).then(function mySucces(response) {
          $scope.user = response.data;
          $scope.statuscode = response.status;
          $scope.statustext  = response.statustext;
          console.log($scope.statuscode, "Data Retrieved.");

          if($scope.user[0]){
            sessionStorage.setItem('uid',$scope.user[0].uid);
            sessionStorage.setItem('username',$scope.user[0].username);
            sessionStorage.setItem('email',$scope.user[0].email);
            $window.location.href = "profile.html";
          }
          else{
            $scope.error = "User not found";
          }
      }, function myError(response) {
          $scope.error = response.statusCode + ": User not found";
      });
    
    }
    else{
      $scope.error = "Please write email and password";
    }

  };

  $scope.signUp = function(newUser){

    $scope.master = {};
    $scope.master.newUser = angular.copy(newUser);

    getOut = false;
    if(!$scope.master.newUser.username){
      $scope.usernameError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.newUser.email){
      $scope.emailError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.newUser.password){
      $scope.passwordError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.newUser.confirm){
      $scope.confirmError = errorMessage;
      getOut = true;
    }
    if($scope.master.newUser.password != $scope.master.newUser.confirm){
      $scope.notSameError = "Password must be the same."
      getOut = true;
    }
    

    for(user in $scope.users){
      if($scope.users[user].email===$scope.master.newUser.email){
            $scope.error = "email already exists";
            getOut = true;
            break;
          }
      if($scope.users[user].username===$scope.master.newUser.username){
        $scope.error = "Username already exists";
        getOut = true;
        break;
      }

    }
    if(getOut){
      return;
    }

    $http({
        method : "GET",
        url : "/db/insert/user/"+$scope.master.newUser.username+"/"+
        $scope.master.newUser.email+"/"+
        $scope.master.newUser.password+""

    }).then(function mySucces(response) {
        alert("You have created new account!\nPlease verify your account.");

        $http({
            method : "GET",
            url : "/sendMail/"+$scope.master.newUser.username+"/"+
            $scope.master.newUser.email+""

        }).then(function mySucces(response) {

        }, function myError(response) {
            $scope.error = "Mail not sent";
        });

        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = "Username or email already exists";
        return;
    });
    
  };

})
.controller('profileCtrl', function($scope, $http,$window) {

  $scope.transfer = {
    uid: sessionStorage.getItem('uid'),
    username: sessionStorage.getItem('username'),
    email:sessionStorage.getItem('email')
  };

  $scope.profileDetails = function(user){

    $http({
        method : "GET",
        url : "/db/get/user/"+$scope.transfer.uid+"/"+$scope.transfer.username+
        "/"+$scope.transfer.email
    }).then(function mySucces(response) {
        $scope.user = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";

    });

  };

  $scope.profileDetails();

  $scope.profileDetails = function(user){

    $http({
        method : "GET",
        url : "/db/get/creditcards/"+$scope.transfer.uid+""
    }).then(function mySucces(response) {
        $scope.creditcards = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";

    });

  };

  $scope.profileDetails();

	$scope.chatlogs = function(){

    $http({
        method : "GET",
        url : "/db/get/chatlogs/"+$scope.user.uid
    }).then(function mySucces(response) {
        $scope.chatlogs = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": Announcements not found";

    });

  };
  $scope.transferMessage = function(messageUser){
  	$scope.master = {};
  	$scope.master = angular.copy(messageUser);
    sessionStorage.setItem('messageuser',$scope.master);
    $window.location.href = "messages.html";
  }

  $scope.announcementHistory = function(){

    $http({
        method : "GET",
        url : "/db/get/user/announcements/"+$scope.user.uid
    }).then(function mySucces(response) {
        $scope.announcements = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": Announcements not found";

    });

  };
  $scope.transferAnnouncement = function(category,postID){
    sessionStorage.setItem('category',category);
    sessionStorage.setItem('postID',postID);
    $window.location.href = "announcement_details.html";
  };

  $scope.paymentHistory = function(){

    $http({
        method : "GET",
        url : "/db/get/user/payments/"+$scope.user.uid
    }).then(function mySucces(response) {
        $scope.payments = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": Announcements not found";

    });

  };

  $scope.logout = function(){
	  sessionStorage.removeItem('uid');
	  sessionStorage.removeItem('username');
	  sessionStorage.removeItem('email');
	  $window.location.href = "index.html";
  }


})

.controller('adminCtrl', function($scope, $http,$window) {

  $scope.transfer = {
    uid: sessionStorage.getItem('uid')
  };

  $scope.getAdmin = function(){

    $http({
        method : "GET",
        url : "/db/get/admin/"+$scope.transfer.uid
    }).then(function mySucces(response) {
        $scope.admin = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": Announcements not found";

    });

  };
  $scope.getAdmin();

  $scope.getReports = function(){

    $http({
        method : "GET",
        url : "/db/get/reports/"
    }).then(function mySucces(response) {
        $scope.reports = response.data;
        $scope.statuscode = response.status;
        $scope.statustext  = response.statustext;
        console.log($scope.statuscode, "Data Retrieved.");
        

    }, function myError(response) {
        $scope.error = response.statusCode + ": Announcements not found";

    });


  };
  $scope.getReports();

  $scope.getAnnouncementsDetails = function(category,postID){
      return $http({
        method : "GET",
        url : "/db/get/announcement/"+category+"/"+postID+"/"
    }).then(function mySucces(response) {
        $scope.announcement = response.data;
    $scope.statuscode = response.status;
    $scope.statustext  = response.statustext;
    console.log($scope.statuscode, "Data Retrieved.");

    }, function myError(response) {
        $scope.transfer = response.statusText;
    });
  };

   $scope.ignoreReport = function(category,postID){
    
    if(category && postID){
       return $http({
        method : "GET",
        url : "/db/delete/report/"+category+"/"+postID+"/"
    }).then(function mySucces(response) {
      $scope.report = response.data;
      $scope.statuscode = response.status;
      $scope.statustext  = response.statustext;
      console.log($scope.statuscode, "Data Retrieved.");

      $window.location.href = "administratorpage.html"

    }, function myError(response) {
        $scope.transfer = response.statusText;
    });
    }
     
  };

  $scope.logout = function(){
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    $window.location.href = "index.html";
  };
})

.controller('newPostCtrl',function($scope, $http,$window) {

  $scope.uid = sessionStorage.getItem('uid');
  $scope.username = sessionStorage.getItem('username');
  $scope.email = sessionStorage.getItem('email');

  errorMessage = "Required Field";

  $scope.postEvent = function(announcement,detail){

    $scope.master = {};
    $scope.master.announcement = angular.copy(announcement);
    $scope.master.detail = angular.copy(detail);

    $scope.timestamp = $scope.master.detail.date.year+"-"+
    $scope.master.detail.date.month+"-"+
    $scope.master.detail.date.day+" "+
    $scope.master.detail.date.hour+":"+
    $scope.master.detail.date.minute+":00";

    if(!$scope.master.announcement.title){
      $scope.titleError = errorMessage;
      return;
    }

    $http({
        method : "GET",
        url : "/db/insert/event/"+$scope.uid+"/"+
        $scope.master.announcement.title+"/"+
        $scope.master.announcement.description+"/"+
        $scope.timestamp+"/"+
        $scope.master.detail.location+"/"+
        $scope.master.detail.fee+""
    }).then(function mySucces(response) {
        alert("Your announcement was succesfully posted!");
        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";
    });
    

  };

  $scope.postBook = function(announcement,detail){

    $scope.master = {};
    $scope.master.announcement = angular.copy(announcement);
    $scope.master.detail = angular.copy(detail);

    getOut = false;
    if(!$scope.master.announcement.title){
      $scope.titleError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.detail.name){
      $scope.nameError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.detail.author){
      $scope.authorError = errorMessage;
      getOut = true;
    }

    if(getOut){
      return;
    }
    $http({
        method : "GET",
        url : "/db/insert/book/"+$scope.uid+"/"+
        $scope.master.announcement.title+"/"+
        $scope.master.announcement.description+"/"+
        $scope.master.detail.name+"/"+
        $scope.master.detail.author+"/"+
        $scope.master.detail.edition+"/"+
        $scope.master.detail.year+"/"+
        $scope.master.detail.price+""

    }).then(function mySucces(response) {
        alert("Your announcement was succesfully posted!");
        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";
    });
    

  };

  $scope.postHousing = function(announcement,detail){

    $scope.master = {};
    $scope.master.announcement = angular.copy(announcement);
    $scope.master.detail = angular.copy(detail);

    if(!$scope.master.announcement.title){
      $scope.titleError = errorMessage;
      return;
    }

    $http({
        method : "GET",
        url : "/db/insert/housing/"+$scope.uid+"/"+
        $scope.master.announcement.title+"/"+
        $scope.master.announcement.description+"/"+
        $scope.master.detail.address+"/"+
        $scope.master.detail.monthlyprice+""

    }).then(function mySucces(response) {
        alert("Your announcement was succesfully posted!");
        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";
    });
    

  };

  $scope.postMentorship = function(announcement,detail){

    $scope.master = {};
    $scope.master.announcement = angular.copy(announcement);
    $scope.master.detail = angular.copy(detail);

    getOut = false;
    if(!$scope.master.announcement.title){
      $scope.titleError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.detail.subject){
      $scope.subjectError = errorMessage;
      getOut = true;
    }
    if(getOut){
      return;
    }
    

    $http({
        method : "GET",
        url : "/db/insert/mentorship/"+$scope.uid+"/"+
        $scope.master.announcement.title+"/"+
        $scope.master.announcement.description+"/"+
        $scope.master.detail.subject+"/"+
        $scope.master.detail.fee+""

    }).then(function mySucces(response) {
        alert("Your announcement was succesfully posted!");
        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";
    });
    
  };
    $scope.postOther = function(announcement,detail){

    $scope.master = {};
    $scope.master.announcement = angular.copy(announcement);
    $scope.master.detail = angular.copy(detail);

    getOut = false;
    if(!$scope.master.announcement.title){
      $scope.titleError = errorMessage;
      getOut = true;
    }
    if(!$scope.master.detail.item){
      $scope.itemError = errorMessage;
      getOut = true;
    }
    if(getOut){
      return;
    }
    

    $http({
        method : "GET",
        url : "/db/insert/other/"+$scope.uid+"/"+
        $scope.master.announcement.title+"/"+
        $scope.master.announcement.description+"/"+
        $scope.master.detail.item+""

    }).then(function mySucces(response) {
        alert("Your announcement was succesfully posted!");
        $window.location.href = "index.html";

    }, function myError(response) {
        $scope.error = response.statusCode + ": User not found";
    });
    
  };

})

.controller('paymentCtrl',function($scope, $http,$window) {
  $scope.uid = sessionStorage.getItem('uid');
  $scope.username = sessionStorage.getItem('username');
  $scope.email = sessionStorage.getItem('email');

  $scope.transfer = {
  sellerid : sessionStorage.getItem('sellerid'),
  category : sessionStorage.getItem('category'),
  postid : sessionStorage.getItem('postid')};

  $http({
      method : "GET",
      url : "/db/get/creditcards/"+$scope.uid+""

  }).then(function mySucces(response) {
      $scope.creditcards = response.data;
      $scope.statuscode = response.status;
      $scope.statustext  = response.statustext;
      console.log($scope.statuscode, "Data Retrieved.");

  }, function myError(response) {
      $scope.error = response.statusCode + ": User not found";
  });

  $scope.choosePayment = function(cardid){
    $scope.cardid = angular.copy(cardid);
    
  }

  $scope.pay = function(amount){
    $scope.master = {};
    $scope.master.cardid = $scope.cardid;
    $scope.master.amount = angular.copy(amount);


    if($scope.master.cardid && $scope.master.amount){
      $http({
        method : "GET",
        url : "/db/insert/payment/"+$scope.uid+"/"+
        $scope.transfer.sellerid+"/"+$scope.master.cardid+"/"+
        $scope.transfer.category+"/"+$scope.transfer.postid+"/"+$scope.master.amount+""

      }).then(function mySucces(response) {
          alert("You have successfully paid user "+$scope.transfer.sellerid);
          $window.location.href = "profile.html";

      }, function myError(response) {
          $scope.error = response.statusCode + ": User not found";
      });
    }
  };

})

.controller('reportCtrl',function($scope, $http,$window) {
  $scope.uid = sessionStorage.getItem('uid');
  $scope.username = sessionStorage.getItem('username');
  $scope.email = sessionStorage.getItem('email');

  $scope.transfer = {
  category : sessionStorage.getItem('category'),
  postid : sessionStorage.getItem('postid')};

  $scope.report = function(type,comment){
    $scope.master = {};
    $scope.master.type = angular.copy(type);
    $scope.master.comment = angular.copy(comment);


    if($scope.master.type && $scope.master.comment){
      $http({
        method : "GET",
        url : "/db/insert/report/"+$scope.transfer.category+"/"+
        $scope.transfer.postid+"/"+$scope.uid+"/"+
        $scope.master.type+"/"+$scope.master.comment+""

      }).then(function mySucces(response) {
          alert("You have successfully reported post "+$scope.transfer.category+
            $scope.transfer.postid);
          $window.location.href = "profile.html";

      }, function myError(response) {
          $scope.error = response.statusCode + ": User not found";
      });
    }
  };  
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