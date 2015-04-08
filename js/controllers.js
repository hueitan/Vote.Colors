'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('index', ['$scope', '$injector', function ($scope, $injector) {

        // Variable
        var $http,
            totalVote,
            largestVote = 0,
            largestcolor;

        // Injector
        $http = $injector.get('$http');

        // Main Function
        $http.get('data/color.json')
            .success(function (data) {
                $scope.colors = data;
            });

        $http.get('data/vote.json')
            .success(function (data) {
                $scope.votes = data;

                // Initialization
                totalVote = $scope.votes.length;

                for (var i = 0; i < $scope.colors.length; i++) {
                    $scope.colors[i].numberOfVote = 0;
                }

                // Calcuate the vote
                for (var idx = 0; idx < $scope.votes.length; idx++) {
                    for (var index = 0; index < $scope.colors.length; index++) {
                        if (($scope.votes[idx].vote).toLowerCase() === ($scope.colors[index].name).toLowerCase()) {
                            $scope.colors[index].numberOfVote++;
                            if ($scope.colors[index].numberOfVote > largestVote) {
                                largestcolor = $scope.colors[index].hex;
                                largestVote = $scope.colors[index].numberOfVote;
                            }
                            break;
                        }
                    }
                }

                // Calculate Number of Vote for every color
                for (var index = 0; index < $scope.colors.length; index++) {
                    $scope.colors[index].numberOfVote = $scope.colors[index].numberOfVote / totalVote * 100;
                }

                $scope.largestcolor = largestcolor;
                $scope.largestVote = largestVote;
                $scope.totalVote = totalVote;
            });
    }]);
