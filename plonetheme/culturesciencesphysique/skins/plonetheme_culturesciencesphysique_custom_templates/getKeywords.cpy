## Script (Python) "localRelatedDossier"
##bind container=container
##bind context=context
##bind namespace=
##bind script=script
##bind subpath=traverse_subpath
##parameters=
##title=
##
from Products.CMFCore.utils import getToolByName

portal_url=context.portal_url()
mn_tool = getToolByName(context, 'portal_metadataNav')
da = mn_tool.getDA()
words=[]

jsonData="""{
"query": "Unit",
"suggestions":
"""

query="""xquery version "1.0";
declare namespace lom="http://ltsc.ieee.org/xsd/LOM";
for $res in collection('/db/csphysique/metadata')/lom:lom[lom:lifeCycle/lom:contribute[lom:role/lom:value='publisher']//lom:dateTime <= adjust-date-to-timezone(current-date(),())]
let $mots:= string-join(distinct-values($res/lom:general/lom:keyword/lom:string/text()), ', ')
order by $mots ascending empty least
return $mots
"""

res = str(da.query(query)).replace('\n', ', ')
mots=res.split(', ')
for mot in mots:
   if mot not in words:
      #dicoMot="{'value':'%s', 'data':'%s'}" %(mot, mot)
      dicoMot='"%s":"%s"' %(mot, mot)
      words.append(dicoMot)    
jsonData+=str(words)+"}"
wordsArray="{"
for w in words:
    wordsArray+=w+", "

wordsArray+="}"
#return jsonData.replace('"', '\'')
#return str(words).replace('[', '{').replace(']', '}')
return wordsArray
