			//Initialize some variables
			var videoSrc = "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";
			var app = angular.module('videoSlicer', []);
			var _duration = 0;
			var video = document.createElement('video');

 

			//Create directive for our custom video player list control
			app.directive('videoPlayerList', function() {
			  return {
				restrict: 'E',
				templateUrl: "videoList.html"
			  };
			});
			
			
			
			
		  
	 	//Create the app controller
		app.controller('MyControl', function($scope, $http){
			$scope.titleHeader;
			$scope.initialLoad = true;
			$scope.videoListIndex = 1;
			$scope.showSliceControls = false;
			$scope.instructions = true;
			
			//Create the base model
			$scope.scenes = [
 
			];
			
			
			//Function to check that the start time and end time follow business rules (cant be greater than the duration or empty)
			$scope.checkTiming = function(_start, _end){
				if(_start == null || _end == null){ // checks to make sure the text fields are filled in
					alert("You need to have a start time and an end time for your scene");
					return false;
				}
				else if(_end > _duration){ // Checks to make sure the end time for the new slice is not greater than the duraton of the movie
					alert("You can not have an end time greater than the total legnth of the movie.")
					return false;
				}
				else if(_start < _end){ // makes sure the user isnt inputting bogus times.
					return true;
				}
				else{
					alert("The start time can not be equal to or greater than the end time");
					return false;
				}
			};
			
			
			
			// Add a scene to the list
			$scope.addScene = function () {
				if($scope.checkTiming($scope.startTime, $scope.endTime)){
					$scope.scenes.push({
						Name: $scope.sceneName,
						StartTime: Math.floor($scope.startTime),
						EndTime: Math.floor($scope.endTime),
						tags: $scope.tags
					});

					// Clear input fields after push
					$scope.sceneName = "";
					$scope.startTime = "";
					$scope.endTime = "";
					$scope.tags = "";
				}
 
			};
			
			
			//Select new video based on keyevent
			$scope.videoSelector = function(keyEvent) {
				switch (keyEvent.which) {
				case 37: //left
					if($scope.videoListIndex > 0){
						$scope.videoListIndex--;
						$scope.playScene($scope.videoListIndex);
					}
					break;
				case 39: //right
					if($scope.videoListIndex < $scope.scenes.length-1){
						$scope.videoListIndex++;
						$scope.playScene($scope.videoListIndex);
					}
					break;
 
				}
			}
			
			//Add the current time to the start time text box
			$scope.addStart = function () {
				$scope.startTime = Math.floor($('video').get(0).currentTime);
			};
			
			//Add the current time to the end time text box
			$scope.addEnd = function () {
				$scope.endTime = Math.floor($('video').get(0).currentTime);
			};
			
			//Removes a scene from the list
			$scope.remove = function (index) {
				
				var msg = confirm("Are you sure you want to delete the scene?");
				if(msg==true){
					$scope.scenes.splice(index, 1);
				}
			};
			
			//updates a scene's data
			$scope.update = function(index, scene){
				if($scope.checkTiming(scene.StartTime, scene.EndTime)){
					$scope.scenes[index].Name = scene.Name;
					$scope.scenes[index].StartTime = scene.StartTime;
					$scope.scenes[index].EndTime = scene.EndTime; 
				}

			};
			
			//Play the scene from the list
			$scope.playScene = function(index){
				var cutScene = videoSrc;
				$scope.instructions = false;
				
				if($scope.scenes[index].StartTime>0){
					cutScene = cutScene + "#t="+$scope.scenes[index].StartTime+","+$scope.scenes[index].EndTime;
				}
				$scope.titleHeader = $scope.scenes[index].Name;
				$scope.videoListIndex = index;
				$scope.showSliceControls = true;
 
				$('video').attr('src',cutScene);
				$('video').get(0).play();
				
				//Selected class shows you which scene you are currently watching byt
				//adding a red border around the item in the list
				$('li').removeClass('selected');
				$("li:nth-child("+(index+1)+")").addClass('selected');
				
			};
			
			
			
			
			
			
			//Video player bindings
			$("video").bind("pause", function() {
				//console.log('paused');
			});
			
			$("video").bind("loadeddata", function(){
				 //console.log('loaded');
				 
			});
			
			$("video").bind("loadedmetadata", function(){
				 //console.log('loadedmetadata');
				 _duration = $('video').get(0).duration;
				 
				 
			});
			
			
			$("video").bind("progress", function(){
				 //console.log('progress');
				 
			});
			
			
	
			
			//Load some sample data
			//Add the full video as the first in the list
			$scope.scenes.push({
				Name: "Full Video",
				StartTime: 0,
				EndTime: $scope._duration,
				tags: "full movie"
			});
			 
			$scope.scenes.push({
				Name: "Slice #1",
				StartTime: 5,
				EndTime: 15,
				tags: "slice 1, start, intro"
			});
			
			$scope.scenes.push({
				Name: "Slice #2",
				StartTime: 10,
				EndTime: 25,
				tags: "middle slice, slice 2, another tag"
			});
			
			$scope.scenes.push({
				Name: "Slice #3",
				StartTime: 20,
				EndTime: 35,
				tags: "middle slice, slice 2, another tag"
			});
			
			
			//Start the first Video
			//$scope.playScene(0);
			 
 
		});
		   
 
