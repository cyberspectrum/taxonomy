/**
 * Class BackendTaxonomyWizard
 *
 * Provide methods to handle back end tasks.
 * @copyright  Thyon Design 2009
 * @author     John Brand <john.brand@thyon.com>
 * @package    BackendTaxonomyWizard
 */
 
var AjaxRequestTaxonomy =
{

	/**
	 * Toggle the page tree (input field)
	 * @param object
	 * @param string
	 * @param string
	 * @param string
	 * @param integer
	 * @return boolean
	 */
	toggleTaxonomytree: function (el, id, field, name, level)
	{
		el.blur();
		var item = $(id);
		var image = $(el).getFirst();

		if (item)
		{
			if (item.getStyle('display') != 'inline')
			{
				item.setStyle('display', 'inline');
				image.src = image.src.replace('folPlus.gif', 'folMinus.gif');
				new Request({url: window.location.href, data: 'isAjax=1&action=toggleTaxonomytree&id=' + id + '&state=1'}).send();
			}
			else
			{
				item.setStyle('display', 'none');
				image.src = image.src.replace('folMinus.gif', 'folPlus.gif');
				new Request({url: window.location.href, data: 'isAjax=1&action=toggleTaxonomytree&id=' + id + '&state=0'}).send();
			}

			return false;
		}

		new Request(
		{
	    url: window.location.href,
			data: 'isAjax=1&action=loadTaxonomytree&id=' + id + '&level=' + level + '&field=' + field + '&name=' + name + '&state=1',
			onRequest: AjaxRequest.displayBox('Loading data ...'),

			onComplete: function(txt, xml)
			{
				var ul = new Element('ul');

				ul.addClass('level_' + level);
				ul.set('html', txt);

				item = new Element('li');

				item.addClass('parent');
				item.setProperty('id', id);
				item.setStyle('display', 'inline');

				ul.injectInside(item);
				item.injectAfter($(el).getParent().getParent());

				image.src = image.src.replace('folPlus.gif', 'folMinus.gif');
				AjaxRequest.hideBox();
   			}
		}).send();

		return false;
	}
	
}
