from zope.interface import Interface
from zope.interface import implements
from zope.component import getUtility

from plone.app.portlets.portlets import base
from plone.portlets.interfaces import IPortletDataProvider

from plone.i18n.normalizer.interfaces import IIDNormalizer

from zope import schema
from zope.formlib import form
from zope.component import getMultiAdapter
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from plone.portlet.static import PloneMessageFactory as _

from plone.app.form.widgets.wysiwygwidget import WYSIWYGWidget

class Iressources(IPortletDataProvider):
    """A portlet which renders predefined static HTML - Acces to CSPhysique Resources

    It inherits from IPortletDataProvider because for this portlet, the
    data that is being rendered and the portlet assignment itself are the
    same.
    """
    
    header = schema.TextLine(
        title=_(u"Portlet header"),
        description=_(u"Title of the rendered portlet"),
        default=_(u"Ressources pédagogiques"),
        required=False)
        
    hide = schema.Bool(
        title=_(u"Hide portlet"),
        description=_(u"Tick this box if you want to temporarily hide "
                      "the portlet without losing your text."),
        required=True,
        default=False)

  
class Assignment(base.Assignment):
    """Portlet assignment.

    This is what is actually managed through the portlets UI and associated
    with columns.
    """

    implements(Iressources)

    header = _(u"title_ressources_portlet", default=u"Ressources pédagogiques")
    hide = False

    def __init__(self, header=u"", hide=False):
        self.header = header
        self.hide = hide

    @property
    def title(self):
        """This property is used to give the title of the portlet in the
        "manage portlets" screen. Here, we use the title that the user gave.
        """
        return self.header


class Renderer(base.Renderer):
    """Portlet renderer.

    This is registered in configure.zcml. The referenced page template is
    rendered, and the implicit variable 'view' will refer to an instance
    of this class. Other methods can be added and referenced in the template.
    """

    render = ViewPageTemplateFile('ressources.pt')
    
    @property
    def available(self):
        return not self.data.hide

    def css_class(self):
        """Generate a CSS class from the portlet header
        """
        header = self.data.header
        normalizer = getUtility(IIDNormalizer)
        return "portlet-ressources-%s" % normalizer.normalize(header)

class AddForm(base.AddForm):
    """Portlet add form.

    This is registered in configure.zcml. The form_fields variable tells
    zope.formlib which fields to display. The create() method actually
    constructs the assignment that is being added.
    """
    form_fields = form.Fields(Iressources)
    label = _(u"title_add_ressources_portlet",
              default=u"Add ressources portlet")
    description = _(u"description_resources_portlet",
                    default=u"A portlet which can display menu to access the resources.")

    def create(self, data):
        return Assignment(**data)


class EditForm(base.EditForm):
    """Portlet edit form.

    This is registered with configure.zcml. The form_fields variable tells
    zope.formlib which fields to display.
    """
    form_fields = form.Fields(Iressources)
    label = _(u"title_edit_ressources_portlet",
              default=u"Edit resources portlet")
    description = _(u"description_ressources_portlet",
                    default=u"A portlet which can display menu to access the resources.")
