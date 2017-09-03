parallaxContent
-------

### Demo

[https://lemehovskiy.github.io/parallaxContent/demo](https://lemehovskiy.github.io/parallaxContent/demo/)


### Package Managers

```sh
# NPM
npm install parallax_content
```

### Data Attribute Settings


In parallaxContent you can now add settings using the data-parallax-content attribute. You still need to call
$(element).parallaxContent()
to initialize parallaxContent on the element.


Example:

```html
<div data-parallax-content='{"shift": 10, "duration": 4}'></div>
```


### Settings

Option | Type | Default
--- | --- | ---
shift | int | 10
duration | int | 1.5

### Browser support

* Chrome
* Firefox
* Opera
* IE10/11


### Dependencies

* jQuery 1.7
* Gsap
