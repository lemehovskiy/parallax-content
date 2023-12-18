declare global {
  interface JQuery {
    parallaxContent(arg: Partial<OptionsType>): void;
  }
}

declare global {
  interface Window {
    $: JQuery;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let gsap: any;

import Scroller from '@lemehovskiy/scroller';

enum EventTypes {
  Scroll = 'SCROLL',
  Gyro = 'GYRO',
}

enum DeviceOrientationTypes {
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT',
}

type OptionsType = {
  events: Array<EventTypes>;
  shift: number;
  duration: number;
  gyroSensitivity: number;
};

type AnimationParamsType = {
  x?: number;
  y?: number;
};

export default class ParallaxContent {
  element: HTMLElement;
  settings: OptionsType;
  elementSize: [number, number];
  shift: number;
  doubleShift: number;
  deviceOrientation: DeviceOrientationTypes | undefined;
  animationLength: number;
  isVisible: boolean;
  positionX: number;
  positionY: number;

  constructor(element: HTMLElement, options?: Partial<OptionsType>) {
    this.settings = {
      events: [EventTypes.Scroll],
      shift: 30,
      duration: 1.5,
      gyroSensitivity: 30,
      ...options,
    };

    this.element = element;
    const dataOptions = JSON.parse(
      this.element.getAttribute('data-parallax-content')
    );
    this.settings = { ...this.settings, ...dataOptions };
    this.elementSize = [0, 0];
    this.deviceOrientation = undefined;
    this.animationLength = -this.settings.shift + this.settings.shift * 2;
    this.isVisible = false;

    this.init();
  }

  private init() {
    if (typeof gsap === 'undefined') {
      console.warn(
        'Gsap library is required... https://gsap.com/docs/v3/Installation/'
      );
      return;
    }

    const observer = new IntersectionObserver(
      (e) => {
        this.isVisible = e[0].isIntersecting;
      },
      { root: null, rootMargin: '0px' }
    );
    observer.observe(this.element);

    new Set(this.settings.events).forEach((event) => {
      if (event === EventTypes.Scroll) {
        this.subscribeScrollEvent();
      } else if (event === EventTypes.Gyro) {
        this.subscribeGyroEvent();
      }
    });
  }

  private updateOrientation() {
    if (window.innerWidth > window.innerHeight) {
      this.deviceOrientation = DeviceOrientationTypes.Landscape;
    } else {
      this.deviceOrientation = DeviceOrientationTypes.Portrait;
    }
  }

  private subscribeGyroEvent() {
    this.updateOrientation();

    let lastGamma = 0,
      lastBeta = 0,
      rangeGamma = this.settings.gyroSensitivity / 2,
      rangeBeta = this.settings.gyroSensitivity / 2;

    window.addEventListener('resize', () => {
      this.updateOrientation();
    });

    window.addEventListener(
      'deviceorientation',
      (e) => {
        if (!this.isVisible) return;
        const roundedGamma = Math.round(e.gamma || 0),
          roundedBeta = Math.round(e.beta || 0);

        if (roundedBeta > lastBeta && rangeBeta > 0) {
          rangeBeta--;
        } else if (
          roundedBeta < lastBeta &&
          rangeBeta < this.settings.gyroSensitivity
        ) {
          rangeBeta++;
        }

        if (roundedGamma > lastGamma && rangeGamma > 0) {
          rangeGamma--;
        } else if (
          roundedGamma < lastGamma &&
          rangeGamma < this.settings.gyroSensitivity
        ) {
          rangeGamma++;
        }

        lastGamma = roundedGamma;
        lastBeta = roundedBeta;

        const gammaProgress = rangeGamma / this.settings.gyroSensitivity;
        const betaProgress = rangeBeta / this.settings.gyroSensitivity;

        if (this.deviceOrientation === DeviceOrientationTypes.Landscape) {
          this.animate(gammaProgress, betaProgress);
        } else {
          this.animate(betaProgress, gammaProgress);
        }
      },
      true
    );
  }

  private animate(progressY: number, progressX?: number, isSet = false) {
    const y = this.animationLength * progressY;
    const x = this.animationLength * progressX;
    const params: AnimationParamsType = { y };

    if (progressX !== undefined) {
      params.x = x;
    }

    if (isSet) {
      gsap.killTweensOf(this.element);
      gsap.set(this.element, params);
    } else {
      gsap.to(this.element, this.settings.duration, params);
    }
  }

  private subscribeScrollEvent() {
    const scroller = new Scroller(this.element, {
      autoAdjustScrollOffset: true,
    });

    scroller.progressChanged.on((progress) => {
      if (this.isVisible) {
        this.animate(progress);
      } else {
        this.animate(progress, undefined, true);
      }
    });
  }
}

if (window.$ !== undefined) {
  $.fn.parallaxContent = function (
    ...params: [Partial<OptionsType>] | Array<string>
  ) {
    const opt = params[0];
    const args = Array.prototype.slice.call(params, 1);
    const length = this.length;
    let ret = undefined;
    for (let i = 0; i < length; i++) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        this[i].parallaxContent = new ParallaxContent(this[i], opt);
      } else {
        // eslint-disable-next-line prefer-spread
        ret = this[i].parallaxContent[opt].apply(this[i].parallaxContent, args);
      }
      if (typeof ret !== 'undefined') return ret;
    }
    return this;
  };
}
