$(document).ready(function () {
   feedback=$('div.feedback');
   btn_suiv=$('input[name="suivant"]');
   btn_valid=$('input[type="button"][name!="suivant"]');
   bonneRepDonnee="";
   repCorrecte="Bonne réponse.";
   repFaux="Mauvaise réponse.";
   initializeExo();
   initializeQuestion();
   
   
   btn_valid.click(function() {
      essais=essais + 1;
      q=$(this).attr('name');
      repCorrecte=$('div[id="'+q+'"] input[name="goodAnswer"]').attr('value');
      repFaux=$('div[id="'+q+'"] input[name="badAnswer"]').attr('value');
      bonneRepDonnee=repFaux;
      //Gestion les bonnes réponses
      bonneRep=$('div[id="'+q+'"] input[value="1"]');
      nbBonneRep=bonneRep.length;

      //Vérification les/la réponse(s) donnée(s)
      select=$('div[id="'+q+'"] input:checked');
      nb=select.length;

      if (essais <3){ 
          if (nb==0){
            if (essais==2){
                afficherBonneRep(this, bonneRepDonnee);
            }else{
                feedback.text('Merci de cocher une réponse!');
                feedback.css({'color':'red','background':'#eee'});
            }
          } 
          else if (nb>nbBonneRep || nb < nbBonneRep){
            if(essais==2){
                afficherBonneRep(this, bonneRepDonnee);
            }
            else{
                feedback.text("Mauvaise réponse, réessayez.");
                feedback.css({'color':'red','background':'#eee'});
                select.each(function() {
                         $(this).removeAttr('checked');
                        });
                 }
           } 
          else if (nb==nbBonneRep){
              if(nbBonneRep==1){
                 if(select.attr('value')!=1){
                    if (essais==2){
                        afficherBonneRep(this, bonneRepDonnee);                
                    } else{
                        feedback.text("Mauvaise réponse, réessayez.");
                         feedback.css({'color':'red','background':'#eee'});
                         select.each(function() {
                         $(this).removeAttr('checked');
                        });
                    }
                  } else{
                     afficherBonneRep(this, repCorrecte);
                     feedback.css({'color':'green','background':'#eee'});                     
                  }
                } 
            //Gestion de plusieures bonnes réponses
                else if (nbBonneRep>1){
                    note=0;
                    select.each(function() {
                        if ($(this).attr('value')==1){
                            note=note+1;
                        } else {
                            note=note;
                        }
                    });
                    
                    if (note==nbBonneRep){
                        afficherBonneRep(this, repCorrecte); 
                        feedback.css({'color':'green','background':'#eee'});                    
                    } else if(note==0){
                        if (essais==2){
                            afficherBonneRep(this, bonneRepDonnee);
                        } else {
                             feedback.text('Aucune bonne réponse. Réessayez.');
                             feedback.css({'color':'red','background':'#eee'});
                             select.each(function() {
                                $(this).removeAttr('checked');
                             });
                         }
                    
                    } else{
                        if (essais==2){
                            afficherBonneRep(this, bonneRepDonnee);
                        } else {
                            feedback.text('Vos réponses sont partiellement correctes. Réessayez.');
                            feedback.css({'color':'red','background':'#eee'});
                             select.each(function() {
                                $(this).removeAttr('checked');
                            });
                        }
                    
                    }
              }

        }
      }      
   });
 
    btn_suiv.click(function() {
       param=$(this).attr('title');
       nbC=param.length;
       numExo=param.charAt(nbC-1);
       exoEnCours='div#question'+numExo;
       exoSuiv='div#question'+String(parseInt(numExo)+1)
       $(exoEnCours).hide();
       $(exoSuiv).show();
       initializeQuestion();
      
   });


function afficherBonneRep(y, message){
     $(y).attr('disabled', 'disabled');
            feedback.text(message);
            feedback.css({'color':'red','background':'#eee'});
            select.each(function() {
                 $(this).removeAttr('checked');
            });
            bonneRep.each(function() {
                 $(this).attr('checked','checked');
                 x='input[name="'+$(this).attr('name')+'"]';
                 $(x).parent().css({'background':'green', 'color':'#fff', 'width':'60%'});
                 });
            //btn_suiv.removeAttr('disabled');
            btn_suiv.css({'visibility':'visible'});
            btn_suiv.attr('title', q);
            good=true;
};

function initializeExo(){
   $('form#quizz').each(function(){
      this.reset();
   });
   $('div.question').hide();
   $('div#question1').show();
};
function initializeQuestion(){
   good=false;
   essais=0;
   btn_valid.removeAttr('disabled');
   //btn_suiv.attr('disabled', 'disabled');
   btn_suiv.css({'visibility':'hidden'});
   feedback.text('');
};

});
