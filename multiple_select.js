/*
Script:
  multiple_select.js

License:
  MIT-style license
  
Group: HTML Widgets
  provides customizable multiple select widgets

Based on:
  comboBoo.js by Bruno Torrinha, <http://www.torrinha.com>

Credits:
  wollzelle GmbH, <http://www.wollzelle.com>
  Michael Aufreiter
  
*/



/*
Class: MultipleSelect
  collects functions for multiple select widgets

Note:
  static class
*/

var MultipleSelect = new Class({
	options: {
		className: 'multiple_select'
	},

  /*
  Property: initialize
    initializes a new multiple select widget
  */
  
	initialize: function(el, options) {
		this.setOptions(options);
		this.oldSelect = $(el);
		var pos = el.getCoordinates();
		
		this.oldSelect.setStyle('display', 'none');
		
		// selectList
		this.selectList = new Element('ul', {
		  'class': this.options.className + '_list', 'id': el.name+'_choices'
		}).setStyles({
		  width: pos.width +'px', height: pos.height+'px'
		}).injectAfter(this.oldSelect);
		    
		this.build(el);
	},

  /*
  Property: build
    builds the HTML that is needed for displaying the multiple select
    widget instead of the normal select box
  */

	build: function(el) {
		for(i = 0; i < el.length; i++) {
			var el2 = new Element('li', {'id': el.name+'_'+i}).setHTML(el.options[i].text);
      if (this.oldSelect.options[i].selected)
      	el2.addClass('choice_selected');		  
			this.addChoiceEvents(el2);
			el2.injectInside(this.selectList);
		};
	},

  /*
  Property: choiceSelect
    selects or deselects the clicked list items
  */

	choiceSelect: function(el) {
		el.toggleClass('choice_selected');
		var id = el.id.substring(el.id.lastIndexOf('_')+1).toInt();
		this.oldSelect.options[id].selected ? this.oldSelect.options[id].selected = '' : this.oldSelect.options[id].selected = 'selected';
		el.fireEvent('change');
	},

  /*
  Property: addChoiceEvents
    registers the mouse events
  */

	addChoiceEvents: function(el) {
		return el.addEvents({
			mouseover: function() { el.addClass('choice_hover'); },
			mouseout: function() { el.removeClass('choice_hover'); },
			mousedown: this.choiceSelect.bind(this, [el])
		});
	}
});

MultipleSelect.implement(new Events, new Options);