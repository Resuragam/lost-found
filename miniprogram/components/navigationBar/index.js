// components/navigation-bar/index.js
Component({
  properties: {
    leftArrow: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    }
  },
  externalClasses: ["custom-navbar"]
});
