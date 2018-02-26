parallaxContent
-------

### Demo

[https://lemehovskiy.github.io/parallax-content](https://lemehovskiy.github.io/parallax-content)

### Package Managers

```sh
# NPM
npm install parallax_content
```

### Installation

#### Include js

```html
<script src="TweenLite.min.js"></script>
<script src="CSSPlugin.min.js"></script>
<script src="jquery.min.js"></script>
<script src="parallax_content.js"></script>
```

#### Set HTML

```html
<div class="parallax-title">
    Parallax title
</div>
```

#### Call the plugin

```html
<script type="text/javascript">
    $(document).ready(function() {
      $('.parallax-title').parallaxContent();
    });
</script>
```

#### In result

```html
<html>
  <head>
  <title>My website</title>
  </head>
  <body>

  <div class="parallax-title">
    Parallax title
  </div>

  <script src="TweenLite.min.js"></script>
  <script src="CSSPlugin.min.js"></script>
  <script src="jquery.min.js"></script>
  <script src="parallax_content.js"></script>

  <script type="text/javascript">
     $(document).ready(function() {
         $('.parallax-title').parallaxContent();
     });
  </script>

  </body>
</html>
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