// angular.module('siteApp', []).directive('tooltip', function ($document, $compile) {
//   return {
//     link: function (scope, element, attrs) {

//         $(element).on("mouseover", function () {
//             $(this).append("<span>"+ attrs.tooltip +"</span>");
//         });

//         $(element).on("mouseout", function () {
//             $(this).find("span").remove();
//         });

//         scope.$on("$destroy", function () {
//             $(element).off("mouseover");
//             $(element).off("mouseout");
//         });
//     }
//   };
// });