/*jslint  browser: true, white: true, plusplus: true */
/*global $, mots */

$(function () {
    'use strict';

    var motsArray = $.map(mots, function (value, key) { return { value: value, data: key }; });

    // Setup jQuery ajax mock:
   /* $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(motsArray, function (mot) {
                     // return mot.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(mot.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });*/

    // Initialize ajax autocomplete:
    $('#search-metnav').autocomplete({
        //serviceUrl: 'getKeywords',
        lookup: motsArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },

        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        },
    });

    // Initialize autocomplete with local lookup:
    $('#autocomplete').devbridgeAutocomplete({
        lookup: motsArray,
        minChars: 2,
        onSelect: function (suggestion) {
            $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry, no matching results',
    });
    
    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-custom-append').autocomplete({
        lookup: motsArray,
        appendTo: '#suggestions-container'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-dynamic').autocomplete({
        lookup: motsArray
    });
});