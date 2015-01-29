# -*- coding: utf-8 -*-

from cgi import escape
from datetime import date
from urllib import unquote

from Globals import DevelopmentMode
from logging import getLogger

from plone.memoize.view import memoize
from zope.component import getMultiAdapter
from zope.deprecation.deprecation import deprecate
from zope.interface import implements, alsoProvides
from zope.viewlet.interfaces import IViewlet

from AccessControl import getSecurityManager
from Acquisition import aq_base, aq_inner
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone.utils import safe_unicode
from Products.Five.browser import BrowserView
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.layout.viewlets.common import ViewletBase

from plone.app.layout.globals.interfaces import IViewView

# Sample code for a basic viewlet (In order to use it, you'll have to):
# - Un-comment the following useable piece of code (viewlet python class).
# - Rename the viewlet template file ('browser/viewlet.pt') and edit the
#   following python code accordingly.
# - Edit the class and template to make them suit your needs.
# - Make sure your viewlet is correctly registered in 'browser/configure.zcml'.
# - If you need it to appear in a specific order inside its viewlet manager,
#   edit 'profiles/default/viewlets.xml' accordingly.
# - Restart Zope.
# - If you edited any file in 'profiles/default/', reinstall your package.
# - Once you're happy with your viewlet implementation, remove any related
#   (unwanted) inline documentation  ;-p

#class MyViewlet(ViewletBase):
#    render = ViewPageTemplateFile('viewlet.pt')
#
#    def update(self):
#        self.computed_value = 'any output'

logger = getLogger("Page Title")

TITLE_XQUERY = """xquery version "1.0";
declare namespace lom="http://ltsc.ieee.org/xsd/LOM";
let $title := document("%(DOC_URL)s")/lom:lom/lom:general/lom:title/lom:string/text()

return $title
"""

class TitleViewlet(ViewletBase):
    index = ViewPageTemplateFile('templates/title.pt')

    def update(self):
        portal_state = getMultiAdapter((self.context, self.request),
                                        name=u'plone_portal_state')
        context_state = getMultiAdapter((self.context, self.request),
                                         name=u'plone_context_state')
        page_title = escape(safe_unicode(context_state.object_title()))
        portal_title = escape(safe_unicode(portal_state.portal_title()))
        metnav_props = getToolByName(self.context, 'portal_properties')['metnav_properties']

        exist_base_url = metnav_props.getProperty('URL_DOC')
        view_url = portal_state.navigation_root_url() + exist_base_url
        if self.request.other['URL'] == view_url:
            sub_path = '/' + '/'.join(self.request.other['traverse_subpath'])
            assert(sub_path.startswith(metnav_props.getProperty('COLLECTION_METADATA')))

            document_url = view_url + sub_path

            mn_tool = getToolByName(self.context, 'portal_metadataNav')
            # ADD DOCBOOK OPTS IN XSL_PARAMS
            params_dict = {
                'XSL_PARAMS_DB': mn_tool.getXSLParams(
                    mn_tool.getDBXSLOpts({
                        "base.internal": document_url
                    })),
                'XSL': 'page',
                'DOC_URL': sub_path,
                'DB_XSL': metnav_props.getProperty('DB_XSL'),
                'LD2DB_XSL': metnav_props.getProperty('LD2DB_XSL'),
            }

            query = TITLE_XQUERY % mn_tool.getQueryParams(params_dict, self.request)

            if DevelopmentMode:
                logger.info('\n\nURL\n' + sub_path)
                logger.info('\n\nBASE\n' + document_url)
                logger.info('\n\nREQUEST\n' + query)

            da = mn_tool.getDA()
            res = da.query(query, object_only=1)

            if DevelopmentMode:
                if str(res):
                    logger.info('\n\nRESULTS\n' + str(res).strip())
                else:
                    logger.info('\n\nNO RESULT\n')

            self.site_title = u"%s &mdash; %s" % (escape(safe_unicode(str(res).strip())), portal_title)

        elif page_title == portal_title:
            self.site_title = portal_title
        else:
            self.site_title = u"%s &mdash; %s" % (page_title, portal_title)

class LogoViewlet(ViewletBase):
    index = ViewPageTemplateFile('templates/logo.pt')


class BannerViewlet(ViewletBase):
    index = ViewPageTemplateFile('templates/banner.pt')
