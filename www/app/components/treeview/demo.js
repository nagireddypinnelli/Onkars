(function () {
  'use strict';
  angular
      .module('EdgeTreeView')
      .controller('ContactChipDemoCtrl', DemoCtrl);

  function DemoCtrl ($q, $timeout, $rootScope, $scope) {
    var self = this;
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;

    self.allContacts = loadContacts();
    self.contacts = [];
    self.ustOwner = [];
    self.custOwner = [];
    self.asyncContacts = [];
    self.filterSelected = true;
    self.add = add;    
    self.remove = remove;
    self.removeCustOwner = removeCustOwner;
    self.removeUstOwner = removeUstOwner;
    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;
    self.selectedType = 1;
    $scope.$watch('ctrl.contacts', function(){
      console.log(self.contacts);
    });



    /**
     * Search for contacts; use a random delay to simulate a remote call
     */
    function querySearch (criteria) {
      cachedQuery = cachedQuery || criteria;
      return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
    }

    /**
     * Async search for contacts
     * Also debounce the queries; since the md-contact-chips does not support this
     */

    function delayedQuerySearch(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();

        return pendingSearch = $q(function(resolve, reject) {
          // Simulate async search... (after debouncing)
          cancelSearch = reject;
          $timeout(function() {

            resolve( self.querySearch() );

            refreshDebounce();
          }, Math.random() * 500, true)
        });
      }

      return pendingSearch;
    }

    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }

    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;

      return ((now - lastSearch) < 300);
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      console.log(query);
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };

    }

    function loadContacts() {
        var contacts = [];
        console.log($rootScope.isAccountListLoaded);
        console.log($rootScope.isProjectListLoaded);
        if ($rootScope.isAccountListLoaded)
            contacts = $rootScope.accountUserList;
        else if ($rootScope.isProjectListLoaded)
            contacts = $rootScope.projectUserList;
        else if ($rootScope.isOrganizationListLoaded)
            contacts = $rootScope.organizationUserList;
        else
            contacts = $rootScope.usersSearchList;
      return contacts.map(function (c, index) {
        var cParts = c.name.split(' ');
        var contact = {
          name: c.name,
          email: c.email,
          image: 'http://lorempixel.com/50/50/people?' + index,
          id: c._id
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }
    
    /**
     * add and remove function 
     * called when chip is added or removed
     */
    function add(){
        console.log('adding...');
        var checkFlag = false;
        if (self.ustOwner.length > 0 || self.custOwner.length > 0) {
            if(self.ustOwner.length > 0)
                $rootScope.owners.ust = self.ustOwner[0].id;
            if (self.custOwner.length > 0)
                $rootScope.owners.customer = self.custOwner[0].id;
        }
        else{
            $rootScope.newUserId = self.contacts[0].id;
            if (self.selectedType == 1) {
                $rootScope.ownerType = "ustOwner";
            }
            else if (self.selectedType == 2) {
                $rootScope.ownerType = "customerOwner";
            }
        }
       
    }
    
    function remove() {
        $rootScope.newUserId = '';
    }

    function removeCustOwner() {
        $rootScope.owners.customer = "";
        self.custOwner = [];
    }
    function removeUstOwner() {
        self.ustOwner = [];
        $rootScope.owners.ust = "";
    }
    

  }


})();


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/
