angular.module('templates-app', ['showcase/templates/home.tpl.html', 'showcase/templates/login.tpl.html', 'showcase/templates/signup.tpl.html']);

angular.module("showcase/templates/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("showcase/templates/home.tpl.html",
    "<div><h1>Upcoming Departures from MetroTransit Stop #{{transitStop.id}}</h1></div>\n" +
    "<div class=\"departures\">\n" +
    "  <departure ng-repeat=\"departure in departures|orderBy:'DepartureTime'\">\n" +
    "    \n" +
    "  </departure>\n" +
    "</div>\n" +
    "<a ui-sref=\"login\">Login</a>\n" +
    "<a ui-sref=\"signup\">Sign Up</a>");
}]);

angular.module("showcase/templates/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("showcase/templates/login.tpl.html",
    "<h1>Login</h1>\n" +
    "<form name=\"loginForm\" ng-submit=\"loginUser(user)\">\n" +
    "  <input type=\"text\" ng-model=\"user.username\" required/>\n" +
    "  <input type=\"password\" ng-model=\"user.password\" required/>\n" +
    "  <input type=\"submit\" value=\"Login\" ng-disabled=\"loginForm.$invalid\"/>\n" +
    "</form>\n" +
    "<div class=\"alert alert-danger\" ng-repeat=\"error in errors\" ng-click=\"removeError($index)\">{{error.msg}}</div>\n" +
    "<a ui-sref=\"signup\">Sign Up</a>");
}]);

angular.module("showcase/templates/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("showcase/templates/signup.tpl.html",
    "<h1>Sign Up</h1>\n" +
    "<form name=\"signupForm\" ng-submit=\"signupUser(user)\" novalidate>\n" +
    "  <input type=\"text\" ng-model=\"user.username\" ng-required/>\n" +
    "  <input type=\"password\" id=\"password\" ng-model=\"user.password\" ng-required/>\n" +
    "  <input type=\"password\" id=\"passwordConfirm\" ng-model=\"user.passwordConfirm\" pw-check=\"password\" ng-required/>\n" +
    "  <input type=\"submit\" value=\"Login\" ng-disabled=\"signupForm.$invalid\"/>\n" +
    "</form>\n" +
    "<div class=\"alert alert-danger\" ng-repeat=\"error in errors\" ng-click=\"removeError($index)\">{{error.msg}}</div>\n" +
    "<a ui-sref=\"Login\">Login</a>");
}]);
