export const screens = [
  {
    label: "Common",
    options: [
      { value: "meta", label: "Meta Thumbnail", w: 1200, h: 628 },
      { value: "desktop", label: "Desktop", w: 1440, h: 1024 },
      { value: "mackbook", label: "Mackbook Pro", w: 1152, h: 700 },
      { value: "mackbookpro", label: "Mackbook Pro", w: 1140, h: 900 },
      { value: "surfacebook", label: "Surface Book", w: 1500, h: 1000 },
      { value: "imac", label: "iMac", w: 1280, h: 720 },
      { value: "androvalue", label: "Androvalue", w: 480, h: 1024 },
      { value: "ipad", label: "iPad", w: 414, h: 736 },
      { value: "iphone", label: "iPhone", w: 480, h: 1024 },
    ],
  },
  {
    label: "Desktop/Laptop",
    options: [
      { value: "24desktop", label: '24" Desktop', w: 1920, h: 1200 },
      { value: "23desktop", label: '23" Desktop', w: 1920, h: 1080 },
      { value: "22desktop", label: '22" Desktop', w: 1680, h: 1050 },
      { value: "20desktop", label: '20" Desktop', w: 1600, h: 900 },
      { value: "19desktop", label: '19" Desktop', w: 1440, h: 900 },
      { value: "15notebook", label: '15" Notebook', w: 1366, h: 768 },
      { value: "13notebook", label: '13" Notebook', w: 1024, h: 800 },
      { value: "10notebook", label: '10" Notebook', w: 1024, h: 600 },
    ],
  },
  {
    label: "iPad/Tablet",
    options: [
      { value: "ipadpro", label: "iPad Pro", w: 1024, h: 1366 },
      { value: "ipadmini", label: "iPad Mini/Air", w: 768, h: 1024 },
      { value: "galaxy10", label: "Samsumg Galaxy 10", w: 800, h: 1280 },
      { value: "nexus7", label: "Nexus 7", w: 600, h: 960 },
      { value: "nexus9", label: "Nexus 9", w: 768, h: 1024 },
    ],
  },
  {
    label: "Mobile",
    options: [
      { value: "pixel", label: "Google Pixel", w: 411, h: 731 },
      { value: "iphonex", label: "iPhone X", w: 375, h: 812 },
      { value: "iphone8", label: "iPhone 6+, 6s+, 7+, 8+", w: 414, h: 736 },
      { value: "iphone7", label: "iPhone 7, 8, 6, 6s", w: 375, h: 667 },
      { value: "iphone5", label: "iPhone 5", w: 320, h: 568 },
      { value: "iphone4", label: "iPhone 4,3", w: 320, h: 480 },
    ],
  },
];

export const defaultScreen = screens
  .map(({ options }) => options)
  .reduce((a, c) => [...a, ...c])
  .map((o) => {
    return {
      value: o.value,
      label: `${o.label} (${o.w}x${o.h})`,
    };
  })
  .find((e) => e.value === "desktop");

export const defaultData = {
  url: "",
  full: false,
  scale: false,
  custom: false,
  width: 1440,
  height: 1024,
  screen: defaultScreen,
  valid: true,
  ready: false,
  loading: false,
  error: false,
  image: false,
};

export const screenOptions = screens.map((group) => {
  group.options = group.options.map((option) => {
    option.label = `${option.label} (${option.w}x${option.h})`;
    return option;
  });
  return group;
});
