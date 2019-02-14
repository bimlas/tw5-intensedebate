/*\
title: $:/plugins/bimlas/intensedebate/intensedebate.js
type: application/javascript
module-type: widget

Intensedebate comments widget

\*/
(function() {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	var Widget = require("$:/core/modules/widgets/widget.js").widget;

	var IntensedebateWidget = function(parseTreeNode,options) {
		this.initialise(parseTreeNode,options);
	};

	/*
	Inherit from the base widget class
	*/
	IntensedebateWidget.prototype = new Widget();

	/*
	Render this widget into the DOM
	*/
	IntensedebateWidget.prototype.render = function(parent,nextSibling) {
		this.parentDomNode = parent;
		this.execute();

		var current = this.getAttribute("tiddler",this.getVariable("currentTiddler"));

		window.idcomments_acct = $tw.wiki.getTiddlerText('$:/config/bimlas/intensedebate/acct');
		window.idcomments_post_url = $tw.wiki.getTiddlerText('$:/config/bimlas/intensedebate/url') + encodeURIComponent(current);
		window.idcomments_post_id = $tw.wiki.getTiddlerText('$:/config/bimlas/intensedebate/url') + encodeURIComponent(current);

		/* Load comments */
		var loader = document.createElement('script');
		loader.src = 'https://www.intensedebate.com/js/genericCommentWrapperV2.js';

		var post_title = document.createElement('span');
		post_title.id = 'IDCommentsPostTitle';
		post_title.setAttribute('style','display:none');

		parent.insertBefore(loader,nextSibling);
		this.domNodes.push(loader);
		parent.insertBefore(post_title,nextSibling);
		this.domNodes.push(post_title);
	};

	/*
	Compute the internal state of the widget
	*/
	IntensedebateWidget.prototype.execute = function() {
	};

	/*
	Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
	*/
	IntensedebateWidget.prototype.refresh = function(changedTiddlers) {
		return false;
	};

	exports.intensedebate = IntensedebateWidget;

})();
