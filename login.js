Ext.onReady(function(){
    Ext.QuickTips.init();

	// Create a variable to hold our EXT Form Panel.
	// Assign various config options as seen.
    var login = new Ext.FormPanel({
        labelWidth:80,
        url:'SYS/login.php',
        frame:true,
        title:'LISA',
        defaultType:'textfield',
	monitorValid:true,
	// Specific attributes for the text fields for username / password.
	// The "name" attribute defines the name of variables sent to the server.
        items:[{
                fieldLabel:'Логин',
                name:'login',
                allowBlank:false
            },{
                fieldLabel:'Пароль',
                name:'pass',
                inputType:'password',
                allowBlank:false
            }],

	// All the magic happens after the user clicks the button
        buttons:[{
                text:'Вход',
                formBind: true,
                // Function that fires when user clicks the button
                handler:function(){
                    login.getForm().submit({
                        method:'POST',
                        waitTitle:'Отправка данных',
                        waitMsg:'обработка данных...',

			

                        success:function(){

                        window.location = 'app.startpage/index.php';
                        
                        },

                        failure:function(form, action){
                            if(action.failureType == 'server'){
                                obj = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Ошибка', obj.errors.reason);
                            }else{
                                Ext.Msg.alert('Ошибка!', 'Ошибка : ' + action.response.responseText);
                            }
                            login.getForm().reset();
                        }
                    });
                }
            }],keys: [{key: [Ext.EventObject.ENTER],
                handler: function() {
                     login.getForm().submit({
                        method:'POST',
                        waitTitle:'Соединяюсь',
                        waitMsg:'Отправляю данные...',
                        success:function(){

                        window.location = 'app.startpage/index.php';
                        
                        },


                        failure:function(form, action){
                            if(action.failureType == 'server'){
                                obj = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Вход не возможен!', obj.errors.reason);
                            }else{
                                Ext.Msg.alert('Внимание!', 'Сервер не доступен : ' + action.response.responseText);
                            }
                            login.getForm().reset();
                        }
                    });
                }
               }]
    });



    

	// This just creates a window to wrap the login form.
	// The login object is passed to the items collection.
    var win = new Ext.Window({
        layout:'fit',
        width:300,
        height:150,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
	});
	win.show();
});