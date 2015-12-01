'use strict';

/*angular.module('campaignModule')
  .controller('campaignControllerMain', ['$scope', 'campaignBinder', function ($scope, campaignBinder) {
    $scope.editing = [];
    $scope.campaignCollection = campaignBinder.query();

    $scope.save = function(){
      if(!$scope.newCampaign || $scope.newCampaign.length < 1) return;
      var campaign = new campaignBinder({ title: $scope.newCampaign, $scope});

      campaign.$save(function(){
        $scope.campaignCollection.push(campaign);
        $scope.newCampaign = ''; // clear textbox
      });
    };

    $scope.update = function(index){
      var campaign = $scope.campaignCollection[index];
      campaignBinder.update({id: campaign._id}, campaign);
      $scope.editing[index] = false;
    };

    $scope.edit = function(index){
      $scope.editing[index] = angular.copy($scope.campaignCollection[index]);
    };

    $scope.cancel = function(index){
      $scope.campaignCollection[index] = angular.copy($scope.editing[index]);
      $scope.editing[index] = false;
    };

    $scope.remove = function(index){
      var campaign = $scope.campaignCollection[index];
      campaignBinder.remove({id: campaign._id}, function(){
        $scope.campaignCollection.splice(index, 1);
      });
    };
  }]);*/



var campaignApp = angular.module('ideation.campaign')
campaignApp.controller('campaignControllerMain', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    console.log("campaignControllerMain:: invoked");

var id = $routeParams.id;
$scope.mode=(id==null? 'add': 'edit');
console.log("Id:" + id + ":" + $scope.mode);

var refresh = function() {
  $http.get('/campaignApi').success(function(response) {
    console.log("Campaign refresh");
    $scope.campaignList = response;

    switch($scope.mode)    {
      case "add":
        $scope.campaign = "";
        console.log('add mode ready')
        break;

      case "edit":
        $scope.campaign = $http.get('campaignApi/' + id).success(function(response){
          $scope.campaign = response;

          // reformat date fields to avoid type compability issues with <input type=date on ng-model
          $scope.campaign.startDate = new Date($scope.campaign.startDate);
          $scope.campaign.endDate = new Date($scope.campaign.endDate);
        });
        console.log('edit mode to be implemented');

    }
    
  });
};

refresh();

$scope.save = function(){
  switch($scope.mode)    {
    case "add":
      $scope.create();
      console.log("create campaign");
      break;

    case "edit":
      $scope.update();
      console.log("update campaign");
      break;
  }
}

$scope.create = function() {
  console.log("create a campaign");
  console.log($scope.campaign);
  $http.post('/campaignApi', $scope.campaign).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.delete = function(id) {
  console.log("Delete[Campaign::${id}]");
  $http.delete('/campaignApi/' + id).success(function(response) {
    refresh();
  });
};

$scope.update = function(id) {
  console.log("Update[Campaign::${id}]");
  $http.get('/campaignApi/' + id).success(function(response) {
    $scope.campaign = response;
  });
};  

$scope.update = function() {
  console.log(("Delete[Campaign::#{id}]"));
  console.log($scope.campaign._id);
  $http.put('/campaignApi/' + $scope.campaign._id, $scope.campaign).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.campaign = "";
}

}]);﻿
