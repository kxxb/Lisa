/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.onReady(function(){

Ext.QuickTips.init();



///
function displayFormWindow(){
  if(!SearchWindow.isVisible()){
    SearchWindow.show();
  } else {
    SearchWindow.toFront();
  }
  }

// create the Data Store
    var store_items = new Ext.data.JsonStore({
        root: 'items',
        fields: [
                {name: 'mrd_categoryid', mapping:'mrd_categoryid', type: 'int'},
                {name: 'item_img', mapping:'item_img', type: 'string'},
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'},
                {name: 'date_inf', mapping:'date_inf', type: 'string'},
                {name: 'site_url',mapping:'site_url', type: 'string'},
                {name: 'client_name', mapping:'client_name', type: 'string'},
                {name: 'about_info', mapping:'about_info', type: 'string'},
                {name: 'others_info', mapping:'others_info', type: 'string'},
                {name: 'cat_name',mapping:'cat_name', type: 'string'}

        ],  

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: 'GetItems.php'
        })
    });

ItemsColumnModel = new Ext.grid.ColumnModel(
            [{
                header: '#',
                readOnly: true,
                dataIndex: 'id', // this is where the mapped name is important!
                width: 50,
                sortable: true,
                hidden: false
              },{
                header: 'Путь к картинке',
                sortable: true,
                dataIndex: 'item_img',
                width: 150
              },
               {header: 'Статьи',
                width: 175,
                sortable: true,
                dataIndex: 'name'},
              {header: 'Дата статьи',
                width: 175,
                sortable: true,
                dataIndex: 'date_inf'},
              {header: 'URL',
                width: 175,
                sortable: true,
                dataIndex: 'site_url'},
             {header: 'Клиент',
                width: 175,
                sortable: true,
                dataIndex: 'client_name'},
             {header: 'Категория',
                width: 175,
                sortable: true,
                dataIndex: 'mrd_category_name'}
              ]
      );

      ItemsColumnModel.defaultSortable= true;

       ItemsEditorGrid =  new Ext.grid.EditorGridPanel({
      id: 'ItemsEditorGrid',
      title : 'Статьи',
      //store: ReqGridDataStore,     // the datastore is defined here
      store: store_items,     // the datastore is defined here
      cm: ItemsColumnModel,      // the columnmodel is defined here
      enableColLock:false,
      clicksToEdit:1,

      selModel: new Ext.grid.RowSelectionModel({
          singleSelect:false
      }),
      bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store_items,
            displayInfo: true,
            displayMsg: 'Показанно  {0} - {1} из {2}',
            emptyMsg: "Нет  для показа"

        }),
      tbar: [{
         text: 'Создать',
         tooltip: 'Great Tooltip',
         iconCls:'add',    // this is defined in our styles.css
         handler: displayFormWindow  //displayFormWindow
      }]

    } );
   store_items.load({params: {start: 0, limit: 20}});

///

           function onMainClick(item){
               window.location = '../portal.jsp';
           }
           function onExitClick(item){
               window.location = '../logout.jsp';
           }


            var tb = new Ext.Toolbar();
            var menu = new Ext.menu.Menu({
                    id: 'mainMenu',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Главная',
                            handler: onMainClick
                        }, '-',  {
                            text: 'Выход',
                            handler: onExitClick
                        }
                    ]
                });


   var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:50,
                        tbar:tb
                    },
                    {
                        region: 'center',
                        items: [{
                                region: 'center',
                                height: 800,
                                split: true,
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                                    {
                                        title: 'Категории',
                                        items :[ItemsEditorGrid,
                                            
                                            {region: 'center',
                                            height: 400,
                                            split: true,
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            html: 'bottom'}
                                        ]
                                    },
                                    {
                                        title: 'Items',
                                        html : 'Items'
                                    },
                                    {
                                        title: 'Items image',
                                        items :[
                                            
                                            {region: 'center',
                                            height: 400,
                                            split: true,
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            html: 'bottom'}
                                        ]
                                    }

                                ]
                            }
                        ]
                    }




                ]
            });


	// This just creates a window to wrap the login form.
	// The login object is passed to the items collection.
    /*var win = new Ext.Window({
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
        */
});
