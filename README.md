# imoney-notice
![notice](https://user-images.githubusercontent.com/1193966/30494813-26a55408-9a7c-11e7-875b-ef8c59cd7302.png)

## Installation
### HTML:
```html
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="build/notice.min.css">
</head>

<body>
    <script src="build/notice.min.js"></script>
</body>

</html>

```

### npm:
    npm i imoney-notice --save

##Usage
```js
import notie from 'imoney-notice'
```

```js
//alert
Notice.alert({text:"Welcome!"});
Notice.alert({text:"Welcome!",time:10});
//force
Notice.force({text:"Welcome!"});
Notice.force({
    text: "Welcome!",
    callback() {
        console.log("callback")
    }
});
//confirm
Notice.confirm({
    text: "Welcome!",
    submitCallback() {
        console.log("submit")
    },
    cancelCallback() {
        console.log("cancel")
    }
});
```
## Browser Support
* IE 9+
* Chrome 11+
* Firefox 4+
* Safari 5.1+
* Opera 11.5+