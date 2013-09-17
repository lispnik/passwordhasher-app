'use strict';

angular.module('passhashApp', [])
    .controller('MainCtrl', function ($scope) {
        $scope.model = {
            sitetag: null,
            hashword: null,
            hashwordsize: 8,
            masterkey: null,
            requirements: {
                digit: true,
                punctuation: true,
                mixedcase: true
            },
            restrictions: {
                nospecial: false,
                digitsonly: false
            }
        };

        $scope.hashwordsizes = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

        $scope.bump = function () {
            var splitTag = $scope.model.sitetag.match("^(.*):([0-9]+)?$");
            if (splitTag == null || splitTag.length < 3) {
                $scope.model.sitetag += ":1";
            } else {
                $scope.model.sitetag = splitTag[1] + ":" + (parseInt(splitTag[2]) + 1);
            }
        };

        $scope.unmask = function () {
            // TODO
        };

        $scope.update = function () {
            var model = $scope.model;
            if (model.sitetag && model.masterkey) {
                model.hashword = PassHashCommon.generateHashWord(
                    model.sitetag,
                    model.masterkey,
                    model.hashwordsize,
                    model.requirements.digit,
                    model.requirements.punctuation,
                    model.requirements.mixedcase,
                    model.restrictions.nospecial,
                    model.restrictions.digitsonly);
            }
        };

        $scope.$watch("model", function (newVal, oldVal) {
            $scope.update();
        }, true);
    });
