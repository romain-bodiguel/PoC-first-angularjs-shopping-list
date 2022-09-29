const app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $window) {

  $scope.favicons = [
    "favicon1.png",
    "favicon2.png",
    "favicon3.png"
  ];
 
  $scope.products = [
    {
      product: "Lait",
      quantity: 2,
    },
    {
      product: "Cookies",
      quantity: 1,
    },
    {
      product: "Pain",
      quantity: 5,
    }
  ];

  $scope.productsCount = function() {
    $scope.numberOfProducts = $scope.products.length;
    if($scope.numberOfProducts == 0) {
      return "Vous n'avez pas d'item dans votre liste.";
    } else if($scope.numberOfProducts == 1) {
      return "Nombre d'item dans votre liste : " + $scope.numberOfProducts;
    } else {
      return "Nombre d'items dans votre liste : " + $scope.numberOfProducts;
    }
  };

  $scope.productsCount();
  $scope.titleUpdate = false;
  $scope.listTitle = $window.localStorage.setItem('title', 'Ma nouvelle liste');
  $scope.listTitle = $window.localStorage.getItem('title');
  $scope.errortext = "";
  $scope.favicon = $window.localStorage.setItem('favicon', 'favicon1.png');
  $scope.favicon = $window.localStorage.getItem('favicon');

  $scope.updateTitle = function() {
    $scope.titleUpdate = true;
  };

  $scope.updateNewTitle = function(value) {
    $scope.listTitle = value;
    $scope.titleUpdate = false;
    $window.localStorage.setItem('title', $scope.listTitle);
  };

  $scope.removeError = function() {
    $scope.errortext = "";
  };

  $scope.selectQuantity = function() {
    let quantitySelected = [];

    for (let i = 0; i <= 10; i++) {
      quantitySelected.push(i);
    }
    return quantitySelected;
  };

  $scope.addItem = function () {

    if (!$scope.newProduct) {
      return;
    };

    if ($scope.products.map(item => item.product).indexOf($scope.newProduct.product, 0) != -1) {
      $scope.errortext = "L'item est déjà dans votre liste de course.";
      return;
    } else if ($scope.newProduct.product == undefined || $scope.newProduct.product == NaN || $scope.newProduct.product == '' || $scope.newProduct.product == {}) {
      $scope.errortext = "Veuillez saisir un produit.";
      return;
    } else if ($scope.newProduct.quantity == undefined || $scope.newProduct.quantity == NaN || $scope.newProduct.quantity == '') {
      $scope.errortext = "Veuillez saisir une quantité.";
      return;
    } else {
      $scope.products.push($scope.newProduct);
      $scope.newProduct = {};
      $scope.form.$setPristine();
      $scope.form.$setUntouched();
      $scope.errortext = "";
      return;
    }
  };

  $scope.removeItem = function (index) {
    $scope.products.splice(index, 1);
  };

  $scope.update = false;
  $scope.indexOfUpdatedProduct = undefined;

  $scope.updateItem = function(index) {
    $scope.update = true;
    $scope.indexOfUpdatedProduct = index;
  };

  $scope.updateItemName = function($index, value) {
    for (let i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].product == value && $index != i) {
        $scope.errortext = "L'item est déjà dans votre liste de course.";
        return;
      }
    };

    $scope.products[$index].product = value;
    $scope.update = false;
    $scope.indexOfUpdatedProduct = undefined;
    $scope.errortext = "";
    return;
  };

  $scope.selectedIcon = function(value) {
    $scope.favicon = value;
    $window.localStorage.setItem('favicon', $scope.favicon);
  };
});