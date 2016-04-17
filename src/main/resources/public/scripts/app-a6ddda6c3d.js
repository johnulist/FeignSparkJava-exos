!function(){"use strict";angular.module("webFrontend",["ngSanitize","ngMessages","ui.router","toastr","satellizer"])}(),function(){"use strict";function n(n,e,a){var i=this;i.wid=n.wid,i.wine=null,i.comment=null,e.findById(i.wid).then(function(n){i.wine=n})["catch"](function(n){a.error("Oops !",n.data)}),i.addComment=function(){e.addComment(i.wid,i.comment).then(function(n){i.comment=null,i.wine.comments.push(n)})["catch"](function(n){a.error("Oops !",n.data)})}}n.$inject=["$stateParams","wineSrv","toastr"],angular.module("webFrontend").controller("WineController",n)}(),function(){"use strict";function n(n,e,a){var i=this;i.cellar=[];var t=function(n){return i.cellar.find(function(e){return n===e.wine.id})};n.getMyCellar().then(function(n){i.cellar=n})["catch"](function(n){a.error("Oops !",n.data)}),i.drink=function(e){n.drink(e).then(function(n){var a=t(e);a.quantity=n})["catch"](function(n){a.error(n.data,"Oops!")})},i.buy=function(n){e.add(n)},i.toggleFavorite=function(e){var i=!e.favorite;n.setFavorite(e.wine.id,i).then(function(n){e.favorite="true"===n})["catch"](function(n){a.error(n.data,"Oops!")})}}n.$inject=["cellarSrv","cartSrv","toastr"],angular.module("webFrontend").controller("CellarController",n)}(),function(){"use strict";function n(n,e){var a=this;a.query=null,a.wines=[],a.wine=null,a.comment=null,a.search=function(){n.search(a.query).then(function(n){a.wines=n,n[0]&&a.select(n[0].id)})["catch"](function(n){e.error("Oops !",n.data)})},a.search(),a.select=function(i){n.findById(i).then(function(n){a.wine=n})["catch"](function(n){e.error("Oops !",n.data)})}}n.$inject=["wineSrv","toastr"],angular.module("webFrontend").controller("CatalogController",n)}(),function(){"use strict";function n(n,e,a,i){var t=this;t.cart=n.shared.cart,t.computeTotal=function(){return t.cart.map(function(n){return n.quantity*n.stock.price}).reduce(function(n,e){return n+e},0)+t.computeTva()},t.computeTva=function(){return.2*t.cart.map(function(n){return n.quantity*n.stock.price}).reduce(function(n,e){return n+e},0)},t.clear=function(){a.clear(),t.total=0},t.remove=function(n){a.remove(n)},t.order=function(){a.order().then(function(){i.info("Commande réussite!"),e.go("cellar")})["catch"](function(n){i.error(n.data)})}}n.$inject=["$rootScope","$state","cartSrv","toastr"],angular.module("webFrontend").controller("CartController",n)}(),function(){"use strict";function n(n,e){var a=this;a.error=null,a.user={email:null,password:null},a.login=function(){return e.login(a.user).then(function(){n.go("cellar")})["catch"](function(){a.error="Invalid login/passowrd :("})}}n.$inject=["$state","loginSrv"],angular.module("webFrontend").controller("LoginController",n)}(),function(){"use strict";function n(){return{restrict:"E",templateUrl:"app/directives/winePrice/wine.price.html",scope:{category:"="}}}angular.module("webFrontend").directive("winePrice",n)}(),function(){"use strict";function n(n){return{restrict:"E",templateUrl:"app/directives/wineImg/wine.image.html",scope:{wine:"="},link:function(e){e.url=n.imgUrl}}}n.$inject=["config"],angular.module("webFrontend").directive("wineImg",n)}(),function(){"use strict";function n(){function n(n,e){var a=this;a.user=e.getUser(),a.signOut=e.logout,a.cart=n.shared.cart}return n.$inject=["$rootScope","loginSrv"],{restrict:"E",templateUrl:"app/directives/navbar/navbar.html",scope:{},controller:n,controllerAs:"vm",bindToController:!0}}angular.module("webFrontend").directive("wineNavbar",n)}(),function(){"use strict";function n(){function n(n){var e=this;e.buy=function(e){n.add(e)}}return n.$inject=["cartSrv"],{restrict:"E",templateUrl:"app/directives/wine/wine.html",scope:{wine:"="},controller:n,controllerAs:"vm"}}angular.module("webFrontend").directive("wineDetail",n)}(),function(){"use strict";function n(n,e){this.findById=function(a){return n.info("Find",a),e.get("api/wine/"+a).then(function(n){return n.data})},this.search=function(a){return n.info("Search",a),e.get("api/wine"+(a?"?q="+a:"")).then(function(n){return n.data})},this.addComment=function(a,i){return n.info("Add comment",i),e.post("api/wine/"+a+"/comments",i).then(function(n){return n.data})}}n.$inject=["$log","$http"],angular.module("webFrontend").service("wineSrv",n)}(),function(){"use strict";function n(n,e){this.login=function(n){return e.login(n)},this.getUser=function(){return e.getPayload()},this.logout=function(){e.logout(),n.go("login")}}n.$inject=["$state","$auth"],angular.module("webFrontend").service("loginSrv",n)}(),function(){"use strict";function n(n,e){this.getMyCellar=function(){return e.get("api/cellar").then(function(n){return n.data})},this.drink=function(a,i){var t=1|i;return n.info("Drink",t,"for",a),e.post("api/cellar/drink/"+a,t).then(function(n){return parseInt(n.data)})},this.setFavorite=function(a,i){return n.info("Favorite",a,i),e.post("api/cellar/favorite/"+a,i).then(function(n){return n.data})}}n.$inject=["$log","$http"],angular.module("webFrontend").service("cellarSrv",n)}(),function(){"use strict";function n(n,e,a,i){var t="cart",s=angular.fromJson(a.getItem(t)||"[]"),r=this;this.getMyCart=function(){return s},this.add=function(e,r){var l=r||1;n.info("Cart, add",l,"for",e);var o=s.find(function(n){return n.wine.id===e});o?(o.quantity+=l,a.setItem(t,angular.toJson(s))):i.findById(e).then(function(n){s.push({wine:n.wine,stock:n.stock,quantity:l}),a.setItem(t,angular.toJson(s))})},this.remove=function(e){n.info("Clear cart");var a=s.indexOf(e);a>=0&&s.splice(a,1)},this.clear=function(){n.info("Clear cart"),s.splice(0,s.length),a.setItem(t,angular.toJson(s))},this.order=function(){var a=s.map(function(n){return{wid:n.wine.id,quantity:n.quantity}}),i={entries:a};return n.info("Order",i),e.post("api/cart/order",i).then(function(){return r.clear(),s})}}n.$inject=["$log","$http","storage","wineSrv"],angular.module("webFrontend").service("cartSrv",n)}(),function(){"use strict";function n(){return function(n){return n?n.replace(/[oöô]/g,"o").replace(/[èéêë]/g,"e"):null}}angular.module("webFrontend").filter("imgName",n)}(),function(){"use strict";function n(){return function(n){return n?n.replace(/\W/g,"").replace(/[èéêë]/g,"e"):"label-default"}}angular.module("webFrontend").filter("cssClass",n)}(),function(){"use strict";function n(n,e,a){n.debug("Started"),e.shared={cart:a.getMyCart()}}n.$inject=["$log","$rootScope","cartSrv"],angular.module("webFrontend").run(n)}(),function(){"use strict";function n(n,e){n.state("login",{url:"/login",templateUrl:"app/routes/login/login.html",controller:"LoginController as vm"}).state("main",{url:"/main","abstract":!0,templateUrl:"app/routes/main/main.html"}).state("cellar",{url:"/cellar",parent:"main",views:{"body@main":{controller:"CellarController as vm",templateUrl:"app/routes/main/cellar/cellar.html"}}}).state("catalog",{url:"/catalog",parent:"main",views:{"body@main":{controller:"CatalogController as vm",templateUrl:"app/routes/main/catalog/catalog.html"}}}).state("wine",{url:"/wine/:wid",parent:"main",views:{"body@main":{controller:"WineController as vm",templateUrl:"app/routes/main/wine/wine.html"}}}).state("cart",{url:"/cart",parent:"main",views:{"body@main":{controller:"CartController as vm",templateUrl:"app/routes/main/cart/cart.html"}}}),e.otherwise("/login")}n.$inject=["$stateProvider","$urlRouterProvider"],angular.module("webFrontend").config(n)}(),function(){"use strict";angular.module("webFrontend").constant("storage",localStorage)}(),function(){"use strict";function n(n,e,a,i){e.debugEnabled(!0),a.allowHtml=!0,a.timeOut=3e3,a.positionClass="toast-top-right",a.preventDuplicates=!0,a.progressBar=!0,i.loginUrl=n.loginUrl+"api/auth/login"}n.$inject=["config","$logProvider","toastrConfig","$authProvider"],angular.module("webFrontend").config(n)}(),angular.module("webFrontend").run(["$templateCache",function(n){n.put("app/directives/navbar/navbar.html",'<nav class="navbar navbar-dark"><a class="navbar-brand" ui-sref="cellar">My Cellar</a><div class="container"><ul class="nav navbar-nav"><li class="nav-item" ui-sref-active="active"><a class="nav-link" ui-sref="cellar">Ma Cave</a></li><li class="nav-item" ui-sref-active="active"><a class="nav-link" ui-sref="catalog">Catalogue</a></li></ul><ul class="nav navbar-nav pull-xs-right"><li class="nav-item" ui-sref-active="active" ng-if="vm.cart.length"><a class="nav-link" ui-sref="cart" title="Mon panier"><i class="fa fa-shopping-cart"></i> <span class="label label-pill label-default">{{vm.cart.length}}</span></a></li><li class="nav-item"><a class="nav-link"><i class="fa fa-user"></i>{{vm.user.email}}</a></li><li class="nav-item"><a class="nav-link" ng-click="vm.signOut()" title="Quitter"><i class="fa fa-sign-out"></i></a></li></ul></div></nav>'),n.put("app/directives/wine/wine.html",'<div class="wine detail"><h3 ui-sref="wine({wid:wine.id})"><span class="appellation">{{wine.appellation}}</span> - <span class="millesime">{{wine.millesime}}</span> <span class="label label-pill {{wine.couleur | cssClass}}">{{wine.region}} - {{wine.couleur}}</span></h3><h4 class="text-muted">{{wine.produit}}</h4><div class="actions"><wine-price category="wine.priceCategory"></wine-price><a class="btn btn-danger-outline" ng-click="vm.buy(wine.id)"><i class="fa fa-cart-plus"></i> Acheter</a></div><div class="info"><wine-img wine="wine"></wine-img><ul class="characteristics"><li ng-show="wine.cepageDominant"><span class="lbl">Cépage</span> <span class="value">{{wine.cepageDominant}}</span></li><li ng-show="wine.alcool"><span class="lbl">Alcool</span> <span class="value">{{wine.alcool}}</span></li><li ng-show="wine.temperatureDeService"><span class="lbl">Température de service</span> <span class="value">{{wine.temperatureDeService}}</span></li><li>&nbsp;</li><li ng-show="wine.conservation"><span class="lbl">Conservation</span> <span class="value">{{wine.conservation}}</span></li><li ng-show="wine.aBoireAPartirDe"><span class="lbl">A boire à partir de</span> <span class="value">{{wine.aBoireAPartirDe}}</span></li><li ng-show="wine.garderJusquA"><span class="lbl">Garder jusqu\'en</span> <span class="value">{{wine.garderJusquA}}</span></li><li>&nbsp;</li><li ng-show="wine.aOeil"><span class="lbl">A l\'oeil</span> <span class="value">{{wine.aOeil}}</span></li><li ng-show="wine.auNez"><span class="lbl">Au nez</span> <span class="value">{{wine.auNez}}</span></li><li ng-show="wine.enBouche"><span class="lbl">En Bouche</span> <span class="value">{{wine.enBouche}}</span></li><li>&nbsp;</li><li ng-show="wine.accordsMetsVin"><span class="lbl">Accords mets-vin</span> <span class="value">{{wine.accordsMetsVin}}</span></li><li ng-show="wine.accordsRecommandes"><span class="lbl">Accords recommandés</span> <span class="value">{{wine.accordsRecommandes}}</span></li></ul><div class="wine-region-img" ng-if="wine.region"><img ng-src="assets/regions/{{wine.region | imgName}}.png" alt="{{wine.region}}"></div></div></div>'),n.put("app/directives/wineImg/wine.image.html",'<div class="wine-img"><img ng-src="{{url}}images/{{wine.image}}" alt="{{wine.produit}}"></div>'),n.put("app/directives/winePrice/wine.price.html",'<span class="btn btn-secondary wine-price"><span class="price"><i class="fa fa-eur"></i> <i class="fa fa-eur" ng-show="category === \'MID\' || category === \'EXP\'"></i> <i class="fa fa-eur" ng-show="category === \'EXP\'"></i></span></span>'),n.put("app/routes/login/login.html",'<div class="login"><form name="loginForm" ng-submit="vm.login()" novalidate=""><div class="logo"><img src="assets/images/login.jpg" alt="Wine Glass"></div><p class="error bg-danger" ng-if="vm.error">{{vm.error}}</p><div class="form-group" ng-class="{\'has-danger\': loginForm.email.$invalid && loginForm.email.$dirty}"><span class="input-group"><span class="input-group-addon"><i class="fa fa-envelope-o"></i></span> <input ng-model="vm.user.email" name="email" type="email" class="form-control" placeholder="Email" required=""></span> <small class="text-danger" ng-if="loginForm.email.$error.required && loginForm.email.$dirty">Login obligatoire !</small> <small class="text-danger" ng-if="loginForm.email.$error.email && loginForm.email.$dirty">Adresse email invalide !</small></div><div class="form-group" ng-class="{\'has-danger\': loginForm.pwd.$invalid && loginForm.pwd.$dirty}"><span class="input-group"><span class="input-group-addon"><i class="fa fa-user-secret"></i></span> <input ng-model="vm.user.password" name="pwd" type="password" class="form-control" placeholder="Mot de passe" required=""></span> <small class="text-danger" ng-if="loginForm.pwd.$error.required && loginForm.pwd.$dirty">Mot de passe obligatoire !</small></div><div class="actions"><button type="submit" class="btn btn-primary" ng-disabled="!loginForm.$valid"><i class="fa fa-sign-in"></i> Authentification</button></div></form></div>'),n.put("app/routes/main/main.html",'<wine-navbar></wine-navbar><div class="main container-fluid"><main ui-view="body"></main></div>'),n.put("app/routes/main/cart/cart.html",'<div class="cart"><h1>Mon panier</h1><div class="actions"><a class="btn btn-danger-outline" ng-click="vm.clear()"><i class="fa fa-trash"></i> Vider le panier</a></div><form class="wines" ng-show="vm.cart.length" ng-submit="vm.order()"><div class="wine card" ng-repeat="stock in vm.cart as searchResult"><wine-img wine="stock.wine"></wine-img><div class="info"><h3><a class="btn btn-danger-outline btn-sm" ng-click="vm.remove(stock)"><i class="fa fa-trash"></i></a> <span class="appellation">{{stock.wine.appellation}} - {{stock.wine.contenance}}</span> <span class="millesime">{{stock.wine.millesime}}</span></h3><h4 class="text-muted">{{stock.wine.produit}}</h4><p ng-show="stock.wine.accordsMetsVin"><i class="fa fa-cutlery"></i> {{stock.wine.accordsMetsVin}}</p><p ng-show="stock.wine.accordsRecommandes">{{stock.wine.accordsRecommandes}}</p></div><div class="wine-qty"><fieldset class="form-group"><input type="number" ng-model="stock.quantity" min="0" class="form-control"></fieldset><div class="total">{{stock.quantity * stock.stock.price | currency}}</div></div></div><div class="actions"><span class="tva">TVA: {{vm.computeTva() | currency}}</span></div><div class="actions"><span class="total">Total: {{vm.computeTotal() | currency}}</span></div><div class="actions"><button type="submit" class="btn btn-primary"><i class="fa fa-credit-card"></i> Commander</button></div></form><div class="alert alert-warning" role="alert" ng-hide="vm.cart.length"><strong>Panier vide !</strong> <a class="btn btn-secondary-outline" ui-sref="catalog">Ajouter un vin du catalogue</a></div></div>'),n.put("app/routes/main/catalog/catalog.html",'<div class="catalog"><header><h1>Catalogue</h1><form class="form-inline"><div class="form-group"><div class="input-group"><input ng-model="vm.query" type="text" class="form-control" placeholder="Rechercher..." ng-model-options="{ debounce: 250 }" ng-change="vm.search()"> <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span></div></div></form></header><section class="search-matches"><ul class="search-result"><li ng-repeat="wine in vm.wines" ng-class="{\'active\': wine.id === vm.wine.wine.id}" ng-click="vm.select(wine.id)"><h3><span class="appellation">{{wine.appellation}}</span> <span class="millesime">{{wine.millesime}}</span></h3><div class="text-muted">{{wine.produit}}</div><div class="info"><wine-price category="wine.priceCategory"></wine-price><a ui-sref="wine({wid: wine.id})" class="btn btn-secondary-outline btn-sm pull-right">Detail</a></div></li></ul><div class="detail"><wine-detail wine="vm.wine.wine"></wine-detail></div></section></div>'),n.put("app/routes/main/cellar/cellar.html",'<div class="cellar"><header><h1>Ma cave</h1><form class="form-inline"><div class="form-group"><div class="input-group"><input ng-model="vm.search.wine" type="text" class="form-control" placeholder="Rechercher..."> <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span></div></div></form></header><div class="wines"><div class="card wine" ng-repeat="stock in vm.cellar | filter:vm.search.wine as searchResult" ng-class="{\'empty\':stock.quantity<=0}"><div class="card-header"><h3><button ng-click="vm.toggleFavorite(stock)" class="btn btn-secondary btn-sm"><i class="fa fa-heart" ng-class="{\'fa-heart\':stock.favorite, \'fa-heart-o\':!stock.favorite}"></i></button> <span class="appellation">{{stock.wine.appellation}}</span> <span class="millesime">{{stock.wine.millesime}}</span></h3><h4 class="text-muted">{{stock.wine.produit}}</h4></div><div class="card-block info"><wine-img wine="stock.wine"></wine-img><div class="wine-actions"><span class="btn wine-quantity btn-block" ng-class="{\'btn-secondary\':stock.quantity>0, \'btn-danger-outline\':stock.quantity<=0}">{{stock.quantity}} Btls.</span><wine-price category="stock.wine.priceCategory"></wine-price><button class="btn btn-primary-outline btn-block" ng-click="vm.drink(stock.wine.id)" ng-show="stock.quantity>0"><i class="fa fa-glass"></i> Boire</button> <a class="btn btn-block" ng-click="vm.buy(stock.wine.id)" ng-class="{\'btn-danger-outline\':stock.quantity>0, \'btn-danger\':stock.quantity<=0}"><i class="fa fa-cart-plus"></i> Acheter</a></div></div><div class="card-block wine-kind"><span class="label label-pill {{stock.wine.couleur | cssClass}}">{{stock.wine.region}} - {{stock.wine.couleur}}</span></div><div class="card-block actions"><a ui-sref="wine({wid: stock.wine.id})" class="btn btn-block btn-secondary-outline">Détail</a></div><div class="card-block"><p class="card-text" ng-show="stock.wine.accordsMetsVin"><i class="fa fa-cutlery"></i> {{stock.wine.accordsMetsVin}}</p></div></div></div><div class="alert alert-warning" role="alert" ng-if="!searchResult.length"><strong>Vide !</strong><div ng-hide="vm.search.wine">Pas de vin dans votre cave <a class="btn btn-secondary-outline" ui-sref="catalog">Sélectionner un vin du catalogue</a></div><div ng-show="vm.search.wine">Auncun vin de votre cave correspond à votre recherche</div></div></div>'),n.put("app/routes/main/wine/wine.html",'<div class="detail"><wine-detail wine="vm.wine.wine"></wine-detail><hr><div class="comments"><form ng-submit="vm.addComment()"><header><h2>Commentaires</h2></header><article ng-repeat="comment in vm.wine.comments" class="comment"><blockquote class="blockquote"><p class="m-b-0">{{comment.message}}</p><footer class="blockquote-footer"><span class="date">{{comment.date |date}}</span>, <abbr title="{{comment.email}}">{{comment.author}}</abbr></footer></blockquote></article><hr><textarea class="form-control" ng-model="vm.comment" rows="3" placeholder="Votre commentaire ..."></textarea><div class="actions"><button type="submit" class="btn btn-primary" ng-disabled="!vm.comment"><i class="fa fa-comment"></i> Ajouter un commentaire</button></div></form></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-a6ddda6c3d.js.map