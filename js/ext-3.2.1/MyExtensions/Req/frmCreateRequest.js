/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




//--Urist add request    -------------------

      var UristRequestCreateForm;
      var UristRequestCreateWindow;

/*Departments*/
      /*var DepStore = new Ext.data.JsonStore({
            url: 'Dep-makes.jsp',
            baseParams:{cmd:'makes'},
            root: 'makes',
            fields: ['id', 'name']
      });
      */


var DepStore = new Ext.data.SimpleStore({
        fields: ['id', 'department'],
        data : [
            ['1','Отдел IT'],
            ['2','Юридический отдел'],
            ['3','PR Отдел ']
        ]
        });
/*Contract types*/
      var ContractTypesStore1 = new Ext.data.JsonStore({
            url: 'getter_contract_type.jsp',
            root: 'makes',
            fields: ['id', 'name']
      });

      var ContractTypesStore = new Ext.data.SimpleStore({
        fields: ['id', 'name'],
        data : [
            ['1','Другой'],
            ['2','Договор 1'],
            ['3','Договор 2']
        ]
        });



     var contractCombo = {
            xtype: 'combo',
            store: ContractTypesStore,
            displayField: 'name',
            valueField: 'id',
            typeAhead: true,
            editable:false,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            fieldLabel: 'договор',
            emptyText: 'Выберите договор...',
            selectOnFocus: true,
            anchor:'50%'
     }


 var makesCombo = {
    xtype: 'combo',
    store: DepStore,
    displayField: 'department',
    valueField: 'id',
    typeAhead: true,
    editable:false,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    fieldLabel: '->',
    emptyText: 'Выберите отдел...',
    selectOnFocus: true,
    anchor:'95%',
    listeners: {
        select: function(f,r,i){

            NewForm1.removeAll();  // удаляем элементы формы панели созданные ранее
             if (i == 0){
                NewForm1.add({          // добавляем новые  элементы на панели формы
                    layout:'form',
                    items:[makesCombo,{
                        xtype:'textfield',      // textfield
                        fieldLabel:'Отдел',
                        value:'Отдел IT',
                        name:'field0',
                        disabled  : true

                    },{
                        xtype:'textfield',      // textfield
                        fieldLabel:'Label 21',
                        name:'field21'
                    },{
                        xtype:'datefield',      // datefield
                        fieldLabel:'Date Label 3',
                        name:'fielddate3'
                    },{
                        xtype:'htmleditor',
                        id:'request_content',
                        fieldLabel:'Описание заявки',
                        height:200,
                        anchor:'98%'
                    }],
                buttons: [{
                      text: 'Save and Close',
                      handler: createTheRequest
                    },{
                      text: 'Cancel',
                      handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        RequestCreateWindow.hide();
                      }
                    }]
                });
            }
           else if (i == 1){
                NewForm1.add({          // добавляем новые  элементы на панели формы

                    layout:'form',
                    items:[makesCombo,{
                        xtype:'textfield',      // textfield
                        fieldLabel:'Отдел',
                        value:'Юридический отдел',
                        name:'field0',
                        disabled  : true
                    },contractCombo,{
                        xtype:'datefield',      // datefield
                        fieldLabel:'Date Label 3',
                        name:'fielddate3'
                    },{
                        xtype:'htmleditor',
                        id:'request_content',
                        fieldLabel:'Описание заявки',
                        height:200,
                        anchor:'98%'
                    }],
                buttons: [{
                      text: 'Save and Close',
                      handler: createTheRequest
                    },{
                      text: 'Cancel',
                      handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.
                        RequestCreateWindow.hide();
                      }
                    }]
                });
            }else if (i == 2){

                NewForm1.add({          // добавляем новые  элементы на панеле формы
                    layout:'form',
                    items:[makesCombo,{
                        xtype:'textfield',      // textfield
                        fieldLabel:'Отдел',
                        value:'PR отдел',
                        name:'field0',
                        disabled  : true
                    },{
                        xtype:'htmleditor',
                        id:'request_content',
                        fieldLabel:'Описание заявки',
                        height:200,
                        anchor:'98%'
                    }],
                buttons: [{
                      text: 'Save and Close',
                      handler: createTheRequest
                    },{
                      text: 'Cancel',
                      handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.
                        RequestCreateWindow.hide();
                      }
                    }]
                });
            }
            NewForm1.doLayout();  // типа перерисовка или перекалкуляция  :)

        }
    }
}








//--End Urist add request-------------------


     /*---Add request form  ---------------------------*/
      var RequestCreateForm;
      var RequestCreateWindow;




    NewForm1 = new Ext.FormPanel({
        labelAlign: 'center',
        bodyStyle:'padding:5px',
        width: 700,
        items: [makesCombo]

    });

  RequestCreateWindow= new Ext.Window({
      id: 'RequestCreateWindow',
      title: 'Новая заявка',
      closable:false,
      width: 710,
      height: 600,
      plain:true,
      layout: 'fit',
      //items: RequestCreateForm
      items: [NewForm1]

    });




// reset the Form before opening it
  function resetRequestForm(){
    FirstNameField.setValue('');
    LastNameField.setValue('');
    EnteringOfficeField.setValue('');
    LeavingOfficeField.setValue('');
    IncomeField.setValue('');
    PartyField.setValue('');
  }

  // check if the form is valid
  function isRequestFormValid(){
  return(FirstNameField.isValid()&
  LastNameField.isValid() &
  EnteringOfficeField.isValid() &
  LeavingOfficeField.isValid()
  & IncomeField.isValid()
   & PartyField.isValid());
  }

  // display or bring forth the form
  function displayFormWindow(){


  if(!RequestCreateWindow.isVisible()){

    RequestCreateWindow.show();
  } else {
    RequestCreateWindow.toFront();
  }
  }



     function createTheRequest(){
     if(isRequestFormValid()){
      Ext.Ajax.request({
        waitMsg: 'Please wait...',
        url: 'database.php',
        params: {
          task: "CREATEPRES",
          firstname:      FirstNameField.getValue(),
          lastname:       LastNameField.getValue(),
          enteringoffice: EnteringOfficeField.getValue().format('Y-m-d'),
          leavingoffice:  LeavingOfficeField.getValue().format('Y-m-d'),
          income:         IncomeField.getValue(),
          party:          PartyField.getValue()
        },
        success: function(response){
          var result=eval(response.responseText);
          switch(result){
          case 1:
            Ext.MessageBox.alert('Creation OK',
            'The president was created successfully.');
            RequestDataStore.reload();
            RequestCreateWindow.hide();
            break;
          default:
            Ext.MessageBox.alert('Warning',
            'Could not create the president.');
            break;
          }
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error', 'could not connect to the database.   retry later');
        }
      });
    } else {
      Ext.MessageBox.alert('Warning',
       'Your Form is not valid!');
    }
  }

     /*---End add request form ------------------------*/




