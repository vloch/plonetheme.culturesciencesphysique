## Script (Python) "localRelatedDossier"
##bind container=container
##bind context=context
##bind namespace=
##bind script=script
##bind subpath=traverse_subpath
##parameters=url=''
##title=
##
from Products.CMFCore.utils import getToolByName
#urlData='/db/csphysique/metadata-a-venir/LOM_CSP_conversion-energie-Multon1.xml'
urlData = '/db/csphysique/metadata'+url
mn_tool = getToolByName(context, 'portal_metadataNav')
query = str(context.xq_dossier_related)% {'meta_url': urlData,
            'portal_url':context.portal_url(),
	    'xquery_version': mn_tool.getXQueryVersion(),
		}
da = mn_tool.getDA()
results = da.query(query)
return str(results)
#return urlData
#return query
