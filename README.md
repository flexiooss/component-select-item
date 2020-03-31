# component-select-item

Basé sur https://github.com/flexiooss/component-list-handler, leve une action quand un item est selectionné.

Utiliser `onCreateItems` pour remplir le noeud
```javascript
const select = ComponentSelectItemBuilder.builder()
  .application(application)
  .parentNode(node)
  .storeItems(store)
  .viewListHandlerMounter(new ViewListHandlerMounter())
  .onCreateItems((context, nodes) => {
    nodes.forEach(node =>{
      createViewContainer(context, node)
        ... DO INTELLIGENT THINGS ...
    })
  })
  .viewContainerSelectItemBuilder(new ViewContainerSelectItemBuilder())
  .build()
```

## Listen Actions
```javascript
select.actionSelect().listenWithCallback(action =>{
  const id = action.id()
}, myContext)
```

## Remove list
```javascript
select.remove()
```
