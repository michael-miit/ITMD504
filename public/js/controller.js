var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http,$location,$window) {
    $scope.searchQuery = '';
    $scope.currentPage = 1; // Initialize current page
    $scope.rowsPerPage = 3; // Set the number of rows per page
    $scope.startIndex = 0; // Initialize starting index for each page
    $scope.users = []; // Your entire dataset
    $scope.filteredUsers = $scope.users; // Initialize the filtered list with all users

    /***********For Add student detail into database***********/ 
    $scope.user = function(info) {
        $http.post('http://localhost:7000/api/'+'student',info).then(successCallback, errorCallback);

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
         $http.get('http://localhost:7000/api/'+'allstudent').then(successCallback, errorCallback);

         function successCallback(response){
             $scope.users=response.data;
             $scope.filteredUsers = $scope.users;
             console.log( $scope.users);
         }
         function errorCallback(error){
             //error code
         }
     };
     /***********./For Showing All Details of Students in the List***********/

     /***********For Search and Pagination functionality ***********/ 
    $scope.search = function() {
        var query = $scope.searchQuery.toLowerCase();
        $scope.filteredUsers = $scope.users.filter(function(user) {
          return (
            (user.fname && user.fname.toLowerCase().includes(query))
          );
        });
        $scope.currentPage = 1; // Reset current page to 1 when performing a new search
    };

      $scope.totalPages = function() {
        return Math.ceil($scope.filteredUsers.length / $scope.rowsPerPage);
      };
      $scope.getStartIndex = function() {
        return ($scope.currentPage - 1) * $scope.rowsPerPage + 1;
      };

    /***********For updating students details from database**************/  
     $scope.editUser=function(id){
         window.localStorage.setItem('id',id);
         $window.location.href="/edit.html"
     }
     $scope.students=function(info){
        var id=window.localStorage.getItem('id');
        $http.post('http://localhost:7000/api/'+'studentUpdate/'+id,info).then(successCallback, errorCallback);

        function successCallback(response){
            window.location.href="index.html"
        }
        function errorCallback(error){
            //error code
        }
    }
    $scope.editId = function() {
        var id=window.localStorage.getItem('id');
        $http.get('http://localhost:7000/api/'+'studentDetail/'+id).then(successCallback, errorCallback);

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
       $http.get('http://localhost:7000/api/'+'deleteStudents/'+id).then(successCallback, errorCallback);

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