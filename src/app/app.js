angular.module('bookbottles-showcase', ['ui.router', 'templates-app'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // Configure states here
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'showcase/templates/home.tpl.html',
    controller: 'DashboardCtrl'
  }).state('signup', {
    url: '/signup',
    templateUrl: 'showcase/templates/signup.tpl.html',
    controller: 'SignupCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'showcase/templates/login.tpl.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}).service("TransitStop", ['$http', '$q', function(http, q) {
  return {
    getDepartures: function(stopID) {
      var departures = q.defer();
      // Fetch data from MetroTransit's NexTrip API - documented at http://svc.metrotransit.org/
      http.get("http://svc.metrotransit.org/NexTrip/" + stopID + "?format=json").then(function(data) {
        departures.resolve(data);
      }, function(err) {
        departures.reject(err);
      });
      return departures.promise;
    }
  };
}]).service("User", ['$q', function(q) {
  return {
    login: function(user) {
      var deferred = q.defer();
      if (user && user.username === 'bookbottles' && user.password === 'showcase') {
        delete user.password;
        deferred.resolve(user);
      }
      else {
        deferred.reject("Invalid username/password");
      }
      return deferred.promise;
    },
    signup: function(user) {
      var deferred = q.defer();
      if (user && user.username && user.password === user.passwordConfirm) {
        deferred.resolve("Username " + user.username + " registered");
      }
      else if (user.password != user.passwordConfirm) {
        deferred.reject("Passwords do not match");
      }
      else{
        deferred.reject("Invalid username/password");
      }
      return deferred.promise;
    }
  };
}]).controller("DashboardCtrl", function($scope, TransitStop) {
  $scope.transitStop = {
    id: '15999'
  };

  var promise = TransitStop.getDepartures($scope.transitStop.id);
  promise.then(function(departures) {
    $scope.departures = departures.data;
  });
}).controller("LoginCtrl", function($scope, $rootScope, $state, User) {
  $scope.errors = [];

  $scope.loginUser = function(user) {
    var promise = User.login(user);
    promise.then(function(user) {
      $rootScope.user = user;
      $state.go('home');
    }, function(error) {
      $scope.errors.push({
        msg: error
      });
    });
  };

  $scope.removeError = function(errorIndex) {
    $scope.errors.splice(errorIndex, 1);
  };
}).controller("SignupCtrl", function($scope, $state, User) {
  $scope.signupUser = function(user) {
    var promise = User.signup(user);
    promise.then(function(user) {
      $state.go('login');
    }, function(error) {
      console.log(error);
    });
  };
}).directive('departure', function(){
  return {
    template: '<div class="well">Route {{departure.Route}} {{departure.RouteDirection}} departing {{departure.DepartureText}} <span ng-show="!departure.Actual">(estimated)</span></div>'
  };
}).run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !$rootScope.user) {
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault();
    }
  });
});