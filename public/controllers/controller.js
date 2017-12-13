/*
var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope) {
    $scope.name= "John Kelvin";
    $scope.email= "doe@gmail.com";
    $scope.number= "897564100";
    console.log("Hello from Controller");
});
*/

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	console.log("Hello World from controller");
 
 	//get data from server
	var refresh = function() {
		$http.get('/contactlist').then(function(response){
		    console.log("Controller received data: "+response.data);
		    $scope.contactList = response.data;
		    $scope.contact = null ; // do not use "" instead of null
		});
	}

	refresh();

	//post data and refresh read
  	$scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact).then(function(response) {
        	console.log(response);
        	refresh();
        });
    };
    

    //remove
    $scope.remove = function(id){
    	console.log(id) ;
    	$http.delete('/contactList/' + id) .then(function(response) {
 			 // ... stuff here
			}).catch(angular.noop);  
    	refresh();
    };

    // edit
     $scope.edit = function(id){
    	console.log(id) ;
    	$http.get('/contactList/' + id) .then(function(response) {
 			 $scope.contact = response.data ;
			}).catch(angular.noop);  
    };

	//post data and refresh read
  	$scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact) .then(function(response) {
 			 refresh() ;
			}).catch(angular.noop);  
    };

    $scope.deselect = function() {
    	$scope.contact = "" ;
    }

}]);