//var angular = require('angular');
var img2fire = angular.module('img2fire', ['firebase', 'angular.filter']);

img2fire.controller("base64Ctrl", function($scope, $firebaseArray) {


  var img = new Firebase("https://supercp-a8e9e.firebaseio.com/images/total");
  $scope.imgs = $firebaseArray(img);

  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

  $scope.deleteimg = function(imgid) {
    var r = confirm("Do you want to remove this image ?");
    if (r == true) {
      $scope.imgs.forEach(function(childSnapshot) {
        if (childSnapshot.$id == imgid) {
            $scope.imgs.$remove(childSnapshot).then(function(ref) {
              ref.key() === childSnapshot.$id; // true
            });
        }
      });
    }
  }

});