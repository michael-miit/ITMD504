var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http,$location,$window) {
    $scope.searchQuery = '';
    /***********For Add student detail into database***********/ 
    $scope.user = function(info) {
        $http.post('http://64.23.217.89:7000/api/'+'student',info).then(successCallback, errorCallback);

        function successCallback(response){
            window.location.href="index.html"
            console.log(info)
        }
        function errorCallback(error){
            //error code
        }
     };
     /***********./For Add student detail into database***********/ 

     /***********Redirect to list of student***********/ 
    $scope.redirect=function(){
        window.location.href="index.html"
    }
    
     /***********./Redirect to list of student***********/ 

     /***********For Showing All Details of Students in the List***********/ 
     $scope.allUsers=function(){
         $http.get('http://64.23.217.89:7000/api/'+'allstudent').then(successCallback, errorCallback);

         function successCallback(response){
             $scope.users=response.data;
             console.log( $scope.users);
         }
         function errorCallback(error){
             //error code
         }
     };
     $scope.searchFilter = function(user) {
        var query = $scope.searchQuery.toLowerCase();
        return (
          (user.fname && user.fname.toLowerCase().includes(query))
        );
      };
     /***********./For Showing All Details of Students in the List***********/ 

    /***********For updating students details from database**************/  
     $scope.editUser=function(id){
         window.localStorage.setItem('id',id);
         $window.location.href="/edit.html"
     }
     $scope.students=function(info){
        var id=window.localStorage.getItem('id');
        $http.post('http://64.23.217.89:7000/api/'+'studentUpdate/'+id,info).then(successCallback, errorCallback);

        function successCallback(response){
            window.location.href="index.html"
        }
        function errorCallback(error){
            //error code
        }
    }
    $scope.editId = function() {
        var id=window.localStorage.getItem('id');
        $http.get('http://64.23.217.89:7000/api/'+'studentDetail/'+id).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.userinfo=response.data;
            console.log($scope.userinfo);
        }
        function errorCallback(error){
            console.log(error);
            //error code
        }

    };
    /***********./For updating students details from database**************/ 

    /***********For deleting students details from database**************/
    $scope.deleteUser=function(id){
       $http.get('http://64.23.217.89:7000/api/'+'deleteStudents/'+id).then(successCallback, errorCallback);

       function successCallback(response){
           $scope.deleteId=response.data;
           console.log($scope.deleteId);
           window.location.href="index.html"
       }
       function errorCallback(error){
           console.log(error);
       }
   }
    /***********./For deleting students details from database**************/ 

    

});