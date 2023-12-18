## parallax-content

Create captivating parallax contents effortlessly with the ParallaxContent plugin. This lightweight Vanilla JavaScript plugin, powered by GSAP animation, supports Scroll and Gyroscope events.

Features:

* Vanilla JavaScript and GSAP powered
* Scroll, Gyroscope events
* Customizable shift and animation duration

### Package Managers

```sh
# NPM
npm install parallax_content
```

### Installation

#### Include js

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
<script src="parallaxBackground.umd.js"></script>
```

#### Set HTML

```html
<div class="parallax-title">Parallax title</div>
```

#### Call the plugin

```html
<script type="text/javascript">
  //Initialize with Vanilla JavaScript
  new ParallaxContent(document.querySelector('.parallax-title'));
  //Initialize with jQuery
  $(document).ready(function () {
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
    <div class="parallax-title">Parallax title</div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    //optional for jQuery initialize
    <script src="node_modules/parallax_content/dist/parallaxContent.umd.js"></script>

    <script type="text/javascript">
      $(document).ready(function () {
        $('.parallax-title').parallaxContent();
      });
    </script>
    <script type="text/javascript">
      //Initialize with Vanilla JavaScript
      new ParallaxBackground(document.querySelector('.parallax-title'));
      //Initialize with jQuery
      $(document).ready(function () {
        $('.parallax-title').parallaxContent();
      });
    </script>
  </body>
</html>
```

### Data Attribute Settings

In parallaxContent you can add settings using the data-parallax-content attribute. You still need to call
new ParallaxContent(selector)
to initialize parallaxContent on the element.

Example:

```html
<div data-parallax-content='{"shift": 10, "duration": 4}'></div>
```

### Settings

| Option          | Type  | Default            |
| --------------- | ----- | ------------------ |
| events          | [SCROLL, MOUSE, GYRO] | [SCROLL] |
| shift           | int   | 10                 |
| duration        | int   | 1.5                |
| gyroSensitivity | int   | 30                 |

### Browser support

* Chrome
* Firefox

### Dependencies

* GSAP animation library (Version 3.10.4)

## Contributing

If you'd like to get involved, please consider opening an issue or submitting a pull request. Your input is highly valued, and I'm enthusiastic about collaborating to enhance this tool.

## License

parallax-content is released under the MIT License. See the [LICENSE](LICENSE) file for comprehensive details regarding the terms and conditions of use.
